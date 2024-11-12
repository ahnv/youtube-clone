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
  const files = await imagekit.listFiles({
    path: "/CityJSVideos",
  });

  res.status(200).json(
    files.map((file) => ({
      id: file.fileId,
      thumbnailUrl: imagekit.url({
        path: `${file.filePath}/ik-thumbnail.jpg`,
        queryParameters: {
          updatedAt: new Date(file.updatedAt).getTime().toString(),
        },
      }),
      title: file.customMetadata?.Title ?? file.name,
      description: file.customMetadata?.Description ?? file.name,
      duration: (file as any).duration ?? 0,
      createdAt: file.createdAt,
    }))
  );
}
