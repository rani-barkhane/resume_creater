import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError, serializeDoc } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  await connectDB();
  const user = await User.findById(auth.userId).select("-password");
  if (!user) return jsonError("User not found", 404);

  return jsonOk({ user: serializeDoc(user) });
}
