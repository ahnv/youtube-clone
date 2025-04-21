import { AppShellWrapper } from "@/components/AppShellWrapper";
import type { Metadata } from "next";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "../styles/videojs-theme.css";
import { ImageKitProvider } from "@imagekit/next";

export const metadata: Metadata = {
  title: "Youtube clone",
  description: "A YouTube clone built with Next.js",
};

// Force dynamic rendering
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const imageKitUrlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  return (
    <html lang="en">
      <body>
        <ImageKitProvider urlEndpoint={imageKitUrlEndpoint}>
          <AppShellWrapper>{children}</AppShellWrapper>
        </ImageKitProvider>
      </body>
    </html>
  );
}
