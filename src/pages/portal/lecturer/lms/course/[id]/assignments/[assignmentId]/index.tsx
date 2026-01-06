import { getAssignment } from "@/api/apiEndpoints";
import { Stack, Text, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  AssignmentHeader,
  AssignmentInfoCards,
  AssignmentDescription,
  AssignmentSubmissionsTable,
} from "@/components/Portal/Lecturer/LMS/Course/Assignments/Assignment";
import DataLoading from "@/components/Generals/DataLoading";

export default function AssignmentDetail() {
  const { id, assignmentId } = useParams<{
    id: string;
    assignmentId: string;
  }>();
  const courseId = parseInt(id || "0");
  const assignmentIdNum = parseInt(assignmentId || "0");

  const { data, isLoading, error } = useQuery({
    queryKey: ["assignment", courseId, assignmentIdNum],
    queryFn: () => getAssignment(courseId, assignmentIdNum),
    enabled: !!courseId && !!assignmentIdNum,
  });

  if (isLoading) {
    return (
      <Stack gap="20px">
        <Text fontWeight={700} fontSize={20}>
          Assignment Details
        </Text>
        <DataLoading text="Loading assignment..." />
      </Stack>
    );
  }

  if (error || !data) {
    return (
      <Stack gap="20px">
        <Text fontWeight={700} fontSize={20}>
          Assignment Details
        </Text>
        <Text color="red.500">Error loading assignment</Text>
      </Stack>
    );
  }

  const assignment = data?.assignment;

  if (!assignment) {
    return (
      <Stack spaceY="20px">
        <Text fontWeight={700} fontSize={20}>
          Assignment Details
        </Text>
        <Text color="red.500">Assignment not found</Text>
      </Stack>
    );
  }


  return (
    <Stack gap="20px">
      <AssignmentHeader 
        assignment={assignment} 
        courseId={courseId} 
        assignmentId={assignmentId || ""} 
      />

      {/* Assignment Details */}
      <Box
        bg="white"
        border="1px solid"
        borderColor="border"
        rounded="xl"
        p="20px"
      >
        <Text fontSize="lg" fontWeight={600} mb={4}>
          Assignment Information
        </Text>

        <AssignmentInfoCards assignment={assignment} />
        
        {/* Description - Full Width */}
        <AssignmentDescription assignment={assignment} />
      </Box>

      <AssignmentSubmissionsTable assignment={assignment} />
    </Stack>
  );
}
