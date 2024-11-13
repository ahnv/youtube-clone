import { VideoPreview } from "@/components/VideoPreview";
import {
  Avatar,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import videojs from "video.js";

interface VideoProps {
  notFound?: boolean;
  file?: {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    createdAt: string;
  };
}

export default function Video({ notFound, file }: VideoProps) {
  const { title, description, url, createdAt } = file || {};

  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  const [videos, setVideos] = useState<any[]>([]);

  const loadVideos = async () => {
    const response = await fetch("/api/imagekit/list");

    if (response.ok) {
      const data = await response.json();
      setVideos(data);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    if (!videoEl) {
      return;
    }
    const player = videojs(
      "demo",
      {
        playbackRates: [0.5, 1, 1.5, 2],
      },
      function onPlayerReady() {
        console.log("onPlayerReady");
      }
    );
    player.responsive(true);
    player.play();
    // (player as any).hlsQualitySelector({
    //   displayCurrentQuality: true,
    // });

    return () => {
      player.dispose();
    };
  }, [url, videoEl]);

  if (notFound) {
    return <div>Not Found</div>;
  }

  return (
    <HStack w="full" alignItems="flex-start" px="12" py="6" gap="6">
      <VStack flex="7" alignItems="flex-start">
        <video
          ref={(el) => setVideoEl(el)}
          id="demo"
          className={"video-js vjs-default-skin vjs-big-play-centered vjs-16-9"}
          controls
          style={{
            borderRadius: "16px",
          }}
          poster={file?.thumbnailUrl}
        >
          <source src={url} />
        </video>
        <VStack w="full" alignItems="flex-start" gap="4" mt="4">
          <Heading as="h1" size="lg" textAlign="center">
            {title}
          </Heading>
          <HStack gap="4">
            <HStack>
              <Avatar name="Abhinav Dhiman" />
              <VStack alignItems="flex-start" gap="0">
                <Text size="sm" fontWeight="bold">
                  Abhinav Dhiman
                </Text>
                <Text size="xs">10k subscribers</Text>
              </VStack>
            </HStack>
            <Button
              variant="unstyled"
              color="white"
              background="black"
              px="8"
              borderRadius="full"
              size="lg"
            >
              Subscribe
            </Button>
          </HStack>
          <VStack
            background="gray.200"
            borderRadius="12px"
            w="full"
            alignItems="flex-start"
            px="4"
            py="2"
          >
            <Text fontWeight="bold">
              123k views • {new Date(createdAt!).toDateString()}
            </Text>

            <Text>{description}</Text>
          </VStack>
        </VStack>
      </VStack>
      <VStack flex="3">
        {videos.map((video) => (
          <VideoPreview
            id={video.id}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            description={video.description}
            duration={video.duration}
            createdAt={video.createdAt}
            orientation="horizontal"
          />
        ))}
      </VStack>
    </HStack>
  );
}

export const getServerSideProps = (async (context) => {
  const file = await fetch(
    `http://${context.req.headers["host"]}/api/imagekit/details?id=${
      context.params!.id
    }`
  );

  if (!file.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      notFound: false,
      file: await file.json(),
    },
  };
}) satisfies GetServerSideProps<VideoProps>;
