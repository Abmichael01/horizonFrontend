import React from 'react';
import { Grid, Flex, Box, Text, Badge } from "@chakra-ui/react";
import { TbBook, TbSchool, TbAward, TbCalendar, TbFileText, TbTarget } from "react-icons/tb";
import { Course } from '../../../types';

interface CourseDetailsProps {
  course: Course;
  totalAssignments?: number;
  pendingAssignments?: number;
  totalPoints?: number;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ 
  course, 
  totalAssignments = 0, 
  pendingAssignments = 0, 
  totalPoints = 0 
}) => {
  if (!course) return null;

  const stats = [
    {
      title: "Course Code",
      value: course.code,
      subtitle: course.title,
      icon: TbBook,
      color: "blue.500",
    },
    {
      title: "Course Units",
      value: course.units,
      subtitle: "Credit hours",
      icon: TbAward,
      color: "green.500",
    },
    {
      title: "Total Assignments",
      value: totalAssignments,
      subtitle: "All assignments",
      icon: TbFileText,
      color: "purple.500",
    },
    {
      title: "Pending Assignments",
      value: pendingAssignments,
      subtitle: "Not submitted",
      icon: TbCalendar,
      color: "orange.500",
    },
    {
      title: "Total Points",
      value: totalPoints,
      subtitle: "Maximum points",
      icon: TbTarget,
      color: "teal.500",
    },
  ];

  return (
    <Grid templateColumns={{ base:"repeat(1, 1fr)", sm:"repeat(2, 1fr)", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)" }} gap={5}>
      {stats.map((stat, index) => (
        <Flex
          key={index}
          bg="white"
          border="1px solid"
          borderColor={"border"}
          rounded="xl"
          p="20px"
          direction="column"
          gap={3}
        >
          <Flex gap="2" align="center">
            <Box
              bg="gray.50"
              p="8px"
              rounded="lg"
              border="1px solid"
              borderColor="border"
            >
              <stat.icon fontSize="20px" color={stat.color} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600">{stat.title}</Text>
              <Text fontSize="xs" color="gray.500">{stat.subtitle}</Text>
            </Box>
          </Flex>
          <Text
            fontWeight={500}
            color={stat.color}
            fontSize={28}
          >
            {stat.value}
          </Text>
        </Flex>
      ))}
    </Grid>
  );
};

export default CourseDetails;
