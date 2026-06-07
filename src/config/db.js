// MongoDB connection lifecycle via Mongoose.

import mongoose from "mongoose";
import { env } from "./env.js";

mongoose.set("strictQuery", true);

export async function connectDB(uri = env.mongoUri) {
  mongoose.connection.on("connected", () => {
    console.log("✓ MongoDB connected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("✗ MongoDB error:", err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("… MongoDB disconnected");
  });

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
  });
  return mongoose.connection;
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
