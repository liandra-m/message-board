import React, { useEffect } from "react";

import { Text, Box, SkeletonText, Flex } from "@chakra-ui/react";

import NavBar from "components/NavBar";
import AddMessage from "../../components/AddMessage";

import { useGetMessages } from "hooks/messages";
import { useAuth } from "hooks/auth";

import MessageCard from "../../components/MessageCard";
import LoadingMessageCard from "components/LoadingMessageCard";

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
      <Flex direction="column" align="center" justify="center">
        <Flex w="75%" m="1em 2.5em" direction="column">
          <AddMessage />
          {loading || loadingUser ? (
            <LoadingMessageCard />
          ) : messages && messages.length > 0 ? (
            messages.map((message) => {
              return (
                <MessageCard
                  user={user}
                  message={message}
                  isLiked={message?.likes?.find((l) => {
                    if (l?.userId === user?.id) return true;
                  })}
                />
              );
            })
          ) : (
            <Box>
              <Text marginTop="1em">
                {failed ? "Error listing messages" : "No messages to show"}
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
};
