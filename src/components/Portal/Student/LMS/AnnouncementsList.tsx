import React from 'react';
import { Box, Text, VStack, HStack, Badge, Icon } from "@chakra-ui/react";
import { FiBell, FiCalendar, FiUser } from 'react-icons/fi';
import { Announcement } from '../../../types';

interface AnnouncementsListProps {
  announcements: Announcement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
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
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Text fontSize="lg" fontWeight={600} color="gray.700">
            Announcements
          </Text>
          <Text fontSize="sm" color="gray.600">
            Stay updated with course announcements
          </Text>
        </Box>

        {/* Announcements List */}
        <VStack spacing={4} align="stretch">
          {announcements.map((announcement) => (
            <Box
              key={announcement.id}
              p={6}
              bg="white"
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _hover={{ shadow: 'md' }}
              transition="all 0.2s"
            >
              <VStack spacing={4} align="stretch">
                {/* Header */}
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={2} flex={1}>
                    <HStack spacing={2}>
                      <Icon as={FiBell} color="blue.500" />
                      <Text fontSize="lg" fontWeight="bold" color="gray.800">
                        {announcement.title}
                      </Text>
                      {!announcement.is_read && (
                        <Badge colorScheme="red" variant="solid" size="sm">
                          New
                        </Badge>
                      )}
                    </HStack>
                    {announcement.course && (
                      <Badge colorScheme="blue" variant="subtle">
                        {announcement.course.title}
                      </Badge>
                    )}
                  </VStack>
                </HStack>

                {/* Content */}
                <Text color="gray.600" lineHeight="1.6">
                  {announcement.content}
                </Text>

                {/* Footer */}
                <Box borderTop="1px" borderColor="gray.200" />
                <HStack justify="space-between" fontSize="sm" color="gray.500">
                  <HStack spacing={4}>
                    <HStack spacing={1}>
                      <Icon as={FiUser} />
                      <Text>{announcement.created_by}</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon as={FiCalendar} />
                      <Text>
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </HStack>
                  {announcement.is_general && (
                    <Badge colorScheme="green" variant="subtle">
                      General
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </Box>
          ))}

          {announcements.length === 0 && (
            <Box
              p={8}
              textAlign="center"
              bg="gray.50"
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
            >
              <Icon as={FiBell} boxSize={12} color="gray.400" mb={4} />
              <Text fontSize="lg" color="gray.600" fontWeight="medium">
                No announcements yet
              </Text>
              <Text fontSize="sm" color="gray.500">
                Check back later for updates from your instructors
              </Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default AnnouncementsList;
