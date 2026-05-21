
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const GET = async (req) => {
  try {
    return await handler.GET(req);
  } catch (error) {
    console.error("❌ Auth GET error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    return await handler.POST(req);
  } catch (error) {
    console.error("❌ Auth POST error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
};