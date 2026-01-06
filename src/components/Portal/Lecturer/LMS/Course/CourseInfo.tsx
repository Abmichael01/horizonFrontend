import { Grid, Text, Box, Badge } from "@chakra-ui/react";
import { Course } from "@/types";

interface CourseInfoProps {
    course: Course;
    currentSemester: string;
}

export default function CourseInfo({ course, currentSemester }: CourseInfoProps) {
    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="border"
            rounded="xl"
            p="20px"
        >
            <Text fontSize="lg" fontWeight={400} mb={4}>
                Course Information
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>Course Code</Text>
                    <Text fontWeight={400} fontSize="md">{course.code}</Text>
                </Box>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>Course Title</Text>
                    <Text fontWeight={400} fontSize="md" >{course.title}</Text>
                </Box>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>Department</Text>
                    <Text fontWeight={400} fontSize="md">{course.department}</Text>
                </Box>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>Units</Text>
                    <Badge colorScheme="blue" variant="solid" fontSize="sm">
                        {course.units} Units
                    </Badge>
                </Box>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>Level</Text>
                    <Text fontWeight={400} fontSize="md">Level {course.level}</Text>
                </Box>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>Semester</Text>
                    <Text fontWeight={400} fontSize="md">{currentSemester}</Text>
                </Box>
            </Grid>
        </Box>
    );
}
