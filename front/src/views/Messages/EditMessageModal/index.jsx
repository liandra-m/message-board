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
  useToast,
} from "@chakra-ui/react";

import { MessageContext } from "../../../contexts/messages";

import { EditIcon } from "@chakra-ui/icons";

export default ({ id, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { editMessage } = useContext(MessageContext);

  const [title, setTitle] = useState(message.title);
  const [body, setBody] = useState(message.body);

  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    const editedMessage = {
      title,
      body,
    };

    const sucess = editMessage(id, editedMessage);
    if (sucess){
      toast({
        title: 'Sucessfully edited message.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onClose()
    } else {
      toast({
        title: 'Failed editing message.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  };

  return (
    <>
      <EditIcon margin="0 10px" _hover={{ cursor: "pointer" }} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent padding="10px">
            <ModalHeader>Editing message</ModalHeader>
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
              <Button colorScheme="blue" type="submit">Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
