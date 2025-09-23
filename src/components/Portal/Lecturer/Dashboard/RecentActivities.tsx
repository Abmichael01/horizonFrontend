import BulletTitle from "@/components/Generals/BulletTitle";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { History, BookOpen, Users, FileText } from "lucide-react";

export default function LecturerRecentActivities() {
  const activities = [
    {
      icon: BookOpen,
      description: "Created new assignment for CS101",
      date: "12th June, 2025",
      color: "blue.500"
    },
    {
      icon: FileText,
      description: "Graded 25 assignments for CS201",
      date: "11th June, 2025",
      color: "green.500"
    },
    {
      icon: Users,
      description: "Added 5 new students to CS301",
      date: "10th June, 2025",
      color: "purple.500"
    },
    {
      icon: History,
      description: "Updated course materials for CS101",
      date: "9th June, 2025",
      color: "orange.500"
    },
  ];

  return (
    <Stack
      spaceY="10px"
      bg="white"
      p="20px"
      rounded="xl"
      border="1px solid"
      borderColor={"border"}
    >
      <BulletTitle>Recent Activities</BulletTitle>
      <Box bg="white" minH="100px" w="full" divideY="1px">
        {activities.map((activity, index) => (
          <Flex
            justify="space-between"
            key={index}
            py="20px"
            px="10px"
            fontSize={"sm"}
            align={"center"}
          >
            <Flex gap={1} align={"center"}>
              <Box
                color={activity.color}
                bg={`${activity.color.replace('.500', '.50')}`}
                p="10px"
                rounded="full"
              >
                <activity.icon size={18} />
              </Box>
              <Text>{activity.description}</Text>
            </Flex>
            <Text>{activity.date}</Text>
          </Flex>
        ))}
      </Box>
    </Stack>
  );
}


