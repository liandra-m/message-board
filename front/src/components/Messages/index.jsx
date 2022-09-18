import React, { useState, useContext } from "react";

import { MessageContext } from "../../contexts/messages";
import EditMessageModal from "./EditMessageModal";

import { Container, Text, Heading, Box, SkeletonText } from "@chakra-ui/react";
import DeleteMessageModal from "./DeleteMessageModal";

export default () => {
  const { listMessages, messages } = useContext(MessageContext);
  const [loading, setLoading] = useState(true);
  const [isFailed, setFailed] = useState(false);

  React.useEffect(() => {
    const sucess = listMessages();
    sucess.then(
      (data) => {
        return null;
      },
      (error) => {
        setFailed(true);
      }
    );
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Container>
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
            {isFailed ? (
              "Error listing messages"
            ) : (
              "No messages to show"
            )}
            </Text>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
};
