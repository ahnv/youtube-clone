import ImageKit from "imagekit";
import type { NextApiRequest, NextApiResponse } from "next";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "uninitialized",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "uninitialized",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "uninitialized",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * Update file details for fileId with custom metadata AbsReady: true
   */

  res.status(200).json({ success: true });
}
