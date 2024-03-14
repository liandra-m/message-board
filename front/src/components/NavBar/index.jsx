import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FaPaperPlane, FaUserAlt } from "react-icons/fa";

import { useNavigate } from "react-router";

import { useLogout } from "hooks/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "hooks/auth";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default () => {
  const { me, failed, loading } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSmallerThanBreakpoint] = useMediaQuery("min-width: 512px");

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
    <Box
      w="100%"
      h="90px"
      bg="blue.500"
      padding="1em"
      color="white"
      justify="center"
      align="center"
    >
      <Flex
        align="center"
        justify="space-between"
        w={{ base: "90%", md: "75%" }}
      >
        <NavLink to="/messages" _hover={{ cursor: "pointer" }}>
          <Flex align="center" gap="16px">
            <FaPaperPlane size={32} />
            <Text fontWeight="bold" fontSize={{ base: "20px", sm: "24px" }}>
              Message Board
            </Text>
          </Flex>
        </NavLink>
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
            {!loading ? (
              !failed && me ? (
                <>
                  <Text ml="12px">Signed as {me?.name}</Text>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    _hover={{ cursor: "pointer" }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    _hover={{ cursor: "pointer" }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </MenuItem>
              )
            ) : (
              <Spinner />
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
