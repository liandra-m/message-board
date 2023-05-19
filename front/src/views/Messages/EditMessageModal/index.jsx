import React, { useContext } from "react";
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

import { MessageContext } from "contexts/messages";
import { messageSchema } from "../validationRules";

export default ({ id, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { editMessage } = useContext(MessageContext);
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

  const onSubmit = (data) => {
    const success = editMessage(id, data);
    if (success) {
      toast({
        title: "Sucessfully edited message.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      onClose();
    } else {
      toast({
        title: "Failed editing message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
