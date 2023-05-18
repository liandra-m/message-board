import { useContext, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../../contexts/auth";

export default () => {
  const { login } = useContext(AuthContext);
  const [passwordVisibility, setVibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");

    const credentials = {
      email: email,
      password: password,
    };

    const success = await login(credentials);

    console.log(success);

    if (!success)
      return toast({
        title: "Failed to login.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    return toast({
      title: "Successfully logged in.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Center align="center" justify="center" bg="blue.600" h="100vh">
      <form onSubmit={onSubmit}>
        <VStack borderRadius="12px" bg="white" padding="5em" spacing="24px">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="acidburn@ghack.com"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Flex>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={passwordVisibility ? "text" : "password"}
                borderRightRadius={0}
                placeholder="*********"
              />
              <IconButton
                onClick={() => setVibility(!passwordVisibility)}
                icon={passwordVisibility ? <FaEyeSlash /> : <FaEye />}
                borderLeftRadius={0}
              />
            </Flex>
          </FormControl>

          <Input
            type="submit"
            value="Login"
            color="white"
            bg="blue.600"
            transition=".25s ease"
            _hover={{ cursor: "pointer", bg: "blue.500" }}
          />
        </VStack>
      </form>
    </Center>
  );
};
