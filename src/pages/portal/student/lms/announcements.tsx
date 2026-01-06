import { Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStudentAnnouncements } from "@/api/apiEndpoints";
import { StudentAnnouncementsOverview } from "@/types";
import { AnnouncementsList } from "@/components/Portal/Student/LMS";
import DataLoading from "@/components/Generals/DataLoading";

export default function StudentAnnouncements() {
    const { data, isLoading } = useQuery({
        queryKey: ["student-announcements"],
        queryFn: getStudentAnnouncements
    });

    if (isLoading) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Announcements
                </Text>
                <DataLoading text="Loading announcements..." />
            </Stack>
        );
    }

    const announcementsData = data as StudentAnnouncementsOverview;

    return (
        <Stack gap="10px">
            <Text fontWeight={500} fontSize={20}>
                Announcements
            </Text>
            
            <AnnouncementsList announcements={announcementsData?.announcements || []} />
        </Stack>
    );
}
