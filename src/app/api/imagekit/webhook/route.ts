import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "uninitialized",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "uninitialized",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "uninitialized",
});


export async function POST(request: NextRequest) {
  const body = await request.json();

  const fileId = body.data.fileId;

  await imagekit.updateFileDetails(fileId, {
    customMetadata: {
      AbsReady: true,
    },
  });

  return NextResponse.json({ success: true });
}
