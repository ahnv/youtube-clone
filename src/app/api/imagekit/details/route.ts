import { DEMO_FILE_LIST } from "@/data/demo";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "uninitialized",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "uninitialized",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "uninitialized",
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");

  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  }

  const file = await imagekit.getFileDetails(fileId);

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  let url: string;

  if (file.customMetadata?.AbsReady) {
    url = imagekit.url({
      path: `${file.filePath}/ik-master.m3u8`,
      transformation: [
        {
          sr: "240_360_480_720_1080",
        },
      ],
    });
  } else {
    url = imagekit.url({
      path: file.filePath,
      queryParameters: {
        updatedAt: new Date(file.updatedAt).getTime().toString(),
      },
    });
  }

  return NextResponse.json({
    id: file.fileId,
    thumbnailUrl: imagekit.url({
      path: `${file.filePath}/ik-thumbnail.jpg`,
      queryParameters: {
        updatedAt: new Date(file.updatedAt).getTime().toString(),
      },
    }),
    url: url,
    title: file.customMetadata?.Title ?? file.name,
    description: file.customMetadata?.Description ?? file.name,
    duration: (file as any).duration ?? 0,
    createdAt: file.createdAt,
  });
}
