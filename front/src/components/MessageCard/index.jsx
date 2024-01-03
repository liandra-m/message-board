import { Text, Heading, Flex, Icon, Box, IconButton } from "@chakra-ui/react";

import { getRelativeTime } from "functions/date";

import DeleteMessageModal from "components/DeleteMessageModal";
import EditMessageModal from "components/EditMessageModal";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikeMessage } from "hooks/messages";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default ({
  message = {},
  user = {},
  profile = false,
  isLiked = false,
}) => {
  const likeMessage = useLikeMessage();

  const navigate = useNavigate();

  return (
    <Flex
      key={message.id}
      minH="175px"
      w="100%"
      margin="1em 0"
      textAlign="left"
      bg="white"
      borderRadius="10px"
      direction="column"
      justify="space-between"
    >
      <Flex direction="column" padding="1em">
        <Heading>{message.title}</Heading>
        <Text mb="1em">{message.body}</Text>
      </Flex>

      <Flex
        marginTop="1em"
        textAlign="right"
        justify="space-between"
        align="center"
        bg="blue.500"
        w="100%"
        color="white"
        padding="0.5em 1em"
        borderBottomRadius="10px"
      >
        <Flex gap="30px" align="center">
          <Text color="gray.100">
            Written by{" "}
            {(profile && user?.name) || message?.user?.name || "Guest"}{" "}
            {getRelativeTime(message?.createdAt)}
          </Text>
          {message?.updatedAt !== message?.createdAt && (
            <Text color="gray.100">
              Updated {getRelativeTime(message?.updatedAt)}
            </Text>
          )}
        </Flex>

        <Flex align="center" gap="12px">
          {user && user?.id === message?.userId && (
            <>
              <EditMessageModal message={message} />
              <DeleteMessageModal message={message} />
            </>
          )}

          <Box
            borderRadius="50%"
            transition=".25s ease"
            _hover={{ cursor: "pointer", color: "yellow.400", bg: "blue.700" }}
          >
            <IconButton
              icon={isLiked ? <FaHeart size={24} /> : <FaRegHeart size={22} />}
              background="transparent"
              _hover={{ background: "transparent" }}
              _active={{ background: "transparent" }}
              onClick={() =>
                likeMessage(message?.id, {
                  onError: (error) => {
                    if (error?.response?.status === 401) navigate("/login");
                  },
                })
              }
            />
          </Box>
          <Text>{message?.likes?.length}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
