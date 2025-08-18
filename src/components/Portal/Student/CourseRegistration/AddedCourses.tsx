import { Table, Button, Box } from "@chakra-ui/react";
import { Course } from "@/types";

export default function AddedCourses({ addedCourses, setAddedCourses }: { addedCourses: Course[], setAddedCourses: React.Dispatch<React.SetStateAction<Course[]>> }) {
  const removeCourse = (courseCode: string) => {
    setAddedCourses((prev) => prev.filter((course) => course.code !== courseCode));
  };

  const rows = addedCourses?.map((course) => (
    <Table.Row key={course.code}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.title}</Table.Cell>
      <Table.Cell>{course.units}</Table.Cell>
      <Table.Cell>
        <Button colorScheme="red" size="sm" onClick={() => removeCourse(course.code)}>
          Remove Course
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
