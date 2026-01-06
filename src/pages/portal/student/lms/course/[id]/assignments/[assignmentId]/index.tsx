import { Stack, Text, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStudentAssignmentDetails } from "@/api/apiEndpoints";
import { StudentAssignmentDetails } from "@/types";
import { AssignmentDetails, AssignmentSubmission } from "@/components/Portal/Student/LMS/Course/Assignment";
import DataLoading from "@/components/Generals/DataLoading";

export default function StudentAssignmentDetailsPage() {
    const { id, assignmentId } = useParams<{ id: string; assignmentId: string }>();
    const courseId = parseInt(id || "0");
    const assignmentIdNum = parseInt(assignmentId || "0");

    const { data, isLoading } = useQuery({
        queryKey: ["student-assignment-details", assignmentIdNum],
        queryFn: () => getStudentAssignmentDetails(assignmentIdNum),
        enabled: !!assignmentIdNum
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Assignment Details
                </Text>
                <DataLoading text="Loading assignment details..." />
            </Stack>
        );
    }

    const assignmentData = data as StudentAssignmentDetails;

    return (
        <Stack gap="20px">
            <Text fontWeight={500} fontSize={20}>
                {assignmentData?.assignment?.title || "Assignment Details"}
            </Text>
            
            {/* Assignment Details Section */}
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
                <AssignmentDetails assignment={assignmentData?.assignment} />
            </Box>

            {/* Submission Section */}
            <Box
                bg="white"
                border="1px solid"
                borderColor="border"
                rounded="xl"
                p="20px"
            >
                <Text fontSize="lg" fontWeight={600} mb={4}>
                    Submit Assignment
                </Text>
                <AssignmentSubmission 
                    assignment={assignmentData?.assignment} 
                    submission={assignmentData?.submission}
                    courseId={courseId}
                    assignmentId={assignmentIdNum}
                />
            </Box>
        </Stack>
    );
}
