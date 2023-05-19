import React, { useContext } from "react";
import { useForm } from "react-hook-form";

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
  Textarea,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import { MessageContext } from "contexts/messages";

export default ({ id, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { editMessage } = useContext(MessageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
