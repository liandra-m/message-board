import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaArrowAltCircleRight, FaUser } from "react-icons/fa";

import { useNavigate } from "react-router";

import { useLogout } from "hooks/auth";
import { ArrowBackIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    logout({
      onError: () =>
        toast({
          title: "Failed to logout.",
          status: "error",
          duration: 5000,
          isClosable: true,
        }),

      onSuccess: () => {
        toast({
          title: "Successfully logout.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        return navigate("/login");
      },
    });
  };

  return (
    <Box w="100%" minH="50px" bg="blue.500" padding="1em" color="white">
      <Flex align="center" justify="space-between" padding="0 10%">
        <Text fontWeight="bold" fontSize="24px">
          Message Board
        </Text>
        <Menu offset={[-150, 7]}>
          <MenuButton rightIcon={<ChevronDownIcon />}>
            <Flex
              w="50px"
              h="50px"
              borderRadius="50%"
              bg="blue.700"
              align="center"
              justify="center"
            >
              <FaUserAlt />
            </Flex>
          </MenuButton>
          <MenuList color="gray.700">
            <Text ml="12px">Signed as</Text>
            <MenuDivider />
            <MenuItem _hover={{ cursor: "pointer" }}>Profile</MenuItem>
            <MenuItem
              _hover={{ cursor: "pointer" }}
              onClick={() => handleLogout()}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
