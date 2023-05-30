import React, { useEffect } from "react";

import { Text, Box, SkeletonText, Flex } from "@chakra-ui/react";

import NavBar from "components/NavBar";
import AddMessage from "../../components/AddMessage";

import { useGetMessages } from "hooks/messages";
import { useAuth } from "hooks/auth";

import MessageCard from "../../components/MessageCard";

export default () => {
  const { me: user, loading: loadingUser } = useAuth();

  const [getMessages, { messages, loading, failed }] = useGetMessages();

  const handleMessages = async () => {
    await getMessages();
  };

  useEffect(() => {
    handleMessages();
  }, []);

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
              return <MessageCard user={user} message={message} />;
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
