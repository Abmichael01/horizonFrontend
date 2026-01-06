import { getAssignedCourses } from "@/api/apiEndpoints";
import { LmsOverview as AssignedCoursesType } from "@/types";
import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { LmsStats, AnalyticsCharts, AcademicPeriod, CourseManagementTable } from "@/components/Portal/Lecturer/LMS";
import DataLoading from "@/components/Generals/DataLoading";

export default function LMS() {
    const { data, isLoading } = useQuery({
        queryKey: ["assigned-courses"],
        queryFn: getAssignedCourses
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Learning Management System
                </Text>
                <DataLoading text="Loading LMS data..." />
            </Stack>
        );
    }

    const assignedData = data as AssignedCoursesType;

    return (
        <Stack spaceY="10px">
            <Text fontWeight={500} fontSize={20}>
                Learning Management System
            </Text>
            
            <LmsStats data={assignedData} />
            <AnalyticsCharts />
            <AcademicPeriod data={assignedData} />
            <CourseManagementTable courses={assignedData?.courses || []} />
        </Stack>
    );
}