import { Grid, Text, Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbUsers, TbClipboardList, TbBell, TbCheck, TbUserCheck, TbChartBar, TbChevronRight } from "react-icons/tb";

interface ManagementNavigationProps {
    courseId: number;
}

export default function ManagementNavigation({ courseId }: ManagementNavigationProps) {
    const navigate = useNavigate();

    const managementCards = [
        {
            title: "Students",
            description: "View enrolled students",
            icon: TbUsers,
            color: "purple.500",
            iconBg: "purple.50",
            path: `/portal/lecturer/lms/course/${courseId}/students`,
        },
        {
            title: "Assignments",
            description: "Create and manage course assignments",
            icon: TbClipboardList,
            color: "blue.500",
            iconBg: "blue.50",
            path: `/portal/lecturer/lms/course/${courseId}/assignments`,
        },
        {
            title: "Grades",
            description: "View and manage student grades",
            icon: TbCheck,
            color: "green.500",
            iconBg: "green.50",
            path: `/portal/lecturer/lms/course/${courseId}/grades`,
        },
        {
            title: "Announcements",
            description: "Post course announcements",
            icon: TbBell,
            color: "orange.500",
            iconBg: "orange.50",
            path: `/portal/lecturer/lms/course/${courseId}/announcements`,
        },
        {
            title: "Attendance",
            description: "Track student attendance",
            icon: TbUserCheck,
            color: "teal.500",
            iconBg: "teal.50",
            path: `/portal/lecturer/lms/course/${courseId}/attendance`,
        },
        {
            title: "Analytics",
            description: "View course performance analytics",
            icon: TbChartBar,
            color: "indigo.500",
            iconBg: "indigo.50",
            path: `/portal/lecturer/lms/course/${courseId}/analytics`,
        },
    ];

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="border"
            rounded="xl"
            p="20px"
        >
            <Text fontSize="lg" fontWeight={400} mb={6}>
                Course Management
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {managementCards.map((card, index) => (
                    <Box
                        key={index}
                        as="button"
                        border="1px solid"
                        borderColor="border"
                        rounded="lg"
                        p="16px"
                        onClick={() => navigate(card.path)}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{
                            borderColor: card.color,
                            bg: `${card.color}.50`,
                        }}
                    >
                        <Flex align="center" gap={4}>
                            <Box
                                bg={card.iconBg}
                                p="8px"
                                rounded="lg"
                                border="1px solid"
                                borderColor="border"
                            >
                                <card.icon fontSize="20px" color={card.color} />
                            </Box>
                            <Flex direction="column" flex={1} align="flex-start" gap={1} textAlign="left">
                                <Text fontWeight={500} fontSize="sm" color="gray.800" textAlign="left">
                                    {card.title}
                                </Text>
                                <Text fontSize="xs" color="gray.600" textAlign="left">
                                    {card.description}
                                </Text>
                            </Flex>
                            <TbChevronRight fontSize="20px" color="gray.400" />
                        </Flex>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}
