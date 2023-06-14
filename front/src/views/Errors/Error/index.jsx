import { Center, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default ({ statusCode, message, redirectTo }) => {
  const navigate = useNavigate();

  if (statusCode.toString().startsWith("40"))
    setTimeout(() => navigate(redirectTo), 5000);

  return (
    <Center h="100vh">
      <Flex direction="column" align="center">
        <Heading mb=".5em" as="h1" fontSize="64px" letterSpacing="12px">
          {statusCode}
        </Heading>
        <Text mb=".25em" fontSize="24px" letterSpacing="1.5px">
          {message}
        </Text>
        {statusCode.toString().startsWith("40") && (
          <Text mb=".25em" fontSize="24px">
            Auto-redirecting to app...
          </Text>
        )}
        <Link
          href={redirectTo}
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
