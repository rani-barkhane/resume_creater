import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";
import { jsonOk, jsonError, serializeDoc } from "@/lib/api-utils";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return jsonError("Email and password are required");

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return jsonError("Invalid credentials", 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return jsonError("Invalid credentials", 401);

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    await setAuthCookie(token);

    const { password: _, ...safe } = serializeDoc(user);
    return jsonOk({ user: safe, token });
  } catch (e) {
    console.error("Login error:", e);
    return jsonError("Login failed", 500);
  }
}
