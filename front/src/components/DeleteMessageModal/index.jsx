import React from "react";

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
  Box,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { useDeleteMessage } from "hooks/messages";
import ActionButton from "components/ActionButton";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

export default ({ message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const deleteMessage = useDeleteMessage();

  const onSubmit = (e) => {
    e.preventDefault();

    deleteMessage(message?.id, {
      onSuccess: () => {
        toast({
          title: "Sucessfully deleted message.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      },
      onError: () =>
        toast({
          title: "Failed deleting message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        }),
    });
  };

  return (
    <>
      <ActionButton
        icon={<FaTrashAlt size={22} />}
        hoverColor="red.400"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent padding="10px">
            <ModalHeader>
              Are you sure you want to delete {message?.title}?
            </ModalHeader>
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
