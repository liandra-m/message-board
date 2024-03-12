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
  Flex,
  Image,
} from "@chakra-ui/react";

import { messageSchema } from "../../views/Messages/validationRules";
import { useAddMessage } from "hooks/messages";
import { useAuth } from "hooks/auth";

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

  const { me: user } = useAuth();

  const onSubmit = (data) => {
    data.userId = user?.id;

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
    <Flex
      position="relative"
      bg="white"
      margin="1em"
      padding={{ base: "1em", lg: "2.25em" }}
      borderRadius="12px"
      justify="center"
      align="center"
      gap="32px"
    >
      <Image
        src="/assets/imgs/messaging.svg"
        maxW={{ md: "240px", lg: "400px" }}
        display={{ base: "none", md: "block" }}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: 100 + "%" }}>
        <VStack
          spacing="24px"
          justify="center"
          align="center"
          textAlign="center"
        >
          <FormControl isInvalid={errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input
              {...register("title")}
              type="text"
              placeholder="This is a title"
              maxLength={255}
            />
            <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.body}>
            <FormLabel>Content</FormLabel>
            <Textarea
              {...register("body")}
              type="text"
              rows={5}
              placeholder="Lorem ipsum..."
            />
            <FormErrorMessage>{errors?.body?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <Button colorScheme="blue" type="submit" w="100%">
              Add Message
            </Button>
          </FormControl>
        </VStack>
      </form>
    </Flex>
  );
};
