import React from 'react';
import { Box, Text, VStack, Badge, Table, TableScrollArea } from "@chakra-ui/react";
import { StudentGrade } from '../../../types';

interface CourseGradesProps {
  grades: StudentGrade[];
}

const CourseGrades: React.FC<CourseGradesProps> = ({ grades }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'green';
      case 'B':
        return 'blue';
      case 'C':
        return 'yellow';
      case 'D':
        return 'orange';
      case 'F':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (grades.length === 0) {
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
          No grades for this course yet
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
        Course Grades
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
          <Table.Root size="sm" variant="outline" minW="600px" bg="white" rounded="lg">
            <Table.Header bg="gray.50">
              <Table.Row>
                <Table.ColumnHeader>Grade</Table.ColumnHeader>
                <Table.ColumnHeader>Points</Table.ColumnHeader>
                <Table.ColumnHeader>Grade Point</Table.ColumnHeader>
                <Table.ColumnHeader>Feedback</Table.ColumnHeader>
                <Table.ColumnHeader>Graded Date</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {grades.map((grade) => (
                <Table.Row key={grade.id}>
                  <Table.Cell>
                    <Badge
                      colorScheme={getGradeColor(grade.grade)}
                      variant="subtle"
                      fontSize="md"
                      px={3}
                      py={1}
                    >
                      {grade.grade}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="medium" color="gray.800">
                        {grade.earned_points}/{grade.total_points}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {((grade.earned_points / grade.total_points) * 100).toFixed(1)}%
                      </Text>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontWeight="medium" color="gray.800">
                      {grade.grade_point}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {grade.feedback}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600">
                      {new Date(grade.graded_at).toLocaleDateString()}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
      </TableScrollArea>
    </Box>
  );
};

export default CourseGrades;
