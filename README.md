# MyHolidayBro — Backend API (`backend-mhb`)

REST API powering both the public Next.js site (`/app`) and the admin CMS (`/admin`).
Built with **Express + MongoDB Atlas (Mongoose)**, ESM, JWT auth, **AWS S3** media
storage and **Brevo** transactional email.

It is the single source of truth for the entire content tree the front end renders
and the admin edits — destinations, weekend trips, itineraries, moments, FAQs,
policies, careers, the home page, navigation, footer, settings — plus auth,
wishlists, bookings, enquiries and newsletter sign-ups.

---

## Quick start

```bash
cd backend-mhb
cp .env.example .env            # then fill in the secrets below
npm install

# 1. Point MONGODB_URI at your MongoDB Atlas cluster in .env
#    (Atlas → Connect → Drivers → copy the SRV string, keep /myholidaybro)
#    Local fallback: `docker compose up -d` then use the localhost URI.

# 2. Seed the database with the full content tree + demo accounts
npm run seed                    # idempotent upsert
npm run seed:fresh              # wipe seeded collections first

# 3. Run the API
npm run dev                     # http://localhost:5000  (auto-restart)
npm start                       # production
```

### Configuration (`.env`)

| Group | Keys | Notes |
|---|---|---|
| **Atlas** | `MONGODB_URI` | SRV string ending in `/myholidaybro` |
| **Auth** | `JWT_SECRET`, `JWT_EXPIRES_IN` | long random secret |
| **S3** | `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_PUBLIC_BASE_URL` | media uploads; routes return 503 until set |
| **Brevo** | `BREVO_API_KEY`, `BREVO_NEWSLETTER_LIST_ID`, `MAIL_FROM_EMAIL`, `MAIL_FROM_NAME`, `ADMIN_NOTIFY_EMAIL` | email is logged-and-skipped until set |

Both integrations **degrade gracefully**: the API boots and every non-media,
non-email route works even with S3 and Brevo unconfigured.

Health check: `GET http://localhost:5000/api/health`

**Seeded logins**
- Admin: `admin@myholidaybro.com` / `Admin@12345` (from `SEED_ADMIN_*` in `.env`)
- Demo customer: `test@gmail.com` / `Test@71922`

---

## Project structure

```
backend-mhb/
├── docker-compose.yml          # local MongoDB
├── .env.example
└── src/
    ├── server.js               # entrypoint: connect DB, listen, graceful shutdown
    ├── app.js                  # Express assembly: security, cors, routes, errors
    ├── config/
    │   ├── env.js              # validated environment config
    │   ├── db.js               # Mongoose connection lifecycle
    │   └── resources.js        # resource registry → drives generic CRUD
    ├── models/                 # one Mongoose model per collection + Singleton + Media
    ├── services/               # email.js (Brevo), storage.js (S3)
    ├── middleware/             # auth, validate (zod), rateLimit, upload (multer), error, notFound
    ├── controllers/            # auth, account, wishlist, enquiry, newsletter,
    │                           #   content, booking, media, admin
    ├── routes/                 # auth / public / account / admin → index.js
    ├── utils/                  # ApiError, asyncHandler, token, ids, crudFactory
    ├── validators/             # zod schemas
    └── seed/
        ├── seed.js             # `npm run seed`
        └── data/               # seed.js + itinerarySeed.js (copied from /admin)
```

### How collections map to the data

The admin store's `SEED` is the schema. Collections use the **business key as
`_id`** (destinations → slug `"bali"`, enquiries → `"q1"`, places → `"pl_gwk"`),
keeping the documents 1:1 with the front-end data and the admin's export/import.

Rich nested content (packages, itinerary days, policy sections) is stored with
`strict: false`, so each document holds exactly the shape the front end renders.

The eight singletons — `home`, `nav`, `footer`, `content`, `adventureStyles`,
`careers`, `policies`, `settings` — live in the `singletons` collection, one doc
each, value-under-`value`.

---

## API surface

Base URL: `/api`

### Auth — `/api/auth`
| Method | Path | Notes |
|---|---|---|
| POST | `/signup` | `{ name, email, password }` → `{ token, user }` |
| POST | `/login` | `{ email, password }` → `{ token, user }` |
| POST | `/admin/otp/request` | `{ email }` → emails a 6-digit code (admins only; generic response) |
| POST | `/admin/otp/verify` | `{ email, code }` → `{ token, user }` |
| GET | `/me` | 🔒 current user |

### Public content & forms (no auth)
| Method | Path | Notes |
|---|---|---|
| GET | `/content` | all singletons in one map |
| GET | `/content/:key` | one section (`home`, `nav`, …) |
| GET | `/destinations`, `/destinations/:slug` | `?q=`, `?region=`, `?page=`, `?limit=`, `?sort=` |
| GET | `/weekends`, `/weekends/:id` | filters as above |
| GET | `/moments`, `/testimonials` | |
| POST | `/enquiries` | quote / weekend / contact (discriminated by `type`) |
| POST | `/newsletter` | `{ email }` |

