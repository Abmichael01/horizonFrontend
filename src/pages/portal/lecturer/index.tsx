import LecturerOverview from "@/components/Portal/Lecturer/Dashboard/Overview";
import LecturerAnnouncements from "@/components/Portal/Lecturer/Dashboard/Announcements";
import LecturerRecentActivities from "@/components/Portal/Lecturer/Dashboard/RecentActivities";
import { LecturerOverview as LecturerOverviewType } from "@/types";
import { Grid, Stack, Text } from "@chakra-ui/react";

// Mock data for now
const mockLecturerData: LecturerOverviewType = {
  current_semester: "Fall 2025",
  lecturer_profile: {
    id: "LEC-A1B2C3",
    user: {
      email: "john.smith@university.edu",
      date_joined: "2023-01-15T10:30:00Z"
    },
    full_name: "Dr. John Smith",
    staff_id: "LEC-A1B2C3",
    phone: "+1 (555) 123-4567",
    department: {
      id: 1,
      name: "Computer Science",
      short: "CS",
      faculty: {
        id: 1,
        name: "Engineering",
        short: "ENG"
      }
    },
    specialization: "Software Engineering & AI",
    created_at: "2023-01-15T10:30:00Z"
  },
  current_academic_session: {
    session_name: "2024/2025 Academic Session",
    start_date: "2024-09-01",
    end_date: "2025-08-31"
  },
  total_courses: 4,
  total_students: 120
};

export default function LecturerDashboard() {
  return (
    <Stack spaceY="20px">
      <Text fontWeight={700} fontSize={20}>
        Lecturer's Dashboard
      </Text>
      <LecturerOverview data={mockLecturerData} />
      <Grid templateColumns={"repeat(2, 1fr)"} gap="20px">
        <LecturerRecentActivities />
        <LecturerAnnouncements />
      </Grid>
    </Stack>
  );
}
