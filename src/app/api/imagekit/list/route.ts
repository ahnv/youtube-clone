import { DEMO_FILE_LIST } from "@/data/demo";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "uninitialized",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "uninitialized",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "uninitialized",
});

// GET handler function for the route
export async function GET() {
  /**
   * TODO: use imagekit.listFiles to get the list of files with DESC_CREATED sort order and folder path
   */
  const files = DEMO_FILE_LIST;

  // Return response with video data
  return NextResponse.json(
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
