import ImageKit from "imagekit"
import type { NextApiRequest, NextApiResponse } from "next";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "uninitialized",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "uninitialized",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "uninitialized",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * TODO: Use imagekit.getAuthenticationParameters() to get the token, signature, and expire time
   */
  res.status(200).json({
    token: "demo_token",
    signature: "demo_signature",
    expire: 123456,
  });
}
