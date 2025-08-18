import { Button, Table, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCourses } from "@/api/apiEndpoints";
import { Course } from "@/types";

export default function AddCourses({ setAddedCourses }: { setAddedCourses: React.Dispatch<React.SetStateAction<Course[]>> }) {
  const { data } = useQuery({
    queryKey: ["available-courses"],
    queryFn: () => getAvailableCourses(),
  });

  const courses = data as Course[];

  const rows = courses?.map((course) => (
    <Table.Row key={course.code}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.title}</Table.Cell>
      <Table.Cell>{course.units}</Table.Cell>
      <Table.Cell>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => setAddedCourses((prev) => [...prev, course])}
        >
          Add Course
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Box>
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Course Code</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Units</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </Box>
  );
}
