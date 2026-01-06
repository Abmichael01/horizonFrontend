import { Button, Field, Input, Stack, Textarea, Dialog, CloseButton, Portal, Select, RadioGroup, Radio, createListCollection } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TbPlus } from "react-icons/tb";
import { Course } from "@/types";

interface AnnouncementFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; content: string; course_id?: number }) => void;
    isLoading?: boolean;
    courses?: Course[];
    allowCourseSelection?: boolean;
}

export default function AnnouncementForm({ 
    isOpen,
    onClose,
    onSubmit, 
    isLoading = false,
    courses = [],
    allowCourseSelection = false,
}: AnnouncementFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [announcementType, setAnnouncementType] = useState<"general" | "course">("general");
    const [selectedCourseId, setSelectedCourseId] = useState<string>("");

    useEffect(() => {
        if (!isOpen) {
            setTitle("");
            setContent("");
            setAnnouncementType("general");
            setSelectedCourseId("");
        }
    }, [isOpen]);

    const courseCollection = createListCollection({
        items: courses.map(course => ({
            value: course.id.toString(),
            label: `${course.code} - ${course.title}`
        }))
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            const data: { title: string; content: string; course_id?: number } = {
                title: title.trim(),
                content: content.trim(),
            };
            
            if (announcementType === "course" && selectedCourseId) {
                data.course_id = parseInt(selectedCourseId);
            }
            
            onSubmit(data);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
            <Portal>
                <Dialog.Backdrop style={{ zIndex: 9999999 }} />
                <Dialog.Positioner style={{ zIndex: 9999999 }}>
                    <Dialog.Content maxW="600px">
                            <Dialog.Header>
                                <Dialog.Title>Create Announcement</Dialog.Title>
                            </Dialog.Header>
                            <form onSubmit={handleSubmit}>
                                <Dialog.Body>
                                    <Stack gap={4}>
                                        {allowCourseSelection && (
                                            <Field.Root>
                                                <Field.Label>Announcement Type</Field.Label>
                                                <RadioGroup.Root
                                                    value={announcementType}
                                                    onValueChange={(details) => {
                                                        const newValue = details.value as "general" | "course";
                                                        setAnnouncementType(newValue);
                                                        if (newValue === "general") {
                                                            setSelectedCourseId("");
                                                        }
                                                    }}
                                                >
                                                    <Stack direction="row" gap={4}>
                                                        <Radio value="general">General</Radio>
                                                        <Radio value="course">Course-Specific</Radio>
                                                    </Stack>
                                                </RadioGroup.Root>
                                            </Field.Root>
                                        )}

                                        {allowCourseSelection && announcementType === "course" && courses.length > 0 && (
                                            <Field.Root>
                                                <Field.Label>Select Course</Field.Label>
                                                <Select.Root
                                                    collection={courseCollection}
                                                    value={selectedCourseId ? [selectedCourseId] : []}
                                                    onValueChange={(e) => {
                                                        setSelectedCourseId(e.value[0] || "");
                                                    }}
                                                >
                                                    <Select.HiddenSelect />
                                                    <Select.Control>
                                                        <Select.Trigger>
                                                            <Select.ValueText placeholder="Select a course" />
                                                        </Select.Trigger>
                                                        <Select.IndicatorGroup>
                                                            <Select.Indicator />
                                                        </Select.IndicatorGroup>
                                                    </Select.Control>
                                                    <Portal>
                                                        <Select.Positioner>
                                                            <Select.Content>
                                                                {courseCollection.items.map((course) => (
                                                                    <Select.Item item={course} key={course.value}>
                                                                        {course.label}
                                                                        <Select.ItemIndicator />
                                                                    </Select.Item>
                                                                ))}
                                                            </Select.Content>
                                                        </Select.Positioner>
                                                    </Portal>
                                                </Select.Root>
                                            </Field.Root>
                                        )}

                                        <Field.Root>
                                            <Field.Label>Title</Field.Label>
                                            <Input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Enter announcement title"
                                                required
                                            />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Content</Field.Label>
                                            <Textarea
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                placeholder="Enter announcement content"
                                                rows={5}
                                                required
                                            />
                                        </Field.Root>
                                    </Stack>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button
                                            variant="outline"
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                    </Dialog.ActionTrigger>
                                    <Button
                                        type="submit"
                                        bg="primary.500"
                                        loading={isLoading}
                                        disabled={
                                            !title.trim() || 
                                            !content.trim() || 
                                            (allowCourseSelection && announcementType === "course" && !selectedCourseId)
                                        }
                                    >
                                        <TbPlus />
                                        Create Announcement
                                    </Button>
                                </Dialog.Footer>
                            </form>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

