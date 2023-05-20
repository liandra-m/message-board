import { Center, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default ({ statusCode, message }) => {
  const navigate = useNavigate();

  setTimeout(() => navigate("/messages"), 5000);

  return (
    <Center h="100vh" bg="gray.100">
      <Flex direction="column" align="center">
        <Heading mb=".5em" as="h1" fontSize="64px" letterSpacing="12px">
          {statusCode}
        </Heading>
        <Text mb=".25em" fontSize="24px" letterSpacing="1.5px">
          {message}
        </Text>
        <Text mb=".25em" fontSize="24px">
          Auto-redirecting to app...
        </Text>
        <Link
          href="/messages"
          color="gray.600"
          transition=".25s ease"
          _hover={{ color: "gray.700" }}
        >
          Click here to go rightaway
        </Link>
      </Flex>
    </Center>
  );
};
