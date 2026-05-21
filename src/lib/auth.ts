import jwt, { type SignOptions } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import type { JWTPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "resumeforge-dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const COOKIE_NAME = "resumeforge_token";

export function signToken(payload: JWTPayload): string {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie) return cookie;
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

export async function getAuthUser(): Promise<JWTPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyToken(token);
}

export function getAuthFromRequest(req: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME };
