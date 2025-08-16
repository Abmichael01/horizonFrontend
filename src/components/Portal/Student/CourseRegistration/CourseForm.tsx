import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { jsPDF } from "jspdf";

// Example data for registered courses (this would normally come from a server or state)
const courses = [
  { code: "CS101", title: "Introduction to Computer Science", units: 3 },
  { code: "MATH101", title: "Calculus I", units: 4 },
  { code: "ENG101", title: "English Literature", units: 3 },
  { code: "PHYS101", title: "Physics I", units: 4 },
  { code: "CHEM101", title: "General Chemistry", units: 3 },
  { code: "BIO101", title: "Introduction to Biology", units: 3 },
  { code: "CS102", title: "Data Structures and Algorithms", units: 4 },
  { code: "CS103", title: "Database Systems", units: 3 },
  { code: "HIST101", title: "World History", units: 3 },
  { code: "ECON101", title: "Principles of Economics", units: 3 },
  { code: "STAT101", title: "Statistics for Scientists", units: 3 },
  { code: "PHIL101", title: "Introduction to Philosophy", units: 3 },
  { code: "ART101", title: "Introduction to Art", units: 3 },
];

const generatePDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Course Registration Form", 14, 20);

  // Add some space
  doc.setFontSize(12);
  doc.text("Please review and confirm your selected courses for the upcoming semester:", 14, 30);

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
  courses.forEach((course, index) => {
    y += 10; // Increment Y for each row
    doc.text(course.code, 14, y);
    doc.text(course.title, 55, y);
    doc.text(course.units.toString(), 150, y);
  });

  // Save the PDF
  doc.save("Course_Registration_Form.pdf");
};

export default function CourseForm() {
  return (
    <Flex direction="column" p={5} gap={6}>
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
        <Button
          mt={5}
          colorScheme="teal"
          size="lg"
          onClick={generatePDF}
        >
          Download PDF
        </Button>
      </Box>
    </Flex>
  );
}
