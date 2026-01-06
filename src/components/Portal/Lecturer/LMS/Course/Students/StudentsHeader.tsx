import { Flex, Stack, Text, Button, Breadcrumb } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbArrowLeft } from "react-icons/tb";
import { Course } from "@/types";

interface StudentsHeaderProps {
    course: Course;
    courseId: number;
    totalStudents: number;
    currentSemester: string;
}

export default function StudentsHeader({ course, courseId, totalStudents, currentSemester }: StudentsHeaderProps) {
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
                            Students
                        </Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>

            {/* Header */}
            <Flex justify="space-between" align="center">
                <Stack>
                    <Text fontWeight={500} fontSize={24}>
                        {course.code} - Students
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                        {totalStudents} students enrolled • {course.title} • {currentSemester}
                    </Text>
                </Stack>
                <Button
                    variant="outline"
                    onClick={() => navigate(`/portal/lecturer/lms/course/${courseId}`)}
                >
                    <TbArrowLeft />
                    Back to Course
                </Button>
            </Flex>
        </>
    );
}


