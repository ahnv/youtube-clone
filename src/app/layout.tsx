import { AppShellWrapper } from "@/components/AppShellWrapper";
import type { Metadata } from "next";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "../styles/videojs-theme.css";

export const metadata: Metadata = {
  title: "Youtube clone",
  description: "A YouTube clone built with Next.js",
};

// Force dynamic rendering
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShellWrapper>{children}</AppShellWrapper>
      </body>
    </html>
  );
}
