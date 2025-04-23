import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

export const dynamic = 'force-dynamic'

export async function GET() {
  /**
   * TODO: Use getUploadAuthParams to get the token, signature, and expire time
   */
  return NextResponse.json({
    token: "demo_token",
    signature: "demo_signature",
    expire: 123456,
  });
}
