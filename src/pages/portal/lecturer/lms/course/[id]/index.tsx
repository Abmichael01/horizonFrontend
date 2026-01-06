import { getCourseManagement } from "@/api/apiEndpoints";
import { CourseManagement as CourseManagementType } from "@/types";
import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { CourseHeader, CourseStats, CourseInfo, ManagementNavigation } from "@/components/Portal/Lecturer/LMS/Course";
import DataLoading from "@/components/Generals/DataLoading";

export default function CourseManagement() {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || "0");

    const { data, isLoading, error } = useQuery({
        queryKey: ["course-management", courseId],
        queryFn: () => getCourseManagement(courseId),
        enabled: !!courseId
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={700} fontSize={20}>
                    Course Management
                </Text>
                <DataLoading text="Loading course data..." />
            </Stack>
        );
    }

    if (error || !data) {
        return (
            <Stack gap="20px">
                <Text fontWeight={700} fontSize={20}>
                    Course Management
                </Text>
                <Text color="red.500">Error loading course data</Text>
            </Stack>
        );
    }

    const courseData = data as CourseManagementType;
    const { course, course_stats, current_semester } = courseData;

    return (
        <Stack spaceY="20px">
            <CourseHeader 
                course={course} 
                currentSemester={current_semester} 
            />
            
            <CourseStats courseStats={course_stats} />
            
            <CourseInfo 
                course={course} 
                currentSemester={current_semester} 
            />
            
            <ManagementNavigation courseId={courseId} />
        </Stack>
    );
}
