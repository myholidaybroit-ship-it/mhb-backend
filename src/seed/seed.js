// Seeds MongoDB from the canonical content tree (the same SEED the admin CMS
// ships). Idempotent: upserts by business key. Pass --fresh to wipe first.
//
//   npm run seed          # upsert seed content, keep anything already there
//   npm run seed:fresh    # drop the seeded collections first, then seed
//
// Also provisions the first admin account from SEED_ADMIN_* env vars and gives
// every seeded demo user a known password so the auth flows work out of the box.

import mongoose from "mongoose";
import { pathToFileURL } from "node:url";
import { connectDB, disconnectDB } from "../config/db.js";
import { env } from "../config/env.js";
import { SEED } from "./data/seed.js";
import {
  User, Destination, Weekend, Traveler, TravelerGroup, Assignment, Enquiry,
  Testimonial, Moment, Itinerary, Place, Hotel, Block, TripTemplate, Singleton,
} from "../models/index.js";

// seedKey → { Model, idField } for the array collections.
const COLLECTIONS = [
  ["destinations", Destination, "slug"],
  ["weekends", Weekend, "id"],
  ["travelers", Traveler, "id"],
  ["travelerGroups", TravelerGroup, "id"],
  ["assignments", Assignment, "id"],
  ["enquiries", Enquiry, "id"],
  ["testimonials", Testimonial, "id"],
  ["moments", Moment, "id"],
  ["itineraries", Itinerary, "id"],
  ["places", Place, "id"],
  ["hotels", Hotel, "id"],
  ["blocks", Block, "id"],
  ["tripTemplates", TripTemplate, "id"],
];

const SINGLETONS = ["home", "nav", "footer", "content", "contact", "adventureStyles", "careers", "policies", "settings"];

// Demo passwords so seeded accounts can actually log in.
const DEMO_PASSWORDS = { "test@gmail.com": "Test@71922" };
const DEFAULT_DEMO_PASSWORD = "Password@123";

async function seedCollections(fresh) {
  for (const [key, Model, idField] of COLLECTIONS) {
    const rows = SEED[key] || [];
    if (fresh) await Model.deleteMany({});
    let n = 0;
    for (const row of rows) {
      const _id = row[idField] ?? row.id ?? row.slug;
      // _id comes from the query filter on upsert; never put it in $set
      // (Mongoose rejects updating the immutable _id path on existing docs).
      const { _id: _drop, ...body } = row;
      await Model.findByIdAndUpdate(
        _id,
        { $set: body },
        { upsert: true, setDefaultsOnInsert: true }
      );
      n++;
    }
    console.log(`  • ${key}: ${n} upserted`);
  }
}

async function seedSingletons() {
  for (const key of SINGLETONS) {
    if (SEED[key] === undefined) continue;
    await Singleton.findByIdAndUpdate(key, { $set: { value: SEED[key] } }, { upsert: true });
    console.log(`  • ${key}: singleton set`);
  }
}

async function seedUsers(fresh) {
  const rows = SEED.users || [];
  let n = 0;
  for (const u of rows) {
    const email = (u.email || "").toLowerCase();
    const existing = await User.findById(u.id);
    if (existing && !fresh) continue;
    if (fresh && existing) await existing.deleteOne();

    await User.create({
      _id: u.id,
      name: u.name,
      email,
      password: DEMO_PASSWORDS[email] || DEFAULT_DEMO_PASSWORD,
      role: (u.role || "customer").toLowerCase() === "admin" ? "admin" : "customer",
    });
    n++;
  }
  console.log(`  • users: ${n} demo accounts created`);
}

async function seedAdmin() {
  const { name, email, password } = env.seedAdmin;
  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    console.log(`  • admin: ${email} already exists`);
    return;
  }
  await User.create({ _id: `u_admin_${Date.now().toString(36)}`, name, email, password, role: "admin" });
  console.log(`  • admin: created ${email}`);
}

// Runs the full seed against the CURRENT mongoose connection. Importable so the
// API or a test harness can seed in-process; does not connect or exit.
export async function seedDatabase({ fresh = false, log = console.log } = {}) {
  log(`\nSeeding MyHolidayBro${fresh ? " (fresh — wiping seeded collections)" : ""}…\n`);
  await seedCollections(fresh);
  await seedSingletons();
  await seedUsers(fresh);
  await seedAdmin();
  log("\n✓ Seed complete.\n");
  log(`  Admin login:  ${env.seedAdmin.email}  /  ${env.seedAdmin.password}`);
  log("  Demo user:    test@gmail.com  /  Test@71922\n");
}

// CLI entry: `node src/seed/seed.js [--fresh]`
async function runCli() {
  const fresh = process.argv.includes("--fresh");
  await connectDB();
  await seedDatabase({ fresh });
  await disconnectDB();
  await mongoose.connection.close();
  process.exit(0);
}

const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  runCli().catch(async (err) => {
    console.error("✗ Seed failed:", err);
    await disconnectDB().catch(() => {});
    process.exit(1);
  });
}
