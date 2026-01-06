import { Stack, Text, Box } from "@chakra-ui/react";

export default function Attendance() {
    return (
        <Stack spaceY="10px">
            <Text fontWeight={500} fontSize={20}>
                Attendance Management
            </Text>
            
            <Box
                bg="white"
                border="1px solid"
                borderColor={"border"}
                rounded="xl"
                p="20px"
            >
                <Text fontSize="lg" fontWeight={400} mb={4}>
                    Student Attendance
                </Text>
                <Text color="gray.500" textAlign="center" py={8}>
                    Attendance tracking and management features will be implemented here.
                </Text>
            </Box>
        </Stack>
    );
}
