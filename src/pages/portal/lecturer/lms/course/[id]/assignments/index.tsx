import { getCourseAssignments } from "@/api/apiEndpoints";
import { CourseAssignments as CourseAssignmentsType } from "@/types";
import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { AssignmentsHeader, AssignmentsTable } from "@/components/Portal/Lecturer/LMS/Course/Assignments";
import DataLoading from "@/components/Generals/DataLoading";

export default function CourseAssignments() {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || "0");

    const { data, isLoading, error } = useQuery({
        queryKey: ["course-assignments", courseId],
        queryFn: () => getCourseAssignments(courseId),
        enabled: !!courseId
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={700} fontSize={20}>
                    Course Assignments
                </Text>
                <DataLoading text="Loading assignments..." />
            </Stack>
        );
    }

    if (error || !data) {
        return (
            <Stack gap="20px">
                <Text fontWeight={700} fontSize={20}>
                    Course Assignments
                </Text>
                <Text color="red.500">Error loading assignments</Text>
            </Stack>
        );
    }

    const assignmentsData = data as CourseAssignmentsType;
    const { course, assignments, total_assignments } = assignmentsData;

    return (
        <Stack gap="20px">
            <AssignmentsHeader 
                course={course} 
                courseId={courseId} 
                totalAssignments={total_assignments} 
            />

            <AssignmentsTable 
                assignments={assignments} 
                courseId={courseId} 
            />
        </Stack>
    );
}
