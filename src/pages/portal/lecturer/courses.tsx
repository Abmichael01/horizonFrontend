import { Box, Text, Stack } from "@chakra-ui/react";

export default function LecturerCourses() {
  return (
    <Stack spaceY="20px">
      <Text fontWeight={700} fontSize={20}>
        My Courses
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
          Course management interface coming soon...
        </Text>
        <Text fontSize="sm" color="gray.400" mt="10px">
          This page will show all courses assigned to the lecturer with student enrollment details.
        </Text>
      </Box>
    </Stack>
  );
}


