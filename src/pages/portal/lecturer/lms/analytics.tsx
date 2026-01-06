import { Stack, Text, Box } from "@chakra-ui/react";

export default function Analytics() {
    return (
        <Stack spaceY="10px">
            <Text fontWeight={500} fontSize={20}>
                Course Analytics
            </Text>
            
            <Box
                bg="white"
                border="1px solid"
                borderColor={"border"}
                rounded="xl"
                p="20px"
            >
                <Text fontSize="lg" fontWeight={400} mb={4}>
                    Performance Analytics
                </Text>
                <Text color="gray.500" textAlign="center" py={8}>
                    Advanced analytics and reporting features will be implemented here.
                </Text>
            </Box>
        </Stack>
    );
}
