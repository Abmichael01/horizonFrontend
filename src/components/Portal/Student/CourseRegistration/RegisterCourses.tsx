import { Box, Tabs } from "@chakra-ui/react";
// import { useState } from "react";
import AddedCourses from "@/components/Portal/Student/CourseRegistration/AddedCourses";
// import { Course } from "@/types";
import AddCourses from "./AddCourse";

export default function RegisterCourses() {
  // const [addedCourses, setAddedCourses] = useState<Course[]>([]);

  return (
    <Box bg="white" p={["8px", "20px"]}>
      <Tabs.Root defaultValue="available-courses" variant="enclosed" fitted>
        <Tabs.List colorPalette="primary.dark">
          <Tabs.Trigger value="available-courses">Available Courses</Tabs.Trigger>
          <Tabs.Trigger value="added-courses">Added Courses</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="available-courses"  >
          <AddCourses />
        </Tabs.Content>

        <Tabs.Content value="added-courses" >
          <AddedCourses />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
