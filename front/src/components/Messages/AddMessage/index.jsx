import React, { useState, useContext } from "react";

import { MessageContext } from "../../../contexts/messages";

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Container,
  useToast,
  VStack,
  Center,
} from "@chakra-ui/react";

export default () => {
  const { addMessage } = useContext(MessageContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    setTitle("");
    setBody("");

    const newMessage = {
      title,
      body,
    };

    const sucess = addMessage(newMessage);

    sucess.then(
      (data) => {
        toast({
          title: "Sucessfully added new message.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      (error) => {
        toast({
          title: "Failed adding new message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <Center>
      <form onSubmit={onSubmit}>
        <VStack spacing="24px">
          <FormControl marginTop="1em">
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="This is a title"
            />
          </FormControl>
          <FormControl marginTop="1em">
            <FormLabel>Content</FormLabel>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              type="text"
              placeholder="Lorem ipsum..."
            />
          </FormControl>
          <FormControl marginTop="1em">
            <Button colorScheme="blue" type="submit">
              Add Message
            </Button>
          </FormControl>
        </VStack>
      </form>
    </Center>
  );
};
