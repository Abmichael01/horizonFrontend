import { Stack, Text, Flex, Button, Breadcrumb } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbArrowLeft } from "react-icons/tb";
import { Course } from "@/types";

interface CourseHeaderProps {
    course: Course;
    currentSemester: string;
}

export default function CourseHeader({ course, currentSemester }: CourseHeaderProps) {
    const navigate = useNavigate();

    return (
        <Stack spaceY="20px">
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
                        <Breadcrumb.CurrentLink>
                            {course.code}
                        </Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>

            {/* Header */}
            <Flex justify="space-between" align="center">
                <Stack>
                    <Text fontWeight={500} fontSize={24}>
                        {course.code} - {course.title}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                        {course.department} • {course.units} Units • {currentSemester}
                    </Text>
                </Stack>
                <Button
                    variant="outline"
                    onClick={() => navigate("/portal/lecturer/lms")}
                >
                    <TbArrowLeft />
                    Back to LMS
                </Button>
            </Flex>
        </Stack>
    );
}
