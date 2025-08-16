import BulletTitle from "@/components/Generals/BulletTitle";
import { Table, Flex, CardBody, Heading, Text, Box } from "@chakra-ui/react";

// Example data for registered courses (this would normally come from a server or state)
const registeredCourses = [
  { id: 1, code: "CS101", title: "Introduction to Computer Science", units: 3 },
  { id: 2, code: "MATH101", title: "Calculus I", units: 4 },
  { id: 3, code: "ENG101", title: "English Literature", units: 3 },
  { id: 4, code: "PHYS101", title: "Physics I", units: 4 },
  { id: 5, code: "CHEM101", title: "General Chemistry", units: 3 },
  { id: 6, code: "BIO101", title: "Introduction to Biology", units: 3 },
  { id: 7, code: "CS102", title: "Data Structures and Algorithms", units: 4 },
  { id: 8, code: "CS103", title: "Database Systems", units: 3 },
  { id: 9, code: "HIST101", title: "World History", units: 3 },
  { id: 10, code: "ECON101", title: "Principles of Economics", units: 3 },
  { id: 11, code: "STAT101", title: "Statistics for Scientists", units: 3 },
  { id: 12, code: "PHIL101", title: "Introduction to Philosophy", units: 3 },
  { id: 13, code: "ART101", title: "Introduction to Art", units: 3 },
];

// Stats array for dynamic mapping
const stats = [
  { label: "Total Courses", value: registeredCourses.length },
  {
    label: "Total Units",
    value: registeredCourses.reduce((total, course) => total + course.units, 0),
  },
];

export default function RegisteredCourses() {
  const rows = registeredCourses.map((course) => (
    <Table.Row key={course.code}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.title}</Table.Cell>
      <Table.Cell>{course.units}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Flex direction="column" spaceY="20px" p={5}>
      <BulletTitle>Registered Courses</BulletTitle>

      {/* Stats Cards */}
      <Flex gap={6} direction={{ base: "column", md: "row" }} mb={6}>
        {stats.map((stat, index) => (
          <Box
            key={index}
            bg="primary.50"
            border="1px solid"
            borderColor={"primary.100"}
            boxShadow=""
            p={5}
            borderRadius="xl"
            w="full"
            _hover={{ boxShadow: "lg" }}
            transition="all 0.3s ease-in-out"
          >
            <Heading size="sm" color="primary.500">
              {stat.label}
            </Heading>
            <Text fontSize="3xl" fontWeight="bold" color="primary.dark">
              {stat.value}
            </Text>
          </Box>
        ))}
      </Flex>

      {/* Table for Registered Courses */}
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Course Code</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Units</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </Flex>
  );
}
