import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    token: "demo_token",
    signature: "demo_signature",
    expire: 123456,
  });
}
