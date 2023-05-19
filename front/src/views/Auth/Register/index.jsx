import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "contexts/auth";

export default () => {
  const { register } = useContext(AuthContext);
  const [passwordVisibility, setVibility] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setPassword("");

    const data = {
      name: name,
      email: email,
      password: password,
    };

    const success = await register(data);

    if (!success)
      return toast({
        title: "Failed to register.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    toast({
      title: "Successfully registered.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    return navigate("/messages");
  };

  return (
    <Center align="center" justify="center" bg="blue.600" h="100vh">
      <form onSubmit={onSubmit}>
        <VStack borderRadius="12px" bg="white" padding="5em" spacing="24px">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kate Libby"
            />
          </FormControl>
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
            value="Register"
            color="white"
            bg="blue.600"
            transition=".25s ease"
            _hover={{ cursor: "pointer", bg: "blue.500" }}
          />

          <Link
            href="/login"
            color="gray.600"
            transition=".25s ease"
            _hover={{ color: "gray.700" }}
          >
            Already have an account? Click here
          </Link>
        </VStack>
      </form>
    </Center>
  );
};
