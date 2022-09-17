import React, { useState, useContext } from "react";

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
} from "@chakra-ui/react";

import { MessageContext } from "../../../contexts/messages";

import { EditIcon } from "@chakra-ui/icons";

export default ({ id, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { editMessage } = useContext(MessageContext);

  const [title, setTitle] = useState(message.title);
  const [body, setBody] = useState(message.body);

  const onSubmit = (e) => {
    e.preventDefault();

    const editedMessage = {
      title,
      body,
    };

    editMessage(id, editedMessage);
    onClose()
  };

  return (
    <>
      <EditIcon margin="0 10px" _hover={{ cursor: "pointer" }} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent padding="10px">
            <ModalHeader>Editando mensagem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">Confirmar</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
