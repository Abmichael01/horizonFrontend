import { createAssignment } from "@/api/apiEndpoints";
import { Stack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { NewAssignmentHeader, AssignmentForm } from "@/components/Portal/Lecturer/LMS/Course/Assignments";
import { toaster } from "@/components/ui/toaster";
import errorMessage from "@/lib/errorMessage";

type AssignmentFormData = {
    title: string;
    description: string;
    assignment_type: 'text' | 'file' | 'url' | 'mixed';
    max_points: number;
    due_date: string;
    is_published: boolean;
};

export default function NewAssignment() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const courseId = parseInt(id || "0");

    const createAssignmentMutation = useMutation({
        mutationFn: (data: AssignmentFormData) => createAssignment(courseId, data),
        onSuccess: () => {
            toaster.create({
                description: "Assignment created successfully!",
                type: "success"
            });
            queryClient.invalidateQueries({ queryKey: ["course-assignments", courseId] });
            navigate(`/portal/lecturer/lms/course/${courseId}/assignments`);
        },
        onError: (error: Error) => {
            console.error('Error creating assignment:', error);

            
            toaster.create({
                description: errorMessage(error),
                type: "error"
            });
        }
    });

    const onSubmit = (data: AssignmentFormData) => {
        createAssignmentMutation.mutate(data);
    };

    return (
        <Stack spaceY="20px">
            <NewAssignmentHeader courseId={courseId} />
            <AssignmentForm 
                onSubmit={onSubmit}
                isLoading={createAssignmentMutation.isPending}
            />
        </Stack>
    );
}