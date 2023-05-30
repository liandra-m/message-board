import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import { messageSchema } from "views/Messages/validationRules";
import { useEditMessage } from "hooks/messages";

export default ({ message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(messageSchema),
  });

  const toast = useToast();

  const editMessage = useEditMessage();

  const onSubmit = (data) => {
    editMessage(message?.id, data, {
      onSuccess: () => {
        toast({
          title: "Sucessfully edited message.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        reset();
        onClose();
      },
      onError: () =>
        toast({
          title: "Failed editing message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        }),
    });
  };

  return (
    <>
      <EditIcon
        margin="0 10px"
        _hover={{ cursor: "pointer" }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent padding="10px">
            <ModalHeader>Editing message</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl marginTop="1em" isInvalid={errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  {...register("title")}
                  type="text"
                  placeholder="This is a title"
                  maxLength={255}
                  defaultValue={message?.title}
                />
                <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl marginTop="1em" isInvalid={errors?.body}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  {...register("body")}
                  type="text"
                  placeholder="Lorem ipsum..."
                  defaultValue={message?.body}
                />
              </FormControl>
              <FormErrorMessage>{errors?.body?.message}</FormErrorMessage>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
