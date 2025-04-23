import { Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <VStack justify="center" align="center" h="60vh" spacing={6}>
      <Heading size="2xl">404</Heading>
      <Heading size="md">Page Not Found</Heading>
      <Button as={Link} href="/" colorScheme="blackAlpha" size="md">
        Return Home
      </Button>
    </VStack>
  );
}
