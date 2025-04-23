"use client";

import { VideoPreview } from "@/components/VideoPreview";
import { Badge, Flex, Grid, GridItem, HStack, Skeleton, SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
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

  return (
    <VStack px="12" py="6" pt="2" w="full">
      <HStack justifyContent="flex-start" alignItems="flex-start" w="full" py="2" gap="3" pb="7">
        <Badge
          variant="solid"
          fontSize="14px"
          textTransform="capitalize"
          px="3"
          py="1"
          borderRadius="6"
          colorScheme="blackAlpha"
          backgroundColor="black"
        >
          All
        </Badge>
        <Badge
          variant="solid"
          fontSize="14px"
          textTransform="capitalize"
          px="3"
          py="1"
          borderRadius="6"
          backgroundColor="gray.100"
          color="black"
        >
          Nature
        </Badge>
        <Badge
          variant="solid"
          fontSize="14px"
          textTransform="capitalize"
          px="3"
          py="1"
          borderRadius="6"
          backgroundColor="gray.100"
          color="black"
        >
          City
        </Badge>
        <Badge
          variant="solid"
          fontSize="14px"
          textTransform="capitalize"
          px="3"
          py="1"
          borderRadius="6"
          backgroundColor="gray.100"
          color="black"
        >
          Sea
        </Badge>
      </HStack>
      <Grid templateColumns="repeat(4, 1fr)" w="full">
        {videos.length > 0
          ? videos.map((video) => (
              <GridItem
                key={`video-${video.id}`}
                pb="10"
                px="2"
                sx={{
                  "&:nth-of-type(4n + 1)": {
                    paddingLeft: 0,
                  },
                  "&:nth-of-type(4n + 4)": {
                    paddingRight: 0,
                  },
                }}
              >
                <VideoPreview
                  id={video.id}
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                  description={video.description}
                  duration={video.duration}
                  createdAt={video.createdAt}
                />
              </GridItem>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <GridItem
                key={`skeleton-${index}`}
                pb="10"
                px="2"
                sx={{
                  "&:nth-of-type(4n + 1)": {
                    paddingLeft: 0,
                  },
                  "&:nth-of-type(4n + 4)": {
                    paddingRight: 0,
                  },
                }}
              >
                <Skeleton height="70%" borderRadius="8px" minH="160px" />
                <Flex justifyContent="space-between" alignItems="center" mt="-1" gap="4">
                  <SkeletonCircle size="8" />
                  <SkeletonText mt="4" noOfLines={3} spacing="3" skeletonHeight="2" flex="1" />
                </Flex>
              </GridItem>
            ))}
      </Grid>
    </VStack>
  );
}
