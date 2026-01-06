import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStudentGrades } from "@/api/apiEndpoints";
import { StudentGradesOverview } from "@/types";
import { GradesStats, GradesTable } from "@/components/Portal/Student/LMS";
import DataLoading from "@/components/Generals/DataLoading";

export default function StudentGrades() {
    const { data, isLoading } = useQuery({
        queryKey: ["student-grades"],
        queryFn: getStudentGrades
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    My Grades
                </Text>
                <DataLoading text="Loading your grades..." />
            </Stack>
        );
    }

    const gradesData = data as StudentGradesOverview;

    return (
        <Stack gap="10px">
            <Text fontWeight={500} fontSize={20}>
                My Grades
            </Text>
            
            <GradesStats 
                totalCourses={gradesData?.total_courses || 0}
                currentGpa={gradesData?.current_gpa || 0}
                totalCredits={gradesData?.total_credits || 0}
                completedCredits={gradesData?.completed_credits || 0}
                currentSemester={gradesData?.current_semester || ''}
                currentSession={gradesData?.current_session || ''}
            />
            <GradesTable grades={gradesData?.grades || []} />
        </Stack>
    );
}
