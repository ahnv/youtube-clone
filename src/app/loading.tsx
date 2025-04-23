"use client";

import { Flex, Grid, GridItem, Skeleton, SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack px="12" py="6" pt="2" w="full">
      <Grid templateColumns="repeat(4, 1fr)" w="full">
        {Array.from({ length: 6 }).map((_, index) => (
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
