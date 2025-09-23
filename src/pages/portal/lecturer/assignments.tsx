import { Box, Text, Stack } from "@chakra-ui/react";

export default function LecturerAssignments() {
  return (
    <Stack spaceY="20px">
      <Text fontWeight={700} fontSize={20}>
        Assignments
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
          Assignment management interface coming soon...
        </Text>
        <Text fontSize="sm" color="gray.400" mt="10px">
          This page will allow lecturers to create, manage, and grade assignments for their courses.
        </Text>
      </Box>
    </Stack>
  );
}


