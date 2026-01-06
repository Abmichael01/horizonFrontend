import { Box, Text, Grid } from "@chakra-ui/react";
import { LmsOverview } from "@/types";

interface AcademicPeriodProps {
    data: LmsOverview;
}

export default function AcademicPeriod({ data }: AcademicPeriodProps) {
    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor={"border"}
            rounded="xl"
            p="20px"
        >
            <Text fontSize="lg" fontWeight={400} mb={4}>
                Current Academic Period
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>
                        Semester
                    </Text>
                    <Text fontWeight={400} fontSize="md">
                        {data?.current_semester}
                    </Text>
                </Box>
                <Box
                    border="1px solid"
                    borderColor="border"
                    rounded="lg"
                    p="12px"
                >
                    <Text fontSize="sm" color="gray.600" mb={1}>
                        Session
                    </Text>
                    <Text fontWeight={400} fontSize="md">
                        {data?.current_session}
                    </Text>
                </Box>
            </Grid>
        </Box>
    );
}                                       
