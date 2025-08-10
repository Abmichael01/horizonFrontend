import { Box, Flex, Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Flex gap={1} alignItems={"center"}>
      <Box
        p={2}
        border={"2px solid"}
        borderColor={"secondary.dark"}
        rounded={10}
      >
        <Text fontSize={[40, 50]} lineHeight={1} color={"primary.dark"}>
          HA
        </Text>
      </Box>
      <Box>
        <Text lineHeight={1} fontWeight={700} textAlign={"start"} >
          Horizon <br /> Academy
        </Text>
        <Text color="gray.400" fontSize={13} fontWeight={500}>Building Great Minds for Purpose</Text>
      </Box>
    </Flex>
  );
}
