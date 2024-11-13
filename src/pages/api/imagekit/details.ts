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
  const fileId = req.query.id as string;

  if (!fileId) {
    return res.status(400).json({ error: "Missing fileId" });
  }

  const file = DEMO_FILE_LIST.find((file) => file.fileId === fileId);

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  
  // const file = await imagekit.getFileDetails(fileId);

  // let url = imagekit.url({
  //   path: file.filePath,
  //   queryParameters: {
  //     updatedAt: new Date(file.updatedAt).getTime().toString(),
  //   },
  // })

  // let url = imagekit.url({
  //   path: `${file.filePath}/ik-master.m3u8`,
  //   transformation: [
  //     {
  //       sr: "240_360_480_720_1080",
  //     },
  //   ],
  // });

  // let url: string

  // if (file.customMetadata?.AbsReady) {
  //   url = imagekit.url({
  //     path: `${file.filePath}/ik-master.m3u8`,
  //     transformation: [{
  //       "sr": "240_360_480_720_1080"
  //     }],
  //   })
  // } else {
  //   url = imagekit.url({
  //     path: file.filePath,
  //     queryParameters: {
  //       updatedAt: new Date(file.updatedAt).getTime().toString(),
  //     },
  //   })
  // }

  res.status(200).json({
    id: file.fileId,
    // TODO: use imagekit.url to generate the thumbnailUrl with updatedAt query param
    thumbnailUrl: "https://ik.imagekit.io/v3sxk1svj/placeholder.jpg?updatedAt=1731564992583",
    url: file.url,
    title: file.customMetadata?.Title ?? file.name,
    description: file.customMetadata?.Description ?? file.name,
    duration: (file as any).duration ?? 0,
    createdAt: file.createdAt,
  });
}
