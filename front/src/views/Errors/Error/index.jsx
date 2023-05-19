import { Center, Flex, Heading, Link, Text } from "@chakra-ui/react";

export default ({ statusCode, message }) => {
  return (
    <Center h="100vh" bg="gray.100">
      <Flex direction="column" align="center">
        <Heading mb=".5em" as="h1" fontSize="64px" letterSpacing="12px">
          {statusCode}
        </Heading>
        <Text mb=".25em" fontSize="24px" letterSpacing="1.5px">
          {message}
        </Text>
        <Link
          href="/messages"
          color="gray.600"
          transition=".25s ease"
          _hover={{ color: "gray.700" }}
        >
          Click here to go back
        </Link>
      </Flex>
    </Center>
  );
};
