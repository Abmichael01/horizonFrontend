import { Grid, Box, Flex, Text } from "@chakra-ui/react";
import { TbChartBar, TbTrendingUp } from "react-icons/tb";

export default function AnalyticsCharts() {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <Box
                bg="white"
                border="1px solid"
                borderColor={"border"}
                rounded="xl"
                p="20px"
            >
                <Flex gap="2" align="center" mb={4}>
                    <TbChartBar fontSize="20px" color="blue.500" />
                    <Text fontWeight={400} fontSize="lg">Student Performance Trends</Text>
                </Flex>
                <Box
                    bg="gray.50"
                    border="2px dashed"
                    borderColor="gray.300"
                    rounded="lg"
                    p="40px"
                    textAlign="center"
                >
                    <Text color="gray.500" fontSize="sm">
                        📊 Performance Chart Placeholder
                    </Text>
                    <Text color="gray.400" fontSize="xs" mt={1}>
                        Chart will be implemented later
                    </Text>
                </Box>
            </Box>

            <Box
                bg="white"
                border="1px solid"
                borderColor={"border"}
                rounded="xl"
                p="20px"
            >
                <Flex gap="2" align="center" mb={4}>
                    <TbTrendingUp fontSize="20px" color="green.500" />
                    <Text fontWeight={400} fontSize="lg">Course Engagement</Text>
                </Flex>
                <Box
                    bg="gray.50"
                    border="2px dashed"
                    borderColor="gray.300"
                    rounded="lg"
                    p="40px"
                    textAlign="center"
                >
                    <Text color="gray.500" fontSize="sm">
                        📈 Engagement Chart Placeholder
                    </Text>
                    <Text color="gray.400" fontSize="xs" mt={1}>
                        Chart will be implemented later
                    </Text>
                </Box>
            </Box>
        </Grid>
    );
}
