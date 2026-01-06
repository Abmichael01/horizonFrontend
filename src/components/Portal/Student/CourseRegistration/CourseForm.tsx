import { registeredCourses, getStudentOverview } from "@/api/apiEndpoints";
import { RegisteredCourses as RegisteredCoursesType, StudentOverview } from "@/types";
import { Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import NoDataFound from "@/components/Generals/NoDataFound";
import CourseFormDownload from "./CourseFormDownload";

export default function CourseForm() {
  const { data, isLoading } = useQuery({
    queryKey: ["registered-courses"],
    queryFn: registeredCourses,
  });
  
  const { data: studentData, isLoading: studentLoading } = useQuery({
    queryKey: ["student-overview"],
    queryFn: getStudentOverview,
  });

  if (isLoading || studentLoading) {
    return (
      <Flex align="center" justify="center" minH="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const registered = data as RegisteredCoursesType;
  const studentOverview = studentData as StudentOverview;
  
  // Check if there are no registered courses
  if (!registered?.courses || registered.courses.length === 0) {
    return (
      <Flex direction="column" p={5} gap={["10px", "20px"]}>
        <NoDataFound text="No registered courses found. Please register for courses first using the 'Register Courses' tab, then come back here to preview and download your registration form." />
      </Flex>
    );
  }
  
  return (
    <Flex direction="column" p={5} gap={["10px", "20px"]}>
      <CourseFormDownload
        courses={registered.courses}
        studentProfile={studentOverview.student_profile}
        currentSemester={studentOverview.current_semester}
        currentSession={studentOverview.current_academic_session?.session_name || ''}
        totalUnits={registered.total_units}
      />
    </Flex>
  );
}
