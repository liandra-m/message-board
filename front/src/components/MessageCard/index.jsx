import { Text, Heading, Flex, Icon, Box, IconButton } from "@chakra-ui/react";

import { getRelativeTime } from "functions/date";

import DeleteMessageModal from "components/DeleteMessageModal";
import EditMessageModal from "components/EditMessageModal";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikeMessage } from "hooks/messages";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default ({ message = {}, user = {}, profile = false }) => {
  const likeMessage = useLikeMessage();

  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(message?.likes?.length);

  const navigate = useNavigate();

  useEffect(() => {
    message?.likes?.find((l) => {
      if (l?.userId === user?.id) setLiked(true);
    });
  }, []);

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
                  onSuccess: () => {
                    isLiked
                      ? setLikeCount((likeCount) => likeCount - 1)
                      : setLikeCount((likeCount) => likeCount + 1);
                    setLiked((isLiked) => !isLiked);
                  },
                  onError: (error) => {
                    if (error?.response?.status === 401) navigate("/login");
                  },
                })
              }
            />
          </Box>
          <Text>{likeCount}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
