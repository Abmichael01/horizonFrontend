import { Text, Box } from "@chakra-ui/react";
import { Assignment } from "@/types";

interface AssignmentDescriptionProps {
  assignment: Assignment;
}

export default function AssignmentDescription({ assignment }: AssignmentDescriptionProps) {
  return (
    <Box mb={6}>
      <Box
        border="1px solid"
        borderColor="border"
        rounded="lg"
        p="12px"
      >
        <Text fontSize="sm" color="gray.600" mb={2}>
          Description
        </Text>
        <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
          {assignment.description}
        </Text>
      </Box>
    </Box>
  );
}
