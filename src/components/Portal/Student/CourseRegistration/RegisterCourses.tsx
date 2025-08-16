import BulletTitle from "@/components/Generals/BulletTitle";
import { Checkbox, Table, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";

// Example data for courses
const courses = [
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

export default function RegisterCourses() {
  const [selection, setSelection] = useState<string[]>([]);

  const indeterminate = selection.length > 0 && selection.length < courses.length;
  
  const rows = courses.map((course) => (
    <Table.Row
      key={course.code}
      data-selected={selection.includes(course.code) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          mt="0.5"
          aria-label="Select row"
          checked={selection.includes(course.code)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, course.code]
                : selection.filter((code) => code !== course.code)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.title}</Table.Cell>
      <Table.Cell>{course.units}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Flex direction="column" spaceY="20px" p={5}>
      <BulletTitle>Available Courses</BulletTitle>
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox.Root
                size="sm"
                mt="0.5"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(
                    changes.checked ? courses.map((course) => course.code) : []
                  );
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Course Code</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Units</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
      
      {/* Register Courses Button */}
      <Button
        colorScheme="teal"
        size="lg"
        mt={4}
        disabled={selection.length === 0}
        w="fit"
        alignSelf={"end"}
      >
        Register Courses
      </Button>
    </Flex>
  );
}
