import { Heading, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <VStack px="12" py="6">
      <Heading as="h1" size="xl" mb="8" textAlign="center">
        Create your own YouTube clone using <br />
        ImageKit Video API
      </Heading>
    </VStack>
  );
}
