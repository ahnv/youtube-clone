import ImageKit from "imagekit";
import type { NextApiRequest, NextApiResponse } from "next";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileId = req.query.id as string;

  if (!fileId) {
    return res.status(400).json({ error: "Missing fileId" });
  }

  const file = await imagekit.getFileDetails(fileId);

  let url : string
  if (file.customMetadata?.AbsReady) {
    url = imagekit.url({
      path: `${file.filePath}/ik-master.m3u8`,
      transformation: [{
        "sr": "240_360_480_720_1080"
      }],
    })
  } else {
    url = imagekit.url({
      path: file.filePath,
      queryParameters: {
        updatedAt: new Date(file.updatedAt).getTime().toString(),
      },
    })
  }

  res.status(200).json({
    id: file.fileId,
    thumbnailUrl: imagekit.url({
      path: `${file.filePath}/ik-thumbnail.jpg`,
      queryParameters: {
        updatedAt: new Date(file.updatedAt).getTime().toString(),
      },
    }),
    url,
    title: file.customMetadata?.Title ?? file.name,
    description: file.customMetadata?.Description ?? file.name,
    duration: (file as any).duration ?? 0,
    createdAt: file.createdAt,
  });
}
