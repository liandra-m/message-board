import { Text, Heading, Flex } from "@chakra-ui/react";

import { getRelativeTime } from "functions/date";

import DeleteMessageModal from "components/DeleteMessageModal";
import EditMessageModal from "components/EditMessageModal";

export default ({ message = {}, user = {}, profile = false }) => {
  return (
    <Flex
      key={message.id}
      minH="175px"
      w="100%"
      margin="1em 0"
      textAlign="left"
      bg="white"
      borderRadius="10px"
      direction="column"
      justify="space-between"
    >
      <Flex direction="column" padding="1em">
        <Heading>{message.title}</Heading>
        <Text mb="1em">{message.body}</Text>
      </Flex>

      <Flex
        marginTop="1em"
        textAlign="right"
        justify="space-between"
        align="center"
        bg="blue.500"
        w="100%"
        color="white"
        padding="0.5em 1em"
        borderBottomRadius="10px"
      >
        <Flex gap="30px" align="center">
          <Text color="gray.100">
            Written by{" "}
            {(profile && user?.name) || message?.user?.name || "Guest"}{" "}
            {getRelativeTime(message?.createdAt)}
          </Text>
          {message?.updatedAt !== message?.createdAt && (
            <Text color="gray.100">
              Updated {getRelativeTime(message?.updatedAt)}
            </Text>
          )}
        </Flex>

        {user && user?.id === message?.user_id && (
          <Flex gap="7px">
            <EditMessageModal message={message} />
            <DeleteMessageModal message={message} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
