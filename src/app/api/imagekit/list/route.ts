import { DEMO_FILE_LIST } from "@/data/demo";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "uninitialized",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "uninitialized",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "uninitialized",
});

export async function GET() {
  const files = await imagekit.listFiles({
    path: "/CityJSVideos",
    sort: "DESC_CREATED",
    searchQuery: 'type="file"'
  });

  return NextResponse.json(
    files.map((file) => {
      if (file.type !== "file") {
        return;
      }

      return {
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
      };
    }),
  );
}
