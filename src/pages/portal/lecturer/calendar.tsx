import { Box, Text, Stack } from "@chakra-ui/react";

export default function LecturerCalendar() {
  return (
    <Stack spaceY="20px">
      <Text fontWeight={700} fontSize={20}>
        Calendar
      </Text>
      <Box
        bg="white"
        p="40px"
        rounded="xl"
        border="1px solid"
        borderColor="border"
        textAlign="center"
      >
        <Text fontSize="lg" color="gray.500">
          Calendar interface coming soon...
        </Text>
        <Text fontSize="sm" color="gray.400" mt="10px">
          This page will show the lecturer's schedule, class timings, and important academic dates.
        </Text>
      </Box>
    </Stack>
  );
}


