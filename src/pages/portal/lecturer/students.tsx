import { Box, Text, Stack } from "@chakra-ui/react";

export default function LecturerStudents() {
  return (
    <Stack spaceY="20px">
      <Text fontWeight={500} fontSize={20}>
        Students
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
          Student management interface coming soon...
        </Text>
        <Text fontSize="sm" color="gray.400" mt="10px">
          This page will show all students enrolled in the lecturer's courses with their academic progress.
        </Text>
      </Box>
    </Stack>
  );
}


