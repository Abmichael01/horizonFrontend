import BulletTitle from "@/components/Generals/BulletTitle";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { History } from "lucide-react";

export default function RecentActivities() {
  return (
    <Stack
      spaceY="10px"
      bg="white"
      p="20px"
      rounded="xl"
      border="1px solid"
      borderColor={"border"}
    >
      <BulletTitle>Recent Activities</BulletTitle>
      <Box bg="white" minH="100px" w="full" divideY="1px">
        {Array.from({ length: 4 }).map((_, index) => (
          <Flex
            justify="space-between"
            key={index}
            py="20px"
            px="10px"
            fontSize={"sm"}
            align={"center"}
          >
            <Flex gap={1} align={"center"} >
              <Box
                color={"primary.dark"}
                bg="primary.50"
                p="10px"
                rounded="full"
              >
                <History size={18} />
              </Box>
              <Text>Submitted assignment to Mr Dora</Text>
            </Flex>
            <Text>10th June, 2025</Text>
          </Flex>
        ))}
      </Box>
    </Stack>
  );
}
