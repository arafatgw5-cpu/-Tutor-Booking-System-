import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Better-Auth এর বিল্ট-ইন হ্যান্ডলার সরাসরি এক্সপোর্ট করে দিন
export const { GET, POST } = toNextJsHandler(auth);