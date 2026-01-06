import { Box, Flex, Badge, Table, Button, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbEye, TbEdit, TbFileText } from "react-icons/tb";
import { Assignment } from "@/types";

interface AssignmentsTableProps {
    assignments: Assignment[];
    courseId: number;
}

export default function AssignmentsTable({ assignments, courseId }: AssignmentsTableProps) {
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getAssignmentTypeIcon = (type: string) => {
        switch (type) {
            case 'text': return <TbFileText />;
            case 'file': return <TbFileText />;
            case 'url': return <TbFileText />;
            case 'mixed': return <TbFileText />;
            default: return <TbFileText />;
        }
    };

    const getAssignmentTypeColor = (type: string) => {
        switch (type) {
            case 'text': return 'blue';
            case 'file': return 'green';
            case 'url': return 'orange';
            case 'mixed': return 'purple';
            default: return 'gray';
        }
    };

    if (assignments.length === 0) {
        return (
            <Box textAlign="center" py={12} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <TbFileText fontSize="48px" color="gray.400" />
                <Text color="gray.500" mt={4} fontSize="lg">
                    No assignments yet
                </Text>
                <Text color="gray.400" fontSize="sm" mt={2}>
                    Create your first assignment to get started
                </Text>
                <Button
                    bg="primary.500"
                    mt={4}
                    onClick={() => navigate(`/portal/lecturer/lms/course/${courseId}/assignments/new`)}
                >
                    <TbFileText />
                    Create Assignment
                </Button>
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
                <Table.Root size="sm" variant="outline" minW="800px" rounded="lg">
                <Table.Header bg="gray.50">
                    <Table.Row>
                        <Table.ColumnHeader minW="250px">Assignment</Table.ColumnHeader>
                        <Table.ColumnHeader minW="120px">Type</Table.ColumnHeader>
                        <Table.ColumnHeader minW="140px">Due Date</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center" minW="80px">Points</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center" minW="100px">Submissions</Table.ColumnHeader>
                        <Table.ColumnHeader minW="100px">Status</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center" minW="150px">Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
            <Table.Body>
                {assignments.map((assignment: Assignment) => (
                    <Table.Row key={assignment.id}>
                        <Table.Cell>
                            <Stack gap={1}>
                                <Text fontWeight={400} fontSize="sm" lineClamp={1}  >
                                    {assignment.title}
                                </Text>
                                <Text fontSize="xs" color="gray.600" lineClamp={1}  >
                                    {assignment.description}
                                </Text>
                            </Stack>
                        </Table.Cell>
                        <Table.Cell>
                            <Badge 
                                colorScheme={getAssignmentTypeColor(assignment.assignment_type)} 
                                variant="subtle" 
                                fontSize="xs"
                            >
                                {getAssignmentTypeIcon(assignment.assignment_type)}
                                {assignment.assignment_type}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell>
                            <Flex align="center" gap={1}>
                                <Text fontSize="sm" color="gray.700">
                                    {formatDate(assignment.due_date)}
                                </Text>
                            </Flex>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <Text fontWeight={400} fontSize="sm">
                                {assignment.max_points}
                            </Text>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <Flex align="center" justify="center" gap={1}>
                                <Text fontSize="sm">
                                    {assignment.submissions_count}
                                </Text>
                            </Flex>
                        </Table.Cell>
                        <Table.Cell>
                            <Badge 
                                colorScheme={assignment.is_published ? "green" : "orange"} 
                                variant="subtle" 
                                fontSize="xs"
                            >
                                {assignment.is_published ? "Published" : "Draft"}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <Flex gap={2} justify="center">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        navigate(`/portal/lecturer/lms/course/${courseId}/assignments/${assignment.id}`);
                                    }}
                                >
                                    <TbEye />
                                    View
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        navigate(`/portal/lecturer/lms/course/${courseId}/assignments/${assignment.id}/edit`);
                                    }}
                                >
                                    <TbEdit />
                                    Edit
                                </Button>
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            </Table.Root>
            </Box>
        </Box>
    );
}
