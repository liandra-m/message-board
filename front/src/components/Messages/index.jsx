import React, { useContext } from "react";

import { MessageContext } from "../../contexts/messages";
import EditMessageModal from "./EditMessageModal";

import {
  Container,
  Text,
  Heading,
  Box,
} from '@chakra-ui/react';
import DeleteMessageModal from "./DeleteMessageModal";

export default () => {
  const { listMessages, deleteMessage, messages } = useContext(MessageContext);

  React.useEffect(() => {
    listMessages();
  }, []);

  const handleDelete = (id) => {
    deleteMessage(id);
  }

  return (
    <React.Fragment>
      <Container>
        {messages && messages.length > 0 ? (
          <div>
            {messages.map((message) => {
              return (
                <Box minW="100%" key={message.id} margin="1em 0">
                  <Box textAlign="left">
                    <Box marginLeft="10px">
                      <Heading>
                        {message.title}
                      </Heading>
                      <Text>{message.body}</Text>
                    </Box>
                    <Box padding="5px 10px" marginTop="1em" textAlign="right" backgroundColor="gray.100" borderBottomRadius="10px">
                      <EditMessageModal id={message.id} message={{title: message.title, body: message.body}}/> 
                      <DeleteMessageModal id={message.id} title={message.title} />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </div>
        ) : (
          <div>
            <p>Sem messages para exibir</p>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};
