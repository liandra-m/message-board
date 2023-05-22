import React, { useEffect } from "react";

import {
  Text,
  Heading,
  Box,
  SkeletonText,
  Center,
  Flex,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import EditMessageModal from "./EditMessageModal";
import DeleteMessageModal from "./DeleteMessageModal";
import AddMessage from "./AddMessage";

import { useMessages } from "hooks/messages";
import { useAuth } from "hooks/auth";
import { formatDate } from "functions/date";

export default () => {
  const { messages, loading, failed } = useMessages();
  const { me: user, loading: loadingUser } = useAuth();

  return (
    <>
      <NavBar />
      <Flex direction="column" align="center" justify="center" bg="gray.100">
        <AddMessage />
        {loading || loadingUser ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : messages && messages.length > 0 ? (
          <div>
            {messages.map((message) => {
              return (
                <Box key={message.id} margin="1em 0">
                  <Box
                    textAlign="left"
                    bg="white"
                    padding="1em"
                    borderRadius="12px"
                  >
                    <Heading>{message.title}</Heading>
                    <Text mb="1em">{message.body}</Text>
                    <Text color="gray.600" mb="1em">
                      Written by {message?.user?.name || "Guest"}{" "}
                      {formatDate(message?.createdAt)}
                    </Text>
                    {message?.updatedAt !== message?.createdAt && (
                      <Text color="gray.600" mb=".5em">
                        Updated at {formatDate(message?.updatedAt)}
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
                        <DeleteMessageModal
                          id={message.id}
                          title={message.title}
                        />
                      </Box>
                    )}
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
