import { Box, Flex, Badge, Table, Button, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbEye, TbFileText } from "react-icons/tb";
import { Course } from "@/types";
import NoDataFound from "@/components/Generals/NoDataFound";

interface EnrolledCoursesTableProps {
    courses: Course[];
}

export default function EnrolledCoursesTable({ courses }: EnrolledCoursesTableProps) {
    const navigate = useNavigate();

    if (courses.length === 0) {
        return (
            <Box textAlign="center" py={12}>
                <TbFileText fontSize="48px" color="gray.400" />
                <Text color="gray.500" mt={4} fontSize="lg">
                    No enrolled courses
                </Text>
                <Text color="gray.400" fontSize="sm" mt={2}>
                    Register for courses to get started
                </Text>
            </Box>
        );
    }

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="border"
            rounded="xl"
            p="20px"
            w="100%"
            maxW="100%"
        >
            <Text fontSize="lg" fontWeight={400} mb={4}>
                My Enrolled Courses
            </Text>
            
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
                    // For Firefox
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#c1c1c1 #f1f1f1',
                }}
            >
                <Box border="1px solid" borderColor="border" rounded="lg" overflow="hidden">
                    <Table.Root size="sm" variant="outline" minW="700px" bg="white" rounded="lg">
                    <Table.Header bg="gray.50">
                        <Table.Row>
                            <Table.ColumnHeader>Course Code</Table.ColumnHeader>
                            <Table.ColumnHeader>Course Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Department</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Units</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {courses.map((course: Course) => (
                            <Table.Row key={course.id}>
                                <Table.Cell>
                                    <Text fontWeight={400} fontSize="sm">
                                        {course.code}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell>
                                    <Text fontSize="sm" color="gray.700">
                                        {course.title}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell>
                                    <Text fontSize="sm" color="gray.600">
                                        {course.department}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                                        {course.units}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            navigate(`/portal/student/lms/course/${course.id}`);
                                        }}
                                    >
                                        <TbEye />
                                        View Course
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                </Box>
            </Box>
        </Box>
    );
}
