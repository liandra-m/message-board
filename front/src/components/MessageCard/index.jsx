import { Text, Heading, Flex, Box, IconButton } from "@chakra-ui/react";

import { getRelativeTime } from "functions/date";

import DeleteMessageModal from "components/DeleteMessageModal";
import EditMessageModal from "components/EditMessageModal";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikeMessage } from "hooks/messages";
import { useNavigate } from "react-router";
import ActionButton from "components/ActionButton";

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
        w="100%"
        color="gray.700"
        padding="0.5em 1em"
        borderBottomRadius="10px"
      >
        <Flex gap="30px" align="center" color="gray.600">
          <Text>
            Written by{" "}
            {(profile && user?.name) || message?.user?.name || "Guest"}{" "}
            {getRelativeTime(message?.createdAt)}
          </Text>
          {message?.updatedAt !== message?.createdAt && (
            <Text>Updated {getRelativeTime(message?.updatedAt)}</Text>
          )}
        </Flex>

        <Flex align="center" gap="12px">
          {user && user?.id === message?.userId && (
            <>
              <EditMessageModal message={message} />
              <DeleteMessageModal message={message} />
            </>
          )}

          <ActionButton
            hoverColor="red.500"
            icon={<FaRegHeart size={24} />}
            altIcon={<FaHeart size={22} />}
            isActive={isLiked}
            onClick={() =>
              likeMessage(message?.id, {
                onError: (error) => {
                  if (error?.response?.status === 401) navigate("/login");
                },
              })
            }
          />

          <Text>{message?.likes?.length}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
