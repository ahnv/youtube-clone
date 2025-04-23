"use client";

import { VideoPreview } from "@/components/VideoPreview";
import {
  Avatar,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import videojs from "video.js";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.css";
import "@/styles/videojs-theme.css";

interface VideoFile {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
}

export default function VideoPage() {
  const params = useParams();
  const videoId = params.id as string;
  
  const [file, setFile] = useState<VideoFile | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [videos, setVideos] = useState<any[]>([]);

  const loadVideoDetails = async () => {
    try {
      const response = await fetch(`/api/imagekit/details?id=${videoId}`);
      
      if (!response.ok) {
        setNotFound(true);
        return;
      }
      
      const data = await response.json();
      setFile(data);
    } catch (error) {
      console.error("Error loading video details:", error);
      setNotFound(true);
    }
  };

  const loadVideos = async () => {
    const response = await fetch("/api/imagekit/list");

    if (response.ok) {
      const data = await response.json();
      setVideos(data);
    }
  };

  useEffect(() => {
    loadVideoDetails();
    loadVideos();
  }, [videoId]);

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

        player.play();
      }
    );
    player.responsive(true);
    (player as any).hlsQualitySelector({
      displayCurrentQuality: true,
    });

    return () => {
      player.dispose();
    };
  }, [file?.url, videoEl]);

  if (notFound) {
    return <div>Not Found</div>;
  }

  if (!file) {
    return <div>Loading...</div>;
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
          <source src={file.url} />
        </video>
        <VStack w="full" alignItems="flex-start" gap="4" mt="4">
          <Heading as="h1" size="lg" textAlign="center">
            {file.title}
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
              123k views • {new Date(file.createdAt).toDateString()}
            </Text>

            <Text>{file.description}</Text>
          </VStack>
        </VStack>
      </VStack>
      <VStack flex="3">
        {videos.map((video) => (
          <VideoPreview
            key={video.id}
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
