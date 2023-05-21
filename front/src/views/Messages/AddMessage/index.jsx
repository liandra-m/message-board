import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  VStack,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";

import { messageSchema } from "../validationRules";
import { useAddMessage } from "hooks/messages";

export default () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(messageSchema),
  });

  const toast = useToast();

  const addMessage = useAddMessage();

  const onSubmit = (data) => {
    addMessage(data, {
      onSuccess: () => {
        toast({
          title: "Sucessfully added new message.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        reset();
      },
      onError: () =>
        toast({
          title: "Failed adding new message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        }),
    });
  };

  return (
    <Center bg="white" margin="1em .5em" padding="2em 4em" borderRadius="12px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          spacing="24px"
          justify="center"
          align="center"
          textAlign="center"
        >
          <FormControl marginTop="1em" isInvalid={errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input
              {...register("title")}
              type="text"
              placeholder="This is a title"
              maxLength={255}
            />
            <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl marginTop="1em" isInvalid={errors?.body}>
            <FormLabel>Content</FormLabel>
            <Textarea
              {...register("body")}
              type="text"
              placeholder="Lorem ipsum..."
            />
            <FormErrorMessage>{errors?.body?.message}</FormErrorMessage>
          </FormControl>
          <FormControl marginTop="1em">
            <Button w="100%" colorScheme="blue" type="submit">
              Add Message
            </Button>
          </FormControl>
        </VStack>
      </form>
    </Center>
  );
};
