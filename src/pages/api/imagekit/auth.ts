import ImageKit from "imagekit";
import type { NextApiRequest, NextApiResponse } from "next";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

type Data = ReturnType<typeof imagekit.getAuthenticationParameters>;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json(imagekit.getAuthenticationParameters());
}
