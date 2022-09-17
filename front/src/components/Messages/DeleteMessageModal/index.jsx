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
} from "@chakra-ui/react";

import { MessageContext } from "../../../contexts/messages";

import { DeleteIcon } from "@chakra-ui/icons";

export default ({ id, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteMessage } = useContext(MessageContext);

  const onSubmit = (e) => {
    e.preventDefault();

    deleteMessage(id);
    onClose()
  };

  return (
    <>
      <DeleteIcon _hover={{cursor: "pointer"}} marginRight="10px" onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent padding="10px">
            <ModalHeader>Deseja mesmo deletar a mensagem {title}?</ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="red" type="submit">Confirmar</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
