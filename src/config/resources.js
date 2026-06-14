// Resource registry — the single source of truth that maps each REST path to
// its model, public-readability, search/filter fields and id strategy. Both the
// public and admin routers iterate this list to wire generic CRUD endpoints,
// so adding a new collection is a one-line change here.

import {
  Destination, Weekend,
  Testimonial, Moment, Itinerary, Place, Hotel, Transport, Block, TripTemplate,
  TripQuery, TeamMember, CustomPackage, QuoteTemplate,
} from "../models/index.js";

/**
 * path          → URL segment (/api/<path>, /api/admin/<path>)
 * model         → mongoose model
 * label         → human label for error messages
 * seedKey       → key in the SEED object (src/seed/data/seed.js → SEED)
 * public        → exposed read-only on the public API (GET list + GET :id)
 * slugFrom      → field to slugify into _id when creating without one
 * idPrefix      → prefix for generated uids when there's no natural slug
 * searchFields  → fields matched by ?q=
 * filterFields  → query params allowed as exact-match filters
 */
export const RESOURCES = [
  {
    path: "destinations", model: Destination, label: "Destination", seedKey: "destinations",
    public: true, slugFrom: "name",
    searchFields: ["name", "country", "tagline"], filterFields: ["region", "country"],
    defaultSort: "name",
  },
  {
    path: "weekends", model: Weekend, label: "Weekend trip", seedKey: "weekends",
    public: true, slugFrom: "name",
    searchFields: ["name", "to", "from"], filterFields: ["region"],
    defaultSort: "name",
  },
  {
    path: "moments", model: Moment, label: "Moment", seedKey: "moments",
    public: true, idPrefix: "m",
    searchFields: ["name", "destination", "title"], filterFields: [],
  },
  {
    path: "testimonials", model: Testimonial, label: "Testimonial", seedKey: "testimonials",
    public: true, idPrefix: "v",
    searchFields: ["name", "dest"], filterFields: [],
  },
  {
    path: "places", model: Place, label: "Place", seedKey: "places",
    public: false, idPrefix: "pl",
    searchFields: ["name", "description", "city"], filterFields: ["city", "category"],
  },
  {
    path: "hotels", model: Hotel, label: "Hotel", seedKey: "hotels",
    public: false, idPrefix: "ht",
    searchFields: ["name", "location", "city"], filterFields: ["city", "category"],
  },
  {
    path: "transports", model: Transport, label: "Transport", seedKey: "transports",
    public: false, idPrefix: "tr",
    searchFields: ["name", "city", "vehicle"], filterFields: ["city"],
  },
  {
    path: "blocks", model: Block, label: "Content block", seedKey: "blocks",
    public: false, idPrefix: "bk",
    searchFields: ["title"], filterFields: ["kind"],
  },
  {
    path: "trip-templates", model: TripTemplate, label: "Trip template", seedKey: "tripTemplates",
    public: false, idPrefix: "tpl",
    searchFields: ["name", "destination"], filterFields: [],
  },
  {
    path: "itineraries", model: Itinerary, label: "Itinerary", seedKey: "itineraries",
    public: false, idPrefix: "it",
    searchFields: ["title", "clientName", "destination", "tripId"], filterFields: ["status", "destination"],
  },
  {
    path: "trip-queries", model: TripQuery, label: "Trip query", seedKey: "tripQueries",
    public: false, idPrefix: "tq",
    searchFields: ["destination", "guest.name", "guest.phone", "guest.email", "assignedTo"],
    filterFields: ["status", "assignedTo"],
  },
  {
    path: "team-members", model: TeamMember, label: "Team member", seedKey: "teamMembers",
    public: false, idPrefix: "tm",
    searchFields: ["name", "email", "phone"], filterFields: ["active", "role"],
    defaultSort: "name",
  },
  {
    path: "custom-packages", model: CustomPackage, label: "Custom package", seedKey: "customPackages",
    public: false, idPrefix: "cp",
    searchFields: ["title", "destination", "traveller.name", "traveller.phone"],
    filterFields: ["status"],
  },
  {
    path: "quote-templates", model: QuoteTemplate, label: "Quote template", seedKey: "quoteTemplates",
    public: false, idPrefix: "qtpl",
    searchFields: ["name", "destination"], filterFields: ["destination"],
    defaultSort: "name",
  },
];

export const PUBLIC_RESOURCES = RESOURCES.filter((r) => r.public);
export const resourceByPath = (p) => RESOURCES.find((r) => r.path === p);
