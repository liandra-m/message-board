import { Box, IconButton } from "@chakra-ui/react";

export default ({ icon, altIcon, hoverColor, isActive, onClick }) => {
  return (
    <Box
      borderRadius="50%"
      transition=".25s ease"
      _hover={{
        cursor: "pointer",
        bg: "gray.200",
      }}
    >
      <IconButton
        icon={altIcon ? (isActive ? altIcon : icon) : icon}
        color={isActive ? hoverColor : "gray.500"}
        background="transparent"
        _hover={{ background: "transparent", color: hoverColor || "blue.500" }}
        _active={{ background: "transparent" }}
        onClick={() => onClick()}
      />
    </Box>
  );
};
