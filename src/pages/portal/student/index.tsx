import Announcements from "@/components/Portal/Student/Dashboard/Announcements";
import Overview from "@/components/Portal/Student/Dashboard/Overview";
import RecentActivities from "@/components/Portal/Student/Dashboard/RecentActivities";
import { Grid, Stack, Text } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Stack spaceY="20px">
      <Text fontWeight={700} fontSize={20}>
        Student's Dashboard
      </Text>
      <Overview />
      <Grid templateColumns={"repeat(2, 1fr)"} gap="20px">
        <RecentActivities />
        <Announcements />
      </Grid>
    </Stack>
  );
}
