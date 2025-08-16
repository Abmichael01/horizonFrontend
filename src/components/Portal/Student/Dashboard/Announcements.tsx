import BulletTitle from "@/components/Generals/BulletTitle";
import { Box, Stack } from "@chakra-ui/react";

export default function Announcements() {
  return (
    <Stack
      spaceY="10px"
      bg="primary.50"
      rounded="xl"
      p="20px"
      border="1px solid"
      borderColor={"border"}
    >
      <BulletTitle>Announcement</BulletTitle>
      <Box></Box>
    </Stack>
  );
}
