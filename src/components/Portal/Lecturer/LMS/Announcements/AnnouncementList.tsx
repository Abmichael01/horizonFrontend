import { Box, Table, Text, Badge } from "@chakra-ui/react";
import { Announcement } from "@/types";
import NoDataFound from "@/components/Generals/NoDataFound";

interface AnnouncementListProps {
    announcements: Announcement[];
    emptyMessage?: string;
}

export default function AnnouncementList({ 
    announcements, 
    emptyMessage = "No announcements yet." 
}: AnnouncementListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!announcements || announcements.length === 0) {
        return (
            <Box
                bg="white"
                border="1px solid"
                borderColor="border"
                rounded="lg"
                p="40px"
            >
                <NoDataFound text={emptyMessage} />
            </Box>
        );
    }

    return (
        <Box
            border="1px solid"
            borderColor="border"
            rounded="lg"
            overflow="hidden"
            w="100%"
        >
            <Box
                overflowX="auto"
                w="100%"
                css={{
                    '&::-webkit-scrollbar': {
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#c1c1c1',
                        borderRadius: '10px',
                        '&:hover': {
                            background: '#a8a8a8',
                        },
                    },
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#c1c1c1 #f1f1f1',
                }}
            >
                <Table.Root size="sm" variant="outline" minW="900px" rounded="lg">
                <Table.Header bg="gray.50">
                    <Table.Row>
                        <Table.ColumnHeader>Title</Table.ColumnHeader>
                        <Table.ColumnHeader>Content</Table.ColumnHeader>
                        <Table.ColumnHeader>Course</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Type</Table.ColumnHeader>
                        <Table.ColumnHeader>Created By</Table.ColumnHeader>
                        <Table.ColumnHeader>Created At</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {announcements.map((announcement) => (
                        <Table.Row key={announcement.id}>
                            <Table.Cell>
                                <Text fontWeight={500} fontSize="sm" color="gray.800">
                                    {announcement.title}
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Text 
                                    fontSize="sm" 
                                    color="gray.700" 
                                    noOfLines={2}
                                    maxW="300px"
                                >
                                    {announcement.content}
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                {announcement.course ? (
                                    <Text fontSize="sm" color="gray.600">
                                        {announcement.course.code}
                                    </Text>
                                ) : (
                                    <Text fontSize="sm" color="gray.400">-</Text>
                                )}
                            </Table.Cell>
                            <Table.Cell textAlign="center">
                                {announcement.is_general ? (
                                    <Badge colorScheme="green" variant="subtle" fontSize="xs">
                                        General
                                    </Badge>
                                ) : (
                                    <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                                        Course
                                    </Badge>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <Text fontSize="sm" color="gray.600">
                                    {typeof announcement.created_by === 'object' 
                                        ? announcement.created_by.full_name 
                                        : announcement.created_by}
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Text fontSize="sm" color="gray.600">
                                    {formatDate(announcement.created_at)}
                                </Text>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            </Box>
        </Box>
    );
}

