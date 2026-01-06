import { Flex, Text, Button, Breadcrumb } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbArrowLeft } from "react-icons/tb";
import { Assignment } from "@/types";

interface EditAssignmentHeaderProps {
    courseId: number;
    assignmentId: number;
    assignment: Assignment;
}

export default function EditAssignmentHeader({ courseId, assignmentId, assignment }: EditAssignmentHeaderProps) {
    const navigate = useNavigate();

    return (
        <>
            {/* Breadcrumb Navigation */}
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link 
                            onClick={() => navigate("/portal/lecturer/lms")}
                            cursor="pointer"
                        >
                            LMS
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.Link 
                            onClick={() => navigate(`/portal/lecturer/lms/course/${courseId}`)}
                            cursor="pointer"
                        >
                            Course
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.Link 
                            onClick={() => navigate(`/portal/lecturer/lms/course/${courseId}/assignments`)}
                            cursor="pointer"
                        >
                            Assignments
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.Link 
                            onClick={() => navigate(`/portal/lecturer/lms/course/${courseId}/assignments/${assignmentId}`)}
                            cursor="pointer"
                        >
                            {assignment.title}
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.CurrentLink>
                            Edit
                        </Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>

            {/* Header */}
            <Flex justify="space-between" align="center">
                <Text fontWeight={500} fontSize={24}>
                    Edit Assignment
                </Text>
                <Button
                    variant="outline"
                    onClick={() => navigate(`/portal/lecturer/lms/course/${courseId}/assignments/${assignmentId}`)}
                >
                    <TbArrowLeft />
                    Back to Assignment
                </Button>
            </Flex>
        </>
    );
}
