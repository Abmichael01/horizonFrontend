// import Button from "@/components/Generals/Button";
import XPadding from "@/components/Generals/XPadding";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box pos="relative" minH="400px" py={"80px"} w={"full"}>
      <Image
        src="/hero.jpg"
        pos={"absolute"}
        top={"0px"}
        w="full"
        h="full"
        loading="lazy"
      />
      <Box
        bgImage="linear-gradient(to right, {colors.primary.dark}, transparent 120%)"
        pos="absolute"
        top="0px"
        w={"full"}
        h="full"
        zIndex={2}
        // opacity={0.5}
      ></Box>
      <XPadding pos={"relative"} zIndex={3} h="full">
        <Flex
          direction={"column"}
          gap={5}
          h="full"
          justify={"center"}
          maxW="500px"
        >
          <Text
            color={"white"}
            fontSize={[50, 65, 80]}
            fontFamily={"hero"}
            lineHeight={1}
            fontWeight={500}
          >
            Empowering Future Leaders, Today
          </Text>
          <Text color={"white"} opacity={0.8} maxW="80%">
            Join a community dedicated to excellence, innovation, and global
            impact. Unlock your potential with world-class education and
            opportunities for growth.
          </Text>
          <Flex gap={5} align={"center"}>
            <Button rounded={"none"} w="fit">
              Study at Horizon
            </Button>
            <Button rounded={"none"} w="fit" bg="secondary.dark">
              Open Distance Learning
            </Button>
          </Flex>
        </Flex>
      </XPadding>
    </Box>
  );
}
