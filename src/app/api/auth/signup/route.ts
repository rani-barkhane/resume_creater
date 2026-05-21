import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";
import { jsonOk, jsonError, serializeDoc } from "@/lib/api-utils";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return jsonError("Name, email, and password are required");
    if (password.length < 6)
      return jsonError("Password must be at least 6 characters");

    await connectDB();
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return jsonError("Email already registered", 409);

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase());
    const role = adminEmails.includes(email.toLowerCase()) ? "admin" : "user";

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role,
    });

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    await setAuthCookie(token);

    const { password: _, ...safe } = serializeDoc(user);
    return jsonOk({ user: safe, token });
  } catch (e) {
    console.error("Signup error:", e);
    return jsonError("Signup failed", 500);
  }
}
