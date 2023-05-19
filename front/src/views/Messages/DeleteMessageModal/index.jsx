import React, { useState, useContext } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { MessageContext } from "contexts/messages";

import { DeleteIcon } from "@chakra-ui/icons";

export default ({ id, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteMessage } = useContext(MessageContext);
  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    const sucess = deleteMessage(id);
    if (sucess) {
      toast({
        title: "Sucessfully deleted message.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Failed deleting message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <DeleteIcon
        _hover={{ cursor: "pointer" }}
        marginRight="10px"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent padding="10px">
            <ModalHeader>Are you sure you want to delete {title}?</ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="red" type="submit">
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
