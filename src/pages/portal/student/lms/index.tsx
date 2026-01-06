import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStudentLmsOverview } from "@/api/apiEndpoints";
import { StudentLmsOverview } from "@/types";
import { LmsStats, EnrolledCoursesTable } from "@/components/Portal/Student/LMS";
import DataLoading from "@/components/Generals/DataLoading";

export default function StudentLMS() {
    const { data, isLoading } = useQuery({
        queryKey: ["student-lms-overview"],
        queryFn: getStudentLmsOverview
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Learning Management System
                </Text>
                <DataLoading text="Loading LMS overview..." />
            </Stack>
        );
    }

    const lmsData = data as StudentLmsOverview;

    return (
        <Stack gap="10px">
            <Text fontWeight={500} fontSize={20}>
                Learning Management System
            </Text>
            
            <LmsStats data={lmsData} />
            <EnrolledCoursesTable courses={lmsData?.enrolled_courses || []} />
        </Stack>
    );
}
