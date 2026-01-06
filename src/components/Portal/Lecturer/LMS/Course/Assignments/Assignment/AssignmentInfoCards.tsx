import { Grid, Text, Box, Flex, Badge } from "@chakra-ui/react";
import { TbFileText, TbUsers, TbCalendar } from "react-icons/tb";
import { Assignment } from "@/types";

interface AssignmentInfoCardsProps {
  assignment: Assignment;
}

export default function AssignmentInfoCards({ assignment }: AssignmentInfoCardsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "blue";
      case "file":
        return "green";
      case "url":
        return "orange";
      case "mixed":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <>
      {/* Assignment Info Cards */}
      <Grid 
        templateColumns={{ 
          base: "1fr", 
          md: "repeat(2, 1fr)", 
          lg: "repeat(3, 1fr)" 
        }} 
        gap={4} 
        mb={6}
      >
        <Box
          border="1px solid"
          borderColor="border"
          rounded="lg"
          p="12px"
        >
          <Text fontSize="sm" color="gray.600" mb={1}>
            Assignment Type
          </Text>
          <Badge
            colorScheme={getAssignmentTypeColor(assignment.assignment_type)}
            variant="subtle"
            fontSize="sm"
          >
            <TbFileText />
            {assignment.assignment_type}
          </Badge>
        </Box>
        <Box
          border="1px solid"
          borderColor="border"
          rounded="lg"
          p="12px"
        >
          <Text fontSize="sm" color="gray.600" mb={1}>
            Maximum Points
          </Text>
          <Text fontWeight={400} fontSize="lg">
            {assignment.max_points}
          </Text>
        </Box>
        <Box
          border="1px solid"
          borderColor="border"
          rounded="lg"
          p="12px"
        >
          <Text fontSize="sm" color="gray.600" mb={1}>
            Status
          </Text>
          <Badge
            colorScheme={assignment.is_published ? "green" : "orange"}
            variant="subtle"
            fontSize="sm"
          >
            {assignment.is_published ? "Published" : "Draft"}
          </Badge>
        </Box>
        <Box
          border="1px solid"
          borderColor="border"
          rounded="lg"
          p="12px"
        >
          <Text fontSize="sm" color="gray.600" mb={1}>
            Submissions
          </Text>
          <Flex align="center" gap={1}>
            <TbUsers fontSize="16px" color="gray.500" />
            <Text fontWeight={400} fontSize="lg">
              {assignment.submissions_count}
            </Text>
          </Flex>
        </Box>
        <Box
          border="1px solid"
          borderColor="border"
          rounded="lg"
          p="12px"
        >
          <Text fontSize="sm" color="gray.600" mb={1}>
            Due Date
          </Text>
          <Flex align="center" gap={2}>
            <TbCalendar fontSize="16px" color="gray.500" />
            <Text fontWeight={400} fontSize="md">
              {formatDate(assignment.due_date)}
            </Text>
          </Flex>
        </Box>
        <Box
          border="1px solid"
          borderColor="border"
          rounded="lg"
          p="12px"
        >
          <Text fontSize="sm" color="gray.600" mb={1}>
            Created
          </Text>
          <Text fontWeight={400} fontSize="md" color="gray.700">
            {formatDate(assignment.created_at)}
          </Text>
        </Box>
      </Grid>
    </>
  );
}
