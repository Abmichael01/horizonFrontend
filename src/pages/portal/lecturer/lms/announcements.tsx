import { Stack, Box, Text } from "@chakra-ui/react";
import { useGeneralAnnouncements, useCreateGeneralAnnouncement } from "@/hooks/useAnnouncements";
import AnnouncementsHeader from "@/components/Portal/Lecturer/LMS/Announcements/AnnouncementsHeader";
import AnnouncementList from "@/components/Portal/Lecturer/LMS/Announcements/AnnouncementList";
import AnnouncementForm from "@/components/Portal/Lecturer/LMS/Announcements/AnnouncementForm";
import DataLoading from "@/components/Generals/DataLoading";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";
import { TbBell, TbWorld, TbBook } from "react-icons/tb";
import { getAssignedCourses } from "@/api/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function GeneralAnnouncementsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, isLoading, error } = useGeneralAnnouncements();
    const { data: coursesData } = useQuery({
        queryKey: ["assigned-courses"],
        queryFn: getAssignedCourses,
    });
    const createMutation = useCreateGeneralAnnouncement();

    const handleCreate = (formData: { title: string; content: string; course_id?: number }) => {
        createMutation.mutate(formData, {
            onSuccess: () => {
                setIsDialogOpen(false);
            },
        });
    };

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

    if (error || !data) {
        return (
            <Stack gap="20px">
                <Text fontWeight={500} fontSize={20}>
                    Announcements
                </Text>
                <Text color="red.500">Error loading announcements</Text>
            </Stack>
        );
    }

    const { announcements, total_announcements } = data;

    // Calculate stats
    const generalAnnouncements = announcements.filter(ann => ann.is_general).length;
    const courseAnnouncements = announcements.filter(ann => !ann.is_general).length;

    const stats: StatItem[] = [
        {
            title: "Total Announcements",
            value: total_announcements,
            subtitle: "All announcements",
            icon: TbBell,
            color: "blue.500",
            iconBg: "blue.50",
        },
        {
            title: "General Announcements",
            value: generalAnnouncements,
            subtitle: "Broadcast to all",
            icon: TbWorld,
            color: "green.500",
            iconBg: "green.50",
        },
        {
            title: "Course Announcements",
            value: courseAnnouncements,
            subtitle: "Course-specific",
            icon: TbBook,
            color: "purple.500",
            iconBg: "purple.50",
        },
    ];

    return (
        <Stack gap="20px">
            <AnnouncementsHeader
                title="All Announcements"
                subtitle={`${total_announcements} total announcements`}
                showCreateButton={true}
                onCreateClick={() => setIsDialogOpen(true)}
                breadcrumbItems={[
                    { label: "LMS", path: "/portal/lecturer/lms" },
                    { label: "Announcements", path: "" },
                ]}
            />

            <StatsCardGrid stats={stats} templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} />

            <AnnouncementForm
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleCreate}
                isLoading={createMutation.isPending}
                courses={coursesData?.courses || []}
                allowCourseSelection={true}
            />

            <Box
                bg="white"
                border="1px solid"
                borderColor="border"
                rounded="xl"
                p="20px"
            >
                <Text fontSize="lg" fontWeight={400} mb={4}>
                    All Announcements ({total_announcements})
                </Text>
                <AnnouncementList
                    announcements={announcements}
                    emptyMessage="No announcements yet. Create one to notify students."
                />
            </Box>
        </Stack>
    );
}
