import { Stack, Text, Box } from "@chakra-ui/react";

export default function Grades() {
    return (
        <Stack spaceY="10px">
            <Text fontWeight={500} fontSize={20}>
                Grade Management
            </Text>
            
            <Box
                bg="white"
                border="1px solid"
                borderColor={"border"}
                rounded="xl"
                p="20px"
            >
                <Text fontSize="lg" fontWeight={400} mb={4}>
                    Student Grades
                </Text>
                <Text color="gray.500" textAlign="center" py={8}>
                    Grade management features will be implemented here.
                </Text>
            </Box>
        </Stack>
    );
}
