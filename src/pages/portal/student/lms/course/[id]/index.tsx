import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentCourseDetails } from "@/api/apiEndpoints";
import { StudentCourseDetails } from "@/types";
import { CourseDetails, CourseAssignments, CourseGrades } from "@/components/Portal/Student/LMS/Course";
import DataLoading from "@/components/Generals/DataLoading";

export default function StudentCourseDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || "0");
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["student-course-details", courseId],
        queryFn: () => getStudentCourseDetails(courseId),
        enabled: !!courseId
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Course Details
                </Text>
                <DataLoading text="Loading course details..." />
            </Stack>
        );
    }

    const courseData = data as StudentCourseDetails;

    return (
        <Stack gap="10px">
            <Text fontWeight={500} fontSize={20}>
                {courseData?.course?.title || "Course Details"}
            </Text>
            
            <CourseDetails 
                course={courseData?.course} 
                totalAssignments={courseData?.total_assignments || 0}
                pendingAssignments={courseData?.pending_assignments || 0}
                totalPoints={courseData?.total_points || 0}
            />
            <CourseAssignments 
                assignments={courseData?.assignments || []} 
                onViewAssignment={(assignmentId) => navigate(`/portal/student/lms/course/${courseId}/assignments/${assignmentId}`)}
                onSubmitAssignment={(assignmentId) => navigate(`/portal/student/lms/course/${courseId}/assignments/${assignmentId}`)}
            />
            <CourseGrades grades={courseData?.grades || []} />
        </Stack>
    );
}
