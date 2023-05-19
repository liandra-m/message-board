import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  VStack,
  Center,
} from "@chakra-ui/react";

import { MessageContext } from "contexts/messages";

export default () => {
  const { addMessage } = useContext(MessageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const onSubmit = (data) => {
    const success = addMessage(data);

    success.then(
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="24px">
          <FormControl marginTop="1em">
            <FormLabel>Title</FormLabel>
            <Input
              {...register("title")}
              type="text"
              placeholder="This is a title"
            />
          </FormControl>
          <FormControl marginTop="1em">
            <FormLabel>Content</FormLabel>
            <Textarea
              {...register("content")}
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
