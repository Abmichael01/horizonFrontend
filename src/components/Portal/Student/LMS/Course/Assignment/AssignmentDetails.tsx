import React from 'react';
import { Box, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { Assignment } from '../../../types';

interface AssignmentDetailsProps {
  assignment: Assignment;
}

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({ assignment }) => {
  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            {assignment.title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {assignment.course?.title} • {assignment.assignment_type}
          </Text>
        </Box>

        {/* Assignment Information */}
        <Box
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="border"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="medium" color="gray.700">
                Assignment Type:
              </Text>
              <Badge colorScheme="blue" variant="subtle">
                {assignment.assignment_type}
              </Badge>
            </HStack>
            
            <HStack justify="space-between">
              <Text fontWeight="medium" color="gray.700">
                Due Date:
              </Text>
              <Text color="gray.600">
                {new Date(assignment.due_date).toLocaleDateString()}
              </Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text fontWeight="medium" color="gray.700">
                Maximum Points:
              </Text>
              <Text color="gray.600">{assignment.max_points}</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text fontWeight="medium" color="gray.700">
                Created:
              </Text>
              <Text color="gray.600">
                {new Date(assignment.created_at).toLocaleDateString()}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Assignment Description */}
        {assignment.description && (
          <Box
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="border"
          >
            <Text fontWeight="medium" color="gray.700" mb={3}>
              Assignment Description
            </Text>
            <Text color="gray.600" lineHeight="1.6">
              {assignment.description}
            </Text>
          </Box>
        )}

        {/* Instructions */}
        {assignment.instructions && (
          <Box
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="border"
          >
            <Text fontWeight="medium" color="gray.700" mb={3}>
              Instructions
            </Text>
            <Text color="gray.600" lineHeight="1.6">
              {assignment.instructions}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default AssignmentDetails;
