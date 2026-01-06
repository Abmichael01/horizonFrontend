import { registeredCourses as registeredCoursesEnd } from "@/api/apiEndpoints";
import NoDataFound from "@/components/Generals/NoDataFound";
import { RegisteredCourses as RegisteredCoursesType } from "@/types";
import { Table, Flex, Box, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";

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

  const stats: StatItem[] = [
    { 
      title: "Total Courses", 
      value: registered?.total_courses || 0,
      color: "primary.500",
    },
    {
      title: "Total Units",
      value: registered?.total_units || 0,
      color: "primary.500",
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
      <Box mb={6}>
        <StatsCardGrid stats={stats} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} />
      </Box>

      {/* Table for Registered Courses */}
      <Box
        border="1px solid"
        borderColor="border"
        rounded="lg"
        overflow="hidden"
        w="100%"
      >
        <Box
          overflowX="auto"
          w="100%"
          css={{
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '10px',
              '&:hover': {
                background: '#a8a8a8',
              },
            },
            // For Firefox
            scrollbarWidth: 'thin',
            scrollbarColor: '#c1c1c1 #f1f1f1',
          }}
        >
          <Table.Root variant="outline" minW="500px" rounded="lg">
        <Table.Header bg="gray.50">
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
        </Box>
      </Box>
    </Flex>
  );
}
