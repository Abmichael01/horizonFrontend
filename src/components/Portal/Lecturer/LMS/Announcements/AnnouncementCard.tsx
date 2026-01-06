import { Box, Text, VStack, HStack, Badge, Flex } from "@chakra-ui/react";
import { TbBell, TbCalendar, TbUser } from "react-icons/tb";
import { Announcement } from "@/types";

interface AnnouncementCardProps {
    announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Box
            border="1px solid"
            borderColor="border"
            rounded="lg"
            p="16px"
            bg="white"
            transition="all 0.2s"
            _hover={{
                shadow: "md",
            }}
        >
            <VStack align="stretch" gap={3}>
                {/* Header */}
                <Flex justify="space-between" align="start" gap={2}>
                    <HStack gap={2} flex={1}>
                        <TbBell fontSize="20px" color="var(--chakra-colors-primary-500)" />
                        <Text fontWeight={500} fontSize="md" color="gray.800">
                            {announcement.title}
                        </Text>
                    </HStack>
                    {announcement.course && (
                        <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                            {announcement.course.code}
                        </Badge>
                    )}
                    {announcement.is_general && (
                        <Badge colorScheme="green" variant="subtle" fontSize="xs">
                            General
                        </Badge>
                    )}
                </Flex>

                {/* Content */}
                <Text fontSize="sm" color="gray.700" lineHeight="1.6" whiteSpace="pre-wrap">
                    {announcement.content}
                </Text>

                {/* Footer */}
                <Box borderTop="1px solid" borderColor="border" pt={2}>
                    <HStack justify="space-between" fontSize="xs" color="gray.600">
                        <HStack gap={4}>
                            <HStack gap={1}>
                                <TbUser fontSize="14px" />
                                <Text>
                                    {typeof announcement.created_by === 'object' 
                                        ? announcement.created_by.full_name 
                                        : announcement.created_by}
                                </Text>
                            </HStack>
                            <HStack gap={1}>
                                <TbCalendar fontSize="14px" />
                                <Text>{formatDate(announcement.created_at)}</Text>
                            </HStack>
                        </HStack>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
}


