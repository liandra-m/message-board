import {
  Avatar,
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import MessageCard from "components/MessageCard";

import NavBar from "components/NavBar";
import { formatDateTime } from "functions/date";

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
    await getMessages({ userId: user?.id });
  };

  useEffect(() => {
    handleMessages();
  }, [user]);

  return (
    <Flex direction="column" align="center" color="gray.600">
      {!messages.length && <Text>You haven't posted any messages yet!</Text>}
      {messages?.map((message) => (
        <MessageCard
          message={message}
          user={{ id: user?.id, name: user?.name }}
          isLiked={message?.likes?.find((l) => {
            if (l?.userId === user?.id) return true;
          })}
        />
      ))}
    </Flex>
  );
};
