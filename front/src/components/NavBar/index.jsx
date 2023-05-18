import { Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaUserAlt, FaArrowAltCircleRight, FaUser } from "react-icons/fa";
import { AuthContext } from "../../contexts/auth";

export default () => {
  const { logout } = useContext(AuthContext);

  return (
    <Box w="100%" minH="50px" bg="blue.500" padding="1em" color="white">
      <Flex align="center" justify="space-between">
        <Text fontWeight="bold" fontSize="24px">
          Message Board
        </Text>
        <Flex gap="24px">
          <Flex
            borderRadius="50%"
            w="50px"
            h="50px"
            bg="blue.600"
            align="center"
            justify="center"
            gap="12px"
            _hover={{ cursor: "pointer" }}
          >
            <FaUserAlt />
          </Flex>
          <Flex
            align="center"
            gap="12px"
            _hover={{ cursor: "pointer" }}
            onClick={() => logout()}
          >
            <Text>Logout</Text>
            <FaArrowAltCircleRight />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
