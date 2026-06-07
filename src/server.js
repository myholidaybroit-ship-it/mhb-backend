// Process entrypoint: connect to Mongo, start listening, handle shutdown.

import { createApp } from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { env } from "./config/env.js";

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error("✗ Could not connect to MongoDB:", err.message);
    console.error("  Is MongoDB running? Try `docker compose up -d` or set MONGODB_URI.");
    process.exit(1);
  }

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`\n🚀 MyHolidayBro API listening on http://localhost:${env.port}`);
    console.log(`   Health: http://localhost:${env.port}/api/health\n`);
  });

  const shutdown = async (signal) => {
    console.log(`\n${signal} received — shutting down…`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start();
