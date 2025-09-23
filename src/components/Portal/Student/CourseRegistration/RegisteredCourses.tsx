import { registeredCourses as registeredCoursesEnd } from "@/api/apiEndpoints";
import NoDataFound from "@/components/Generals/NoDataFound";
import { RegisteredCourses as RegisteredCoursesType } from "@/types";
import { Table, Flex, Heading, Text, Box, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function RegisteredCourses() {
  const { data, isLoading } = useQuery({
    queryKey: ["registered-courses"],
    queryFn: registeredCoursesEnd,
  });

  if (isLoading) {
    return (
      <Flex align="center" justify="center" minH="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const registered = data as RegisteredCoursesType;

  const stats = [
    { label: "Total Courses", value: registered?.total_courses },
    {
      label: "Total Units",
      value: registered?.total_units,
    },
  ];

  const rows = registered?.courses.map((course) => (
    <Table.Row key={course.code}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.title}</Table.Cell>
      <Table.Cell>{course.units}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Flex direction="column" spaceY={["10px", "20px"]} p={["8px", "20px"]}>
      {/* Stats Cards */}
      <Flex gap={6} direction={{ base: "row", md: "row" }} mb={6}>
        {stats.map((stat, index) => (
          <Box
            key={index}
            bg="gray.100"
            border="1px solid"
            borderColor={"border"}
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
            <Text fontSize="3xl" fontWeight="bold" color="gray.700">
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
        <Table.Body>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <Table.Row>
              <Table.Cell colSpan={4} textAlign="center">
                <NoDataFound text="You haven't registered for any courses yet. Go to the 'Register Courses' tab to browse and add courses to your registration." />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
