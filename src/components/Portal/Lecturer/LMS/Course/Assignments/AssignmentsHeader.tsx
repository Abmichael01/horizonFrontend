import { Flex, Stack, Text, Button, Breadcrumb } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbPlus } from "react-icons/tb";
interface Course {
    id: number;
    code: string;
    title: string;
    units?: number;
    department?: string;
}

interface AssignmentsHeaderProps {
    course: Course;
    courseId: number;
    totalAssignments: number;
}

export default function AssignmentsHeader({ course, courseId, totalAssignments }: AssignmentsHeaderProps) {
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
                            {course.code}
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                        <Breadcrumb.CurrentLink>
                            Assignments
                        </Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>

            {/* Header */}
            <Flex justify="space-between" align="center">
                <Stack>
                    <Text fontWeight={500} fontSize={24}>
                        {course.code} - Assignments
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                        {totalAssignments} assignments • {course.title}
                    </Text>
                </Stack>
                <Button
                    bg="primary.500"
                    onClick={() => navigate(`/portal/lecturer/lms/course/${courseId}/assignments/new`)}
                >
                    <TbPlus />
                    New Assignment
                </Button>
            </Flex>
        </>
    );
}
