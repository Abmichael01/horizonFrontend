import { Flex, Stack, Text, Button, Breadcrumb } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbPlus, TbArrowLeft } from "react-icons/tb";
import React from "react";

interface AnnouncementsHeaderProps {
    title: string;
    subtitle?: string;
    showBackButton?: boolean;
    backPath?: string;
    showCreateButton?: boolean;
    onCreateClick?: () => void;
    breadcrumbItems?: Array<{ label: string; path: string }>;
}

export default function AnnouncementsHeader({
    title,
    subtitle,
    showBackButton = false,
    backPath,
    showCreateButton = false,
    onCreateClick,
    breadcrumbItems = [],
}: AnnouncementsHeaderProps) {
    const navigate = useNavigate();

    return (
        <>
            {/* Breadcrumb Navigation */}
            {breadcrumbItems.length > 0 && (
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        {breadcrumbItems.map((item, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <Breadcrumb.Separator />}
                                <Breadcrumb.Item>
                                    {index === breadcrumbItems.length - 1 ? (
                                        <Breadcrumb.CurrentLink>
                                            {item.label}
                                        </Breadcrumb.CurrentLink>
                                    ) : (
                                        <Breadcrumb.Link
                                            onClick={() => item.path && navigate(item.path)}
                                            cursor="pointer"
                                        >
                                            {item.label}
                                        </Breadcrumb.Link>
                                    )}
                                </Breadcrumb.Item>
                            </React.Fragment>
                        ))}
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            )}

            {/* Header */}
            <Flex justify="space-between" align="center">
                <Stack>
                    <Text fontWeight={500} fontSize={24}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text color="gray.600" fontSize="sm">
                            {subtitle}
                        </Text>
                    )}
                </Stack>
                <Flex gap={2}>
                    {showBackButton && backPath && (
                        <Button
                            variant="outline"
                            onClick={() => navigate(backPath)}
                        >
                            <TbArrowLeft />
                            Back
                        </Button>
                    )}
                    {showCreateButton && onCreateClick && (
                        <Button
                            bg="primary.500"
                            onClick={onCreateClick}
                        >
                            <TbPlus />
                            New Announcement
                        </Button>
                    )}
                </Flex>
            </Flex>
        </>
    );
}

