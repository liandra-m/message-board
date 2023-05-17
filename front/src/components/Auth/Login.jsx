import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

export default () => {
  return (
    <Center align="center" justify="center" bg="blue.600" h="100vh">
      <VStack borderRadius="12px" bg="white" padding="5em" spacing="24px">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="acidburn@ghack.com" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder="*********" />
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
    </Center>
  );
};
