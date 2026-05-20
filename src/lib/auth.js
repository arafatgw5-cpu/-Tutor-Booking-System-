// src/lib/auth.js
import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Set custom DNS servers (useful if your hosting provider has DNS resolution issues)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Safety check: Ensure the environment variable is loaded
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from your environment variables.");
}

// MongoDB Connection
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("tutors-finder");

// Better Auth Config
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  // Email & Password Login Enable
  emailAndPassword: {
    enabled: true,
  },

  // Social Login
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  trustedOrigins: [
    "http://localhost:3000",
  ],
});