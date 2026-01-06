import { Stack, Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useCourseAnnouncements, useCreateCourseAnnouncement } from "@/hooks/useAnnouncements";
import AnnouncementsHeader from "@/components/Portal/Lecturer/LMS/Announcements/AnnouncementsHeader";
import AnnouncementList from "@/components/Portal/Lecturer/LMS/Announcements/AnnouncementList";
import AnnouncementForm from "@/components/Portal/Lecturer/LMS/Announcements/AnnouncementForm";
import DataLoading from "@/components/Generals/DataLoading";
import { useState } from "react";

export default function CourseAnnouncementsPage() {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || "0");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, isLoading, error } = useCourseAnnouncements(courseId);
    const createMutation = useCreateCourseAnnouncement(courseId);

    const handleCreate = (formData: { title: string; content: string }) => {
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

    const { course, announcements, total_announcements } = data;

    return (
        <Stack gap="20px">
            <AnnouncementsHeader
                title={`${course.code} - Announcements`}
                subtitle={`${total_announcements} announcements • ${course.title}`}
                showBackButton={true}
                backPath={`/portal/lecturer/lms/course/${courseId}`}
                showCreateButton={true}
                onCreateClick={() => setIsDialogOpen(true)}
                breadcrumbItems={[
                    { label: "LMS", path: "/portal/lecturer/lms" },
                    { label: course.code, path: `/portal/lecturer/lms/course/${courseId}` },
                    { label: "Announcements", path: "" },
                ]}
            />

            <AnnouncementForm
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleCreate}
                isLoading={createMutation.isPending}
            />

            <Box
                bg="white"
                border="1px solid"
                borderColor="border"
                rounded="xl"
                p="20px"
            >
                <Text fontSize="lg" fontWeight={400} mb={4}>
                    Course Announcements ({total_announcements})
                </Text>
                <AnnouncementList
                    announcements={announcements}
                    emptyMessage="No announcements for this course yet. Create one to get started."
                />
            </Box>
        </Stack>
    );
}

