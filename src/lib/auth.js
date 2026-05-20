import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';
import dns from 'dns'; // ❌ const dns = require("dns") বাদ দিয়ে ES Import ব্যবহার করুন

// ✅ DNS Fix for MongoDB Connection
dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('mentoradb');

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // 👑 এই অংশটুকু আপনার মিসিং ছিল:
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 5 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
});