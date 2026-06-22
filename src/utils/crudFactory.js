// Generic CRUD controller factory. Every catalog collection (destinations,
// weekends, moments, places, hotels, …) shares the same REST shape, so we build
// the handlers once and configure per-resource via `config/resources.js`.
//
// All collections use a string `_id` (the business key / slug) to stay 1:1 with
// the admin store and front-end data files.

import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";
import { slugify, uid } from "./ids.js";

const RESERVED_QUERY = new Set(["page", "limit", "sort", "q", "search", "fields"]);

function buildFilter(resource, query) {
  const filter = {};

  // Free-text search across the resource's configured searchable fields.
  const term = (query.q || query.search || "").trim();
  if (term && resource.searchFields?.length) {
    const rx = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = resource.searchFields.map((f) => ({ [f]: rx }));
  }

  // Exact-match on any other allowed query param the resource whitelists.
  for (const [key, value] of Object.entries(query)) {
    if (RESERVED_QUERY.has(key)) continue;
    if (resource.filterFields?.includes(key)) {
      filter[key] = value;
    }
  }
  return filter;
}

export function makeCrudController(resource, opts = {}) {
  const Model = resource.model;
  // On the public router, apply the resource's publicFilter (e.g. only
  // status:"published" blogs) so drafts never leak. Admin sees everything.
  const scopeFilter =
    opts.scope === "public" && resource.publicFilter ? resource.publicFilter : null;

  const list = asyncHandler(async (req, res) => {
    const filter = buildFilter(resource, req.query);
    if (scopeFilter) Object.assign(filter, scopeFilter);
    const limit = Math.min(Number(req.query.limit) || resource.defaultLimit || 200, 500);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const sort = req.query.sort || resource.defaultSort || "-createdAt";

    const [items, total] = await Promise.all([
      Model.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
      Model.countDocuments(filter),
    ]);

    res.json({ data: items, page, limit, total, pages: Math.ceil(total / limit) || 1 });
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id).lean();
    if (!item) throw ApiError.notFound(`${resource.label} not found`);
    // Hide records the public scope shouldn't see (e.g. draft blog posts).
    if (scopeFilter) {
      for (const [k, v] of Object.entries(scopeFilter)) {
        if (item[k] !== v) throw ApiError.notFound(`${resource.label} not found`);
      }
    }
    res.json({ data: item });
  });

  const create = asyncHandler(async (req, res) => {
    let body = { ...req.body };
    if (resource.transform) body = resource.transform(body);

    // Derive a stable _id if the client didn't supply one.
    if (!body._id) {
      if (resource.slugFrom && body[resource.slugFrom]) {
        body._id = slugify(body[resource.slugFrom]);
      } else {
        body._id = uid(resource.idPrefix || "id");
      }
    }

    const exists = await Model.exists({ _id: body._id });
    if (exists) throw ApiError.conflict(`${resource.label} "${body._id}" already exists`);

    const created = await Model.create(body);
    res.status(201).json({ data: created.toObject() });
  });

  // PUT = full replace of the document body (keeps _id). Mirrors the admin
  // store's `upsert`, so it creates the doc if it doesn't exist yet.
  const upsert = asyncHandler(async (req, res) => {
    let body = { ...req.body, _id: req.params.id };
    if (resource.transform) body = resource.transform(body);
    const saved = await Model.findOneAndReplace({ _id: req.params.id }, body, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }).lean();
    res.json({ data: saved });
  });

  // PATCH = partial update.
  const patch = asyncHandler(async (req, res) => {
    let { _id, ...rest } = req.body;
    if (resource.transform) rest = resource.transform(rest);
    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: rest },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) throw ApiError.notFound(`${resource.label} not found`);
    res.json({ data: updated });
  });

  const remove = asyncHandler(async (req, res) => {
    const deleted = await Model.findByIdAndDelete(req.params.id).lean();
    if (!deleted) throw ApiError.notFound(`${resource.label} not found`);
    res.json({ data: { _id: req.params.id, deleted: true } });
  });

  return { list, getOne, create, upsert, patch, remove };
}
