import CourseForm from "@/components/Portal/Student/CourseRegistration/CourseForm";
import RegisterCourses from "@/components/Portal/Student/CourseRegistration/RegisterCourses";
import RegisteredCourses from "@/components/Portal/Student/CourseRegistration/RegisteredCourses";
import { Box, Tabs } from "@chakra-ui/react";

import { BookMarkedIcon, BookOpen, File } from "lucide-react";

export default function CourseRegistration() {
  // const [  ]
  

 
  return (
    <Box
      bg="white"
      p="20px"
      border="1px solid"
      rounded="xl"
      borderColor={"border"}
    >
      <Tabs.Root defaultValue="members">
        <Tabs.List colorPalette={"primary.dark"}>
          <Tabs.Trigger value="members">
            <BookOpen size={20} />
            Register Courses
          </Tabs.Trigger>
          <Tabs.Trigger value="projects">
            <BookMarkedIcon size={20} />
            Registered Courses
          </Tabs.Trigger>
          <Tabs.Trigger value="tasks">
            <File size={20} />
            Course Form
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="members">
          <RegisterCourses />
        </Tabs.Content>
        <Tabs.Content value="projects">
          <RegisteredCourses />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <CourseForm />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
