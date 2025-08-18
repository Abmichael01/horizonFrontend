import { getStudentOverview } from "@/api/apiEndpoints";
import Announcements from "@/components/Portal/Student/Dashboard/Announcements";
import Overview from "@/components/Portal/Student/Dashboard/Overview";
import RecentActivities from "@/components/Portal/Student/Dashboard/RecentActivities";
import { StudentOverview } from "@/types";
import { Grid, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["overview"],
    queryFn: getStudentOverview
  })

  console.log(data)

  return (
    <Stack spaceY="20px">
      <Text fontWeight={700} fontSize={20}>
        Student's Dashboard
      </Text>
      <Overview data={data  as StudentOverview} />
      <Grid templateColumns={"repeat(2, 1fr)"} gap="20px">
        <RecentActivities />
        <Announcements />
      </Grid>
    </Stack>
  );
}
