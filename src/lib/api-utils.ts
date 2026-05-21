import { NextResponse } from "next/server";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function serializeDoc<T extends { _id: unknown }>(
  doc: T
): Record<string, unknown> & { _id: string } {
  const obj = doc as T & { toObject?: () => Record<string, unknown> };
  const plain =
    typeof obj.toObject === "function"
      ? obj.toObject()
      : (doc as unknown as Record<string, unknown>);
  return {
    ...plain,
    _id: String(plain._id),
    userId: plain.userId ? String(plain.userId) : plain.userId,
  };
}
