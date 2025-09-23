import { Button, Table, Box } from "@chakra-ui/react";
import { useCourseStore } from "@/stores/courseStore";
import { useMutation } from "@tanstack/react-query";
import { registerCourses } from "@/api/apiEndpoints";
import { toaster } from "@/components/ui/toaster";
import NoDataFound from "@/components/Generals/NoDataFound";
import errorMessage from "@/lib/errorMessage";

export default function AddedCourses() {
  const { addedCourses, removeCourse } = useCourseStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { course_codes: string[] }) => registerCourses(data),
    onSuccess: () => {
      toaster.create({
        type: "success",
        description: "Registration Successful",
      });
    },
    onError: (error: Error) => {
      toaster.create({
        type: "error",
        description: errorMessage(error),
      });
    }
  });

  const register = () => {
    const courses = addedCourses.map((course) => course.code);
    mutate({ course_codes: courses });
  };

  const rows = addedCourses?.map((course) => (
    <Table.Row key={course.code}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.title}</Table.Cell>
      <Table.Cell>{course.units}</Table.Cell>
      <Table.Cell>
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => {
            removeCourse(course.code);
            toaster.create({
              description: "Course Removed",
              type: "info",
            });
          }}
        >
          Remove Course
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Box spaceY="5">
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Course Code</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Units</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {addedCourses?.length !== 0 ? (
            rows
          ) : (
            <Table.Row>
              <Table.Cell colSpan={4}>
                <NoDataFound text="No courses added yet. Go to the 'Available Courses' tab to browse and add courses to your registration list." />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      <Button disabled={addedCourses?.length === 0} bg="primary.dark" onClick={register} loading={isPending}>
        Register Courses
      </Button>
    </Box>
  );
}
