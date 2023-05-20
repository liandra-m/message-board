import React from "react";

import EditMessageModal from "./EditMessageModal";

import {
  Text,
  Heading,
  Box,
  SkeletonText,
  Center,
  Flex,
} from "@chakra-ui/react";
import DeleteMessageModal from "./DeleteMessageModal";
import AddMessage from "./AddMessage";
import NavBar from "components/NavBar";
import { useMessages } from "hooks/messages";

export default () => {
  const { messages, loading, failed } = useMessages();

  return (
    <>
      <NavBar />
      <Flex direction="column" align="center" justify="center">
        <AddMessage />
        {loading ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : messages && messages.length > 0 ? (
          <div>
            {messages.map((message) => {
              return (
                <Box minW="100%" key={message.id} margin="1em 0">
                  <Box textAlign="left">
                    <Box marginLeft="10px">
                      <Heading>{message.title}</Heading>
                      <Text>{message.body}</Text>
                    </Box>
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
                      <DeleteMessageModal
                        id={message.id}
                        title={message.title}
                      />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </div>
        ) : (
          <Box>
            <Text marginTop="1em">
              {failed ? "Error listing messages" : "No messages to show"}
            </Text>
          </Box>
        )}
      </Flex>
    </>
  );
};
