import { DEMO_FILE_LIST } from "@/data/demo";
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
   * TODO: use imagekit.listFiles to get the list of files with DESC_CREATED sort order and folder path
   */
  const files = DEMO_FILE_LIST

  res.status(200).json(
    files.map((file) => ({
      id: file.fileId,
      // TODO: use imagekit.url to generate the thumbnailUrl with updatedAt query param
      thumbnailUrl: "https://ik.imagekit.io/v3sxk1svj/placeholder.jpg?updatedAt=1731564992583",
      title: file.customMetadata?.Title ?? file.name,
      description: file.customMetadata?.Description ?? file.name,
      duration: (file as any).duration ?? 0,
      createdAt: file.createdAt,
    }))
  );
}
