import { Avatar, Box, Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
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
    await getMessages({ user_id: user?.id });
  };

  useEffect(() => {
    handleMessages();
  }, [user]);

  return (
    <Flex direction="column" h="100vh">
      <NavBar />
      {loadingUser || loadingMessages ? 
        <Center h="100%">
          <Spinner thickness={6} color="blue.500" w="100px" h="100px"/>
        </Center>
      : (
        <Flex justify="space-around" padding="0 10%" bg="gray.100">
          <Flex
            background="blue.500"
            minH="400px"
            maxH="600px"
            w="25%"
            m="1em 2.5em"
            direction="column"
            align="center"
            justify="center"
            padding="2em 1em"
          >
            <Avatar border="2px solid white" w="80px" h="80px" mb=".75em" />
            <Text mb=".75em" color="white" fontSize="24px" fontWeight="bold">
              {user?.name}
            </Text>
            <VStack
              color="white"
              spacing="12px"
              w="100%"
              align="start"
              marginLeft="1em"
            >
              <Flex direction="column">
                <Text color="gray.300">email</Text>
                <Text>{user?.email}</Text>
              </Flex>
              <Flex direction="column">
                <Text color="gray.300">Registered in</Text>
                <Text>{formatDateTime(user?.createdAt)}</Text>
              </Flex>
              <Flex direction="column">
                <Text color="gray.300">Posted</Text>
                <Text>{messages?.length} messages</Text>
              </Flex>
            </VStack>
          </Flex>
          <Flex
            w="75%"
            direction="column"
          >
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
    </Flex>
  );
};
