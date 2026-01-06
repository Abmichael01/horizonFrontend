import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStudentAssignments } from "@/api/apiEndpoints";
import { StudentAssignmentsOverview } from "@/types";
import { AssignmentsStats, AssignmentsTable } from "@/components/Portal/Student/LMS";
import DataLoading from "@/components/Generals/DataLoading";

export default function StudentAssignments() {
    const { data, isLoading } = useQuery({
        queryKey: ["student-assignments"],
        queryFn: getStudentAssignments
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    My Assignments
                </Text>
                <DataLoading text="Loading your assignments..." />
            </Stack>
        );
    }

    const assignmentsData = data as StudentAssignmentsOverview;

    return (
        <Stack gap="10px">
            <Text fontWeight={500} fontSize={20}>
                My Assignments
            </Text>
            
            <AssignmentsStats 
                totalAssignments={assignmentsData?.total_assignments || 0}
                pendingAssignments={assignmentsData?.pending_assignments || 0}
                submittedAssignments={assignmentsData?.submitted_assignments || 0}
                overdueAssignments={assignmentsData?.overdue_assignments || 0}
                currentSemester={assignmentsData?.current_semester || ''}
                currentSession={assignmentsData?.current_session || ''}
            />
            <AssignmentsTable 
                assignments={assignmentsData?.assignments || []}
                onViewAssignment={(id) => console.log('View assignment:', id)}
                onSubmitAssignment={(id) => console.log('Submit assignment:', id)}
            />
        </Stack>
    );
}
