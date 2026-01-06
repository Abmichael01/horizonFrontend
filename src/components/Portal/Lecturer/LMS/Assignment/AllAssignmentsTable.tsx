import { Box, Flex, Badge, Table, Button, Text, Stack, TableScrollArea } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbEye, TbEdit, TbFileText } from "react-icons/tb";
import { Assignment } from "@/types";
import NoDataFound from "@/components/Generals/NoDataFound";

interface AllAssignmentsTableProps {
  assignments: Assignment[];
}

export default function AllAssignmentsTable({
  assignments,
}: AllAssignmentsTableProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAssignmentTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <TbFileText />;
      case "file":
        return <TbFileText />;
      case "url":
        return <TbFileText />;
      case "mixed":
        return <TbFileText />;
      default:
        return <TbFileText />;
    }
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "blue";
      case "file":
        return "green";
      case "url":
        return "orange";
      case "mixed":
        return "purple";
      default:
        return "gray";
    }
  };

  if (assignments.length === 0) {
    return (
      <Flex
        textAlign="center"
        py={12}
        direction={"column"}
        alignItems={"center"}
      >
        <TbFileText fontSize="48px" color="gray.400" />
        <Text color="gray.500" mt={4} fontSize="lg">
          No assignments yet
        </Text>
        <Text color="gray.400" fontSize="sm" mt={2}>
          Create your first assignment from a course to get started
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="border"
      rounded="xl"
      p="20px"
      w="full"
    >
      <Table.ScrollArea 
        maxW="full" // Account for sidebar + padding + margins
        w="100%"
      >
        <Box border="1px solid" borderColor="border" rounded="lg" overflow="hidden">
          <Table.Root
            size="sm"
            variant="outline"
            textWrap={"nowrap"}
            rounded="lg"
          >
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader>Assignment</Table.ColumnHeader>
              <Table.ColumnHeader>Course</Table.ColumnHeader>
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader>Due Date</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Points</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Submissions
              </Table.ColumnHeader>
              <Table.ColumnHeader >Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center" >
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {assignments.map((assignment: Assignment) => (
              <Table.Row key={assignment.id}>
                <Table.Cell>
                  <Stack gap={1}>
                    <Text fontWeight={400} fontSize="sm" lineClamp={1}>
                      {assignment.title}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.600"
                      lineClamp={1}
                      maxW="200px"
                    >
                      {assignment.description}
                    </Text>
                  </Stack>
                </Table.Cell>
                <Table.Cell>
                  <Stack gap={1}>
                    <Text fontWeight={500} fontSize="sm">
                      {assignment.course.code}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {assignment.course.title}
                    </Text>
                  </Stack>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    colorScheme={getAssignmentTypeColor(
                      assignment.assignment_type
                    )}
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
                    <Text fontSize="sm">{assignment.submissions_count}</Text>
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
                        navigate(
                          `/portal/lecturer/lms/course/${assignment.course.id}/assignments/${assignment.id}`
                        );
                      }}
                    >
                      <TbEye />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigate(
                          `/portal/lecturer/lms/course/${assignment.course.id}/assignments/${assignment.id}/edit`
                        );
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
      </Table.ScrollArea>
    </Box>
  );
}
