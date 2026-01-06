import { Box, Flex, Text, Badge, Button, Table } from "@chakra-ui/react";
import { TbUsers } from "react-icons/tb";
import { Assignment } from "@/types";

interface AssignmentSubmissionsTableProps {
  assignment: Assignment;
}

export default function AssignmentSubmissionsTable({ assignment }: AssignmentSubmissionsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="border"
      rounded="xl"
      p="20px"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight={400}>
          Student Submissions
        </Text>
        <Badge colorScheme="blue" variant="subtle">
          {assignment.submissions_count} submissions
        </Badge>
      </Flex>

      {assignment.submissions_count === 0 ? (
        <Box
          textAlign="center"
          py={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <TbUsers fontSize="48px" color="gray.400" />
          <Text color="gray.500" mt={4} fontSize="lg">
            No submissions yet
          </Text>
          <Text color="gray.400" fontSize="sm">
            Students haven't submitted their work for this assignment
          </Text>
        </Box>
      ) : (
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
              <Table.ColumnHeader>Student</Table.ColumnHeader>
              <Table.ColumnHeader>Submission Type</Table.ColumnHeader>
              <Table.ColumnHeader>Submitted At</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Grade
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* Mock submission data - replace with real data when available */}
            <Table.Row>
              <Table.Cell>
                <Text fontWeight={500}>John Doe</Text>
                <Text fontSize="xs" color="gray.600">
                  ID: 12345
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                  Text Submission
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Text fontSize="sm">
                  {formatDate(new Date().toISOString())}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Badge colorScheme="green" variant="subtle" fontSize="xs">
                  Submitted
                </Badge>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Text fontWeight={400}>-</Text>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button size="sm" variant="outline">
                  Grade
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          </Table.Root>
          </Box>
        </Box>
      )}
    </Box>
  );
}
