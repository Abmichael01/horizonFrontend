import { getLecturerOverview } from "@/api/apiEndpoints";
import LecturerOverview from "@/components/Portal/Lecturer/Dashboard/Overview";
import LecturerAnnouncements from "@/components/Portal/Lecturer/Dashboard/Announcements";
import LecturerRecentActivities from "@/components/Portal/Lecturer/Dashboard/RecentActivities";
import { LecturerOverview as LecturerOverviewType } from "@/types";
import { Grid, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function LecturerDashboard() {
  const { data } = useQuery({
    queryKey: ["lecturer-overview"],
    queryFn: getLecturerOverview
  })

  console.log(data)

  return (
    <Stack spaceY="20px">
      <Text fontWeight={500} fontSize={20}>
        Lecturer's Dashboard
      </Text>
      <LecturerOverview data={data as LecturerOverviewType} />
      <Grid templateColumns={"repeat(2, 1fr)"} gap="20px">
        <LecturerRecentActivities />
        <LecturerAnnouncements />
      </Grid>
    </Stack>
  );
}
