import { getAssignment, updateAssignment } from "@/api/apiEndpoints";
import { CourseAssignments as CourseAssignmentsType, Assignment } from "@/types";
import { Stack, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { EditAssignmentHeader, AssignmentForm } from "@/components/Portal/Lecturer/LMS/Course/Assignments";
import { toaster } from "@/components/ui/toaster";
import errorMessage from "@/lib/errorMessage";
import DataLoading from "@/components/Generals/DataLoading";

type AssignmentFormData = {
    title: string;
    description: string;
    assignment_type: 'text' | 'file' | 'url' | 'mixed';
    max_points: number;
    due_date: string;
    is_published: boolean;
};

export default function EditAssignment() {
    const { id, assignmentId } = useParams<{ id: string; assignmentId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const courseId = parseInt(id || "0");
    const assignmentIdNum = parseInt(assignmentId || "0");

    const { data, isLoading, error } = useQuery({
        queryKey: ["assignment", courseId, assignmentIdNum],
        queryFn: () => getAssignment(courseId, assignmentIdNum),
        enabled: !!courseId && !!assignmentIdNum
    });

    const updateAssignmentMutation = useMutation({
        mutationFn: (data: AssignmentFormData) => updateAssignment(courseId, assignmentIdNum, data),
        onSuccess: () => {
            toaster.create({
                description: "Assignment updated successfully!",
                type: "success"
            });
            queryClient.invalidateQueries({ queryKey: ["course-assignments", courseId] });
            queryClient.invalidateQueries({ queryKey: ["assignment", courseId, assignmentIdNum] });
            navigate(`/portal/lecturer/lms/course/${courseId}/assignments/${assignmentId}`);
        },
        onError: (error: Error) => {
            console.error('Error updating assignment:', error);
            toaster.create({
                description: errorMessage(error),
                type: "error"
            });
        }
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={700} fontSize={20}>
                    Edit Assignment
                </Text>
                <DataLoading text="Loading assignment data..." />
            </Stack>
        );
    }

    if (error || !data) {
        return (
            <Stack gap="20px">
                <Text fontWeight={700} fontSize={20}>
                    Edit Assignment
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
                    Edit Assignment
                </Text>
                <Text color="red.500">Assignment not found</Text>
            </Stack>
        );
    }

    // Convert assignment data to form data format
    const defaultValues: AssignmentFormData = {
        title: assignment.title,
        description: assignment.description,
        assignment_type: assignment.assignment_type,
        max_points: assignment.max_points,
        due_date: new Date(assignment.due_date).toISOString().slice(0, 16), // Convert to datetime-local format
        is_published: assignment.is_published,
    };

    const onSubmit = (data: AssignmentFormData) => {
        updateAssignmentMutation.mutate(data);
    };

    return (
        <Stack gap="20px">
            <EditAssignmentHeader 
                courseId={courseId} 
                assignmentId={assignmentIdNum}
                assignment={assignment}
            />
            <AssignmentForm 
                onSubmit={onSubmit}
                isLoading={updateAssignmentMutation.isPending}
                defaultValues={defaultValues}
            />
        </Stack>
    );
}
