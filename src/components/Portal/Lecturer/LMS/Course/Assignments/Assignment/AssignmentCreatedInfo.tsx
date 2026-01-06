import { Text, Box } from "@chakra-ui/react";
import { Assignment } from "@/types";

interface AssignmentCreatedInfoProps {
  assignment: Assignment;
}

export default function AssignmentCreatedInfo({ assignment }: AssignmentCreatedInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      border="1px solid"
      borderColor="border"
      rounded="lg"
      p="12px"
    >
      <Text fontSize="sm" color="gray.600" mb={1}>
        Created
      </Text>
      <Text fontSize="sm" color="gray.700">
        {formatDate(assignment.created_at)} by{" "}
        {assignment.created_by.full_name}
      </Text>
    </Box>
  );
}
