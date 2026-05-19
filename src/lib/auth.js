// src/lib/auth.js
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// MongoDB Connection
const client = new MongoClient(process.env.MONGODB_URI);

// Database Name
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

  // Social Login Example
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