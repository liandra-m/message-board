import { Box, Center, Flex } from "@chakra-ui/react";
import MessageCard from "components/MessageCard";

import NavBar from "components/NavBar";

import { useAuth } from "hooks/auth";
import { useGetMessages } from "hooks/messages";
import { useMessages } from "hooks/messages";
import { useEffect } from "react";

export default () => {
  const { me: user, loading: loadingUser, failed: failedUser } = useAuth();
  const [
    getMessages,
    { messages, loading: loadingMessages, failed: failedMessages },
  ] = useGetMessages();

  const handleMessages = async () => {
    await getMessages({ user_id: user?.id });
  };

  useEffect(() => {
    handleMessages();
  }, [user]);

  return (
    <>
      <NavBar />
      {!loadingUser && !loadingMessages && (
        <Flex justify="space-around" padding="0 10%" bg="gray.100">
          <Box minH="200px" background="blue.600" minW="100px"></Box>
          <Flex direction="column" align="center" justify="center">
            {messages?.map((message) => (
              <MessageCard
                message={message}
                user={{ id: user?.id, name: user?.name }}
                profile
              />
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
};
