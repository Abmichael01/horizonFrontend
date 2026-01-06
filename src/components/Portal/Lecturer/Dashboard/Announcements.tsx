import BulletTitle from "@/components/Generals/BulletTitle";
import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import { Bell, Calendar, Users } from "lucide-react";

export default function LecturerAnnouncements() {
  const announcements = [
    {
      icon: Calendar,
      title: "Midterm Exams Schedule",
      description: "Midterm examinations will commence on June 20th, 2025",
      date: "2 days ago",
      color: "blue.500"
    },
    {
      icon: Users,
      title: "New Student Registration",
      description: "15 new students have been added to your courses",
      date: "1 week ago",
      color: "green.500"
    },
    {
      icon: Bell,
      title: "Course Material Update",
      description: "Please update your course materials for the new semester",
      date: "2 weeks ago",
      color: "orange.500"
    },
  ];

  return (
    <Stack
      spaceY="10px"
      bg="primary.50"
      rounded="xl"
      p="20px"
      border="1px solid"
      borderColor={"border"}
    >
      <BulletTitle>Announcements</BulletTitle>
      <Box>
        {announcements.map((announcement, index) => (
          <Flex
            key={index}
            gap={3}
            p="15px"
            bg="white"
            rounded="lg"
            mb="10px"
            border="1px solid"
            borderColor="border"
            align="flex-start"
          >
            <Box
              color={announcement.color}
              bg={`${announcement.color.replace('.500', '.50')}`}
              p="8px"
              rounded="full"
              mt="2px"
            >
              <announcement.icon size={16} />
            </Box>
            <Box flex="1">
              <Text fontWeight="400" fontSize="sm" mb="5px">
                {announcement.title}
              </Text>
              <Text fontSize="xs" color="gray.600" mb="5px">
                {announcement.description}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {announcement.date}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Stack>
  );
}


