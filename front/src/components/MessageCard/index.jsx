import { Text, Heading, Box } from "@chakra-ui/react";

import { formatDate } from "functions/date";

import DeleteMessageModal from "components/DeleteMessageModal";
import EditMessageModal from "components/EditMessageModal";
import { useEffect } from "react";

export default ({ message = {}, user = {}, profile = false }) => {
  return (
    <Box key={message.id} margin="1em 0">
      <Box textAlign="left" bg="white" padding="1em" borderRadius="12px">
        <Heading>{message.title}</Heading>
        <Text mb="1em">{message.body}</Text>
        <Text color="gray.600" mb="1em">
          Written by {(profile && user?.name) || message?.user?.name || "Guest"}{" "}
          {formatDate(message?.createdAt)}
        </Text>
        {message?.updatedAt !== message?.createdAt && (
          <Text color="gray.600" mb=".5em">
            Updated {formatDate(message?.updatedAt)}
          </Text>
        )}
        {user && user?.id === message?.user_id && (
          <Box
            padding="5px 10px"
            marginTop="1em"
            textAlign="right"
            backgroundColor="gray.100"
            borderBottomRadius="10px"
          >
            <EditMessageModal
              id={message.id}
              message={{ title: message.title, body: message.body }}
            />
            <DeleteMessageModal id={message.id} title={message.title} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
