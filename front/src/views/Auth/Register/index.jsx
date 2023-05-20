import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Link,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { userSchema } from "../validationRules";
import { useSignup } from "hooks/auth";

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userSchema),
  });

  const toast = useToast();
  const navigate = useNavigate();

  const [passwordVisibility, setVibility] = useState(false);

  const signup = useSignup();

  const onSubmit = async (data) => {
    await signup(data, {
      onSuccess: () => {
        toast({
          title: "Successfully registered.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        return navigate("/messages");
      },
      onError: () =>
        toast({
          title: "Failed to register.",
          status: "error",
          duration: 5000,
          isClosable: true,
        }),
    });
  };

  return (
    <Center align="center" justify="center" bg="blue.600" h="100vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack borderRadius="12px" bg="white" padding="5em" spacing="24px">
          <FormControl isInvalid={errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input
              {...register("name")}
              placeholder="Kate Libby"
              maxLength={255}
            />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.email}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email")}
              placeholder="acidburn@ghack.com"
              maxLength={255}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.password}>
            <FormLabel>Password</FormLabel>
            <Flex>
              <Input
                {...register("password")}
                type={passwordVisibility ? "text" : "password"}
                borderRightRadius={0}
                placeholder="*********"
                maxLength={255}
              />
              <IconButton
                onClick={() => setVibility(!passwordVisibility)}
                icon={passwordVisibility ? <FaEyeSlash /> : <FaEye />}
                borderLeftRadius={0}
              />
            </Flex>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
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
