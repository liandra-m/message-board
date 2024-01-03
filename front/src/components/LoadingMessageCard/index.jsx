import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

export default () => {
  return (
    <Flex
      w="100%"
      margin="1em 0"
      textAlign="left"
      bg="white"
      borderRadius="10px"
      direction="column"
      justify="space-between"
    >
      <Flex direction="column" padding="1em">
        <Skeleton height="40px" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight={4} />
      </Flex>

      <Flex
        marginTop="1em"
        textAlign="right"
        justify="space-between"
        align="center"
        bg="blue.500"
        w="100%"
        h="30px"
        color="white"
        padding="0.5em 1em"
        borderBottomRadius="10px"
      >
      </Flex>
    </Flex>
  );
};
