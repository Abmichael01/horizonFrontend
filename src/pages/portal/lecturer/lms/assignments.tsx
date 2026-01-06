import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllAssignments } from "@/api/apiEndpoints";
import { AllAssignmentsOverview } from "@/types";
import { AssignmentsStats, AllAssignmentsTable } from "@/components/Portal/Lecturer/LMS";
import DataLoading from "@/components/Generals/DataLoading";

export default function Assignments() {
    const { data, isLoading } = useQuery({
        queryKey: ["all-assignments"],
        queryFn: getAllAssignments
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Assignments Management
                </Text>
                <DataLoading text="Loading assignments..." />
            </Stack>
        );
    }

    const assignmentsData = data as AllAssignmentsOverview;

    return (
        <Stack gap="10px">
            <Text fontWeight={500} fontSize={20}>
                Assignments Management
            </Text>
            
            <AssignmentsStats data={assignmentsData} />
            <AllAssignmentsTable assignments={assignmentsData?.assignments || []} />
        </Stack>
    );
}