### Account — `/api/account` 🔒 customer
| Method | Path | Notes |
|---|---|---|
| GET/PATCH | `/profile` | name, phone, city, notification prefs |
| POST | `/change-password` | |
| GET/PUT/POST/DELETE | `/wishlist` | get / replace / add / clear |
| DELETE | `/wishlist/:id` | remove one |
| GET/POST | `/bookings` | list mine / create |
| GET | `/bookings/:id` | one of mine |

### Admin — `/api/admin` 🔒 admin
| Method | Path | Notes |
|---|---|---|
| GET | `/stats` | dashboard counts + recent enquiries |
| GET/POST | `/export`, `/import` | full content tree (admin-store JSON shape) |
| GET/PUT | `/content/:key` | read / save a singleton |
| GET/DELETE | `/users`, `/users/:id` | |
| GET/DELETE | `/newsletter`, `/newsletter/:id` | subscribers |
| GET/PATCH/DELETE | `/bookings`, `/bookings/:id` | |
| PATCH | `/enquiries/:id/status` | `{ status }` |
| GET | `/media/status` | `{ enabled }` — is S3 configured |
| GET | `/media` | `?type=image&folder=&q=` |
| POST | `/media/presign` | `{ filename, contentType, folder }` → presigned PUT URL |
| POST | `/media` | record metadata after a presigned upload |
| POST | `/media/upload` | multipart (`file`) → server uploads to S3 |
| PATCH/DELETE | `/media/:id` | edit alt/name/folder · delete (also removes the S3 object) |
| — | `/<resource>` | **full CRUD** for every registered resource ↓ |

Registered resources (GET list, GET `:id`, POST, PUT `:id`, PATCH `:id`, DELETE `:id`):
`destinations`, `weekends`, `moments`, `testimonials`, `places`, `hotels`,
`blocks`, `trip-templates`, `itineraries`, `travelers`, `traveler-groups`,
`assignments`, `enquiries`.

---

## Integrations

### MongoDB Atlas
Set `MONGODB_URI` to the Atlas SRV string. The connection lifecycle, indexes and
all models work identically against Atlas or a local Mongo. For dev without
Atlas, `docker compose up -d` starts a local Mongo and you point the URI at it.

### AWS S3 — media storage
`src/services/storage.js` + `src/controllers/media.controller.js`. Two upload paths:

1. **Presigned (recommended)** — `POST /api/admin/media/presign` returns a short-lived
   PUT URL; the client uploads the file straight to S3, then calls `POST /api/admin/media`
   to record it. Keeps large blobs off the API. The admin client helper
   `media.upload(file)` does all three steps.
2. **Server upload** — `POST /api/admin/media/upload` (multipart, 25 MB cap,
   images/video/pdf) streams through the API to S3.

Object keys are namespaced under `S3_UPLOAD_PREFIX` and collision-proofed. Public
URLs use `S3_PUBLIC_BASE_URL` (CloudFront/CDN) when set, else the S3 host. Deleting
a `Media` record also removes the S3 object.

### Brevo — transactional email + newsletter contacts
`src/services/email.js` (Brevo HTTP API, no SDK). All sends are **fire-and-forget
and never throw**, so an email outage can't break a request. Triggers:

| Event | Email |
|---|---|
| Signup | Welcome → customer |
| Enquiry submitted | Acknowledgement → customer · Notification → `ADMIN_NOTIFY_EMAIL` |
| Booking created | Confirmation (with reference) → customer |
| Newsletter subscribe | Contact added/updated on the Brevo list (`BREVO_NEWSLETTER_LIST_ID`) |

Until `BREVO_API_KEY` is set, sends are logged and skipped.

### Admin login — passwordless email OTP
The admin panel signs in with an email one-time code (no password):

1. `POST /api/auth/admin/otp/request { email }` — if the email is an **admin**
   user, a 6-digit code is emailed via Brevo. The response is identical whether
   or not the email is an admin, so it can't be used to enumerate admins.
2. `POST /api/auth/admin/otp/verify { email, code }` → `{ token, user }`.

Hardening: codes are **bcrypt-hashed at rest**, single-use, expire in 10 min
(Mongo TTL index), allow **5 attempts**, and only one is active per email.
The flow is rate-limited (`authLimiter`). In **local dev with Brevo unconfigured**,
`request` returns a `devCode` so you can test without email; this is never
returned in production or when Brevo is set. The admin UI (`admin/src/shell/`)
is wired to this flow; the seeded admin is `admin@myholidaybro.com`.

## Conventions

- **Responses**: success → `{ data, … }`; lists → `{ data, page, limit, total, pages }`.
- **Errors**: `{ error: { message, details? } }` with the right HTTP status.
- **Auth**: `Authorization: Bearer <jwt>`. Tokens expire per `JWT_EXPIRES_IN`.
- **Validation**: zod on every write; field-level `details` on 400.
- **Rate limits**: tight on auth + public forms, generous elsewhere.

## Connecting the front ends

API clients are already added (non-breaking):
- Public site → `app/lib/api.js` (set `NEXT_PUBLIC_API_URL`, see `.env.local.example`)
- Admin CMS → `admin/src/lib/api.js` (set `VITE_API_URL`, see `admin/.env.example`)

Both leave the existing localStorage flows intact; switch a feature to the API
when you're ready.
