import {
  Avatar,
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  LinkOverlay,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import "@github/relative-time-element";
import { IKImage } from "imagekitio-next";
import { useMemo } from "react";
import { HiDotsVertical } from "react-icons/hi";

interface Props {
  id: string;
  duration: number;
  thumbnailUrl: string;
  title: string;
  description: string;
  createdAt: string;
  orientation?: "horizontal" | "vertical";
}

export const VideoPreview = ({
  id,
  duration,
  thumbnailUrl,
  title,
  createdAt,
  orientation = "vertical",
}: Props) => {
  const videoLength = useMemo(() => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${Number(minutes).toString().padStart(2, "0")}:${Number(seconds)
      .toString()
      .padStart(2, "0")}`;
  }, [duration]);

  return (
    <>
      <LinkOverlay
        display={"flex"}
        href={`/videos/${id}`}
        flexDirection={orientation === "vertical" ? "column" : "row"}
        columnGap="4"
        rowGap="3"
      >
        <Box position="relative" flex={orientation === "vertical" ? "1" : "3"}>
          <IKImage
            src={thumbnailUrl}
            transformation={[]}
            alt={title}
            style={{
              borderRadius: "8px",
            }}
            width="460"
            height="260"
          />
          <Badge
            variant="unstyled"
            fontSize="12px"
            borderRadius="sm"
            position="absolute"
            right="1"
            bottom="1"
            background="blackAlpha.600"
            color="white"
          >
            {videoLength}
          </Badge>
        </Box>
        <HStack
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing="2"
          mt="1"
          flex={orientation === "vertical" ? "1" : "4"}
        >
          {orientation === "vertical" ? (
            <Avatar name="Abhinav Dhiman" size="xs" />
          ) : null}
          <Stack spacing="0.5">
            <Heading fontSize="1.2rem">{title.replace(".mp4", "")}</Heading>
            <Text color="muted" fontSize="sm">
              Abhinav Dhiman
            </Text>
            <Text color="muted" fontSize="sm">
              <relative-time
                datetime={createdAt}
                format="relative"
              ></relative-time>
            </Text>
          </Stack>
          <Spacer />
          <IconButton
            variant={"link"}
            icon={<Icon as={HiDotsVertical} />}
            size="lg"
            color="black"
            minW="auto"
            aria-label="Options"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </HStack>
      </LinkOverlay>
    </>
  );
};
