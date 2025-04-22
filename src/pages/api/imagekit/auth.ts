import { getUploadAuthParams } from "@imagekit/next/server";
import type { NextApiRequest, NextApiResponse } from "next";

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

export const dynamic = 'force-dynamic'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * TODO: Use getUploadAuthParams to get the token, signature, and expire time
   */
  res.status(200).json({
    token: "demo_token",
    signature: "demo_signature",
    expire: 123456,
  });
}
