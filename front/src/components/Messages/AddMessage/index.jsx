import React, { useState, useContext } from "react";

import { MessageContext } from "../../../contexts/messages";

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Container,
} from '@chakra-ui/react';

export default () => {
  const { addMessage, messages } = useContext(MessageContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      title,
      body,
    };

    addMessage(newMessage);
  };

  return (
    <React.Fragment>
      <Container>
        <form onSubmit={onSubmit}>
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
            <Button type="submit">
              Add Message
            </Button>
          </FormControl>
        </form>
      </Container>
    </React.Fragment>
  );
};
