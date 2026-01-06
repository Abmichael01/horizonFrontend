import { getCourseStudents } from "@/api/apiEndpoints";
import { CourseStudents as CourseStudentsType } from "@/types";
import { Stack, Text, Box, Table, Badge, Spinner, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import StudentsHeader from "@/components/Portal/Lecturer/LMS/Course/Students/StudentsHeader";
import DataLoading from "@/components/Generals/DataLoading";
import NoDataFound from "@/components/Generals/NoDataFound";

export default function CourseStudentsPage() {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || "0");

    const { data, isLoading, error } = useQuery({
        queryKey: ["course-students", courseId],
        queryFn: () => getCourseStudents(courseId),
        enabled: !!courseId
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Students
                </Text>
                <DataLoading text="Loading students..." />
            </Stack>
        );
    }

    if (error || !data) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Students
                </Text>
                <Text color="red.500">Error loading students</Text>
            </Stack>
        );
    }

    const studentsData = data as CourseStudentsType;
    const { course, students, total_students, current_semester } = studentsData;

    const getGradeColor = (grade: string | null) => {
        if (!grade) return "gray";
        const gradeUpper = grade.toUpperCase();
        if (gradeUpper === 'A') return "green";
        if (gradeUpper === 'B') return "blue";
        if (gradeUpper === 'C') return "yellow";
        if (gradeUpper === 'D') return "orange";
        return "red";
    };

    return (
        <Stack gap="20px">
            <StudentsHeader 
                course={course} 
                courseId={courseId}
                totalStudents={total_students}
                currentSemester={current_semester} 
            />

            <Box
                bg="white"
                border="1px solid"
                borderColor="border"
                rounded="xl"
                p="20px"
            >
                <Text fontSize="lg" fontWeight={400} mb={4}>
                    Enrolled Students ({total_students})
                </Text>

                {students && students.length > 0 ? (
                    <Box
                        overflowX="auto"
                        w="100%"
                        css={{
                            '&::-webkit-scrollbar': {
                                height: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#c1c1c1',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: '#a8a8a8',
                                },
                            },
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#c1c1c1 #f1f1f1',
                        }}
                    >
                        <Box border="1px solid" borderColor="border" rounded="lg" overflow="hidden">
                            <Table.Root size="sm" variant="outline" minW="900px" rounded="lg">
                            <Table.Header bg="gray.50">
                                <Table.Row>
                                    <Table.ColumnHeader>S/N</Table.ColumnHeader>
                                    <Table.ColumnHeader>Matric Number</Table.ColumnHeader>
                                    <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                                    <Table.ColumnHeader>Level</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">CGPA</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Grade</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Grade Point</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {students.map((student, index) => (
                                    <Table.Row key={student.id}>
                                        <Table.Cell>
                                            <Text fontSize="sm" color="gray.600">
                                                {index + 1}
                                            </Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Text fontWeight={400} fontSize="sm">
                                                {student.matric_number}
                                            </Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Text fontSize="sm" color="gray.700">
                                                {student.full_name}
                                            </Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Text fontSize="sm" color="gray.600">
                                                {student.department || "N/A"}
                                            </Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Text fontSize="sm" color="gray.600">
                                                {student.level ? `Level ${student.level}` : "N/A"}
                                            </Text>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            {student.cgpa ? (
                                                <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                                                    {student.cgpa.toFixed(2)}
                                                </Badge>
                                            ) : (
                                                <Text fontSize="sm" color="gray.400">N/A</Text>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            {student.grade ? (
                                                <Badge 
                                                    colorScheme={getGradeColor(student.grade)} 
                                                    variant="subtle" 
                                                    fontSize="xs"
                                                >
                                                    {student.grade}
                                                </Badge>
                                            ) : (
                                                <Text fontSize="sm" color="gray.400">-</Text>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            {student.grade_point ? (
                                                <Text fontSize="sm" color="gray.700">
                                                    {student.grade_point.toFixed(2)}
                                                </Text>
                                            ) : (
                                                <Text fontSize="sm" color="gray.400">-</Text>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                        </Box>
                    </Box>
                ) : (
                    <NoDataFound text="No students enrolled in this course for the current semester." />
                )}
            </Box>
        </Stack>
    );
}

