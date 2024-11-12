import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = crypto.randomUUID();
  const expire = (Math.floor(Date.now() / 1000) + 2400).toString();
  const privateAPIKey = privateKey;
  const signature = crypto
    .createHmac("sha1", privateAPIKey)
    .update(token + expire)
    .digest("hex");

  res.status(200).json({
    token,
    expire,
    signature,
  });
}
