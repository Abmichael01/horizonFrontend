import {
  Flex,
  Box,
  Text,
  Grid,
} from "@chakra-ui/react";

const studentData = [
  { title: "Current Year", value: "2025", icon: "📅", color: "primary.dark" },
  { title: "Current CGPA", value: "3.75", icon: "🎓", color: "green.500" },
  { title: "Total Credits Completed", value: "80", icon: "📘", color: "yellow.500" },
];

export default function Overview() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {studentData.map((data, index) => (
        <Box
          key={index}
          bg="white"
          border="1px solid"
          borderColor={"border"}
          rounded="xl"
          p="20px"
          pb="30px"
          spaceY="20px"
        >
          <Flex gap="2" align="center">
            <Box w="16px" h="16px" bg={data.color} rounded="full" />
            <Text  >{data.title}</Text>
          </Flex>
          <Text fontWeight={500} color={data.color} fontSize={30} textAlign={"center"} >{data.value}</Text>
        </Box>
      ))}
    </Grid>
  );
}
