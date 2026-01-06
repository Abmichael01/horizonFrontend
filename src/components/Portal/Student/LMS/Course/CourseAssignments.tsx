import React from 'react';
import { Box, Text, VStack, Badge, Button, HStack, Table, TableScrollArea } from "@chakra-ui/react";
import { FiEye, FiUpload } from 'react-icons/fi';
import { StudentAssignment } from '../../../types';

interface CourseAssignmentsProps {
  assignments: StudentAssignment[];
  onViewAssignment: (assignmentId: number) => void;
  onSubmitAssignment: (assignmentId: number) => void;
}

const CourseAssignments: React.FC<CourseAssignmentsProps> = ({
  assignments,
  onViewAssignment,
  onSubmitAssignment
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'green';
      case 'overdue':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusText = (assignment: StudentAssignment) => {
    if (assignment.submission_status === 'submitted') {
      return 'Submitted';
    }
    if (assignment.due_date_status === 'overdue') {
      return 'Overdue';
    }
    return 'Pending';
  };

  if (assignments.length === 0) {
    return (
      <Box
        bg="white"
        border="1px solid"
        borderColor="border"
        rounded="xl"
        p="20px"
        textAlign="center"
        py={12}
      >
        <Text color="gray.500" fontSize="lg">
          No assignments for this course yet
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
        Course Assignments
      </Text>
      
      <TableScrollArea 
          border="1px solid"
          borderColor="border"
          rounded="lg"
          maxW="calc(100vw - 120px)"
          overflow="hidden"
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
          <Table.Root size="sm" variant="outline" minW="800px" bg="white" rounded="lg">
            <Table.Header bg="gray.50">
              <Table.Row>
                <Table.ColumnHeader>Assignment</Table.ColumnHeader>
                <Table.ColumnHeader>Type</Table.ColumnHeader>
                <Table.ColumnHeader>Due Date</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Points</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {assignments.map((assignment) => (
                <Table.Row key={assignment.id}>
                  <Table.Cell>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="medium" color="gray.800">
                        {assignment.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {assignment.description}
                      </Text>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorScheme="blue" variant="subtle">
                      {assignment.assignment_type}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600">
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorScheme={getStatusColor(getStatusText(assignment))}
                      variant="subtle"
                    >
                      {getStatusText(assignment)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600">
                      {assignment.max_points} pts
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<FiEye />}
                        onClick={() => onViewAssignment(assignment.id)}
                      >
                        View
                      </Button>
                      {assignment.submission_status !== 'submitted' && (
                        <Button
                          size="sm"
                          colorScheme="blue"
                          leftIcon={<FiUpload />}
                          onClick={() => onSubmitAssignment(assignment.id)}
                        >
                          Submit
                        </Button>
                      )}
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
      </TableScrollArea>
    </Box>
  );
};

export default CourseAssignments;
