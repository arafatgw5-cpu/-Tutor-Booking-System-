import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';
import dns from 'dns';

dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const client = new MongoClient(process.env.MONGODB_URI);
let authReady = false;
let authInstance = null;

async function initAuth() {
  if (authReady) return authInstance;

  try {
    await client.connect();
    const db = client.db('tutorsFinderDB');

    authInstance = betterAuth({
      baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      secret: process.env.BETTER_AUTH_SECRET,
      database: mongodbAdapter(db, {
        client,
      }),
      emailAndPassword: {
        enabled: true,
      },
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

    authReady = true;
    return authInstance;
  } catch (error) {
    console.error('Auth initialization failed:', error);
    throw error;
  }
}

export { initAuth };

// Lazy export for route handler
export const auth = {
  async handler(req) {
    const authObj = await initAuth();
    return authObj.handler(req);
  },
};
