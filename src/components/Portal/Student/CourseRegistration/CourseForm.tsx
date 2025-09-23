import { registeredCourses } from "@/api/apiEndpoints";
import { Course } from "@/types";
import { Box, Heading, Text, Button, Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { jsPDF } from "jspdf";
import NoDataFound from "@/components/Generals/NoDataFound";

const generatePDF = (courses: Course[]) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Course Registration Form", 14, 20);

  // Add some space
  doc.setFontSize(12);
  doc.text(
    "Please review and confirm your selected courses for the current semester:",
    14,
    30
  );

  // Table headers
  const headers = ["Course Code", "Title", "Units"];
  let y = 40; // Starting Y position for table

  // Draw table header
  doc.setFont("helvetica", "bold");
  doc.text(headers[0], 14, y);
  doc.text(headers[1], 55, y);
  doc.text(headers[2], 150, y);

  // Draw table rows
  doc.setFont("helvetica", "normal");
  courses.forEach((course) => {
    y += 10; // Increment Y for each row
    doc.text(course.code, 14, y);
    doc.text(course.title, 55, y);
    doc.text(course.units.toString(), 150, y);
  });

  // Save the PDF
  doc.save("Course_Registration_Form.pdf");
};

export default function CourseForm() {
  const { data, isLoading } = useQuery({
    queryKey: ["registered-courses"],
    queryFn: registeredCourses,
  });

  if (isLoading) {
    return (
      <Flex align="center" justify="center" minH="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const courses = data?.courses as Course[];
  
  // Check if there are no registered courses
  if (!courses || courses.length === 0) {
    return (
      <Flex direction="column" p={5} gap={["10px", "20px"]}>
        <NoDataFound text="No registered courses found. Please register for courses first using the 'Register Courses' tab, then come back here to download your registration form." />
      </Flex>
    );
  }
  
  return (
    <Flex direction="column" p={5} gap={[ "10px", "20px" ]}>
      {/* Course Form Card */}
      <Box
        bg="primary.50"
        border="1px solid"
        borderColor="primary.100"
        p={5}
        borderRadius="xl"
        w="full"
        _hover={{ boxShadow: "lg" }}
        transition="all 0.3s ease-in-out"
      >
        <Heading size="sm" color="primary.500">
          Course Registration Form
        </Heading>
        <Text fontSize="xl" fontWeight="bold" color="primary.dark" mt={4}>
          Download the course registration form with all your selected courses.
        </Text>
        <Button mt={5} colorScheme="teal" size="lg" onClick={() => generatePDF(courses)}>
          Download PDF
        </Button>
      </Box>
    </Flex>
  );
}
