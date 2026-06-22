// Per-package slug handling. Destinations carry a `packages` array, and each
// package now gets its own SEO detail page at
// /destinations/:destSlug/:packageSlug — which means every package needs a
// stable, unique slug within its destination.
//
// This helper is the single source of truth for that derivation. It honours an
// admin-supplied `slug` (slugified for safety), falls back to the package name,
// and de-duplicates collisions with a numeric suffix so two packages never
// resolve to the same URL. It is applied on every destination write (see
// crudFactory's `transform` hook) and on read in the public single-package
// endpoint, so even un-migrated data exposes consistent slugs.

import { slugify } from "./ids.js";

export function ensurePackageSlugs(dest) {
  if (!dest || !Array.isArray(dest.packages)) return dest;
  const seen = new Set();
  dest.packages = dest.packages.map((p, i) => {
    const base = slugify(p?.slug || p?.name || "") || `package-${i + 1}`;
    let slug = base;
    let n = 2;
    while (seen.has(slug)) slug = `${base}-${n++}`;
    seen.add(slug);
    return { ...p, slug };
  });
  return dest;
}

// Resolve a single package within a destination by its slug. Works on raw docs
// that may not have stored slugs yet (it derives them on the fly first).
export function findPackageBySlug(dest, pkgSlug) {
  if (!dest || !Array.isArray(dest.packages)) return null;
  const copy = ensurePackageSlugs({ ...dest, packages: [...dest.packages] });
  return copy.packages.find((p) => p.slug === pkgSlug) || null;
}
