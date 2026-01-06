import { Box, Flex, Button, Field, Fieldset, Input, Textarea, Stack, Text, Select, Portal, createListCollection } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TbDeviceFloppy, TbEye } from "react-icons/tb";

const assignmentSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title too long"),
    description: z.string().min(1, "Description is required"),
    assignment_type: z.enum(['text', 'file', 'url', 'mixed']),
    max_points: z.number().min(1, "Points must be at least 1").max(1000, "Points too high"),
    due_date: z.string().min(1, "Due date is required"),
    is_published: z.boolean(),
});

type AssignmentFormData = z.infer<typeof assignmentSchema>;

const assignmentTypes = createListCollection({
    items: [
        { label: "Text Submission", value: "text" },
        { label: "File Upload", value: "file" },
        { label: "URL Submission", value: "url" },
        { label: "Mixed (Text + File)", value: "mixed" },
    ],
});

interface AssignmentFormProps {
    onSubmit: (data: AssignmentFormData) => void;
    isLoading: boolean;
    defaultValues?: AssignmentFormData;
}

export default function AssignmentForm({ onSubmit, isLoading, defaultValues }: AssignmentFormProps) {
    const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm<AssignmentFormData>({
        resolver: zodResolver(assignmentSchema),
        defaultValues: defaultValues || {
            assignment_type: 'text' as const,
            max_points: 100,
            is_published: false,
        }
    });

    const assignmentType = watch('assignment_type');

    // Handle Select change and trigger validation
    const handleSelectChange = (e: any) => {
        const value = e.value[0];
        setValue('assignment_type', value as any);
        trigger('assignment_type'); // Trigger validation
    };

    // Handle form submission with debugging
    const handleFormSubmit = (data: AssignmentFormData) => {
        console.log('Form submitted with data:', data);
        onSubmit(data);
    };

    // Debug form state
    console.log('Form errors:', errors);
    console.log('Form values:', watch());

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="border"
            rounded="xl"
            p="20px"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack spaceY="20px">
                    <Fieldset.Root>
                        <Fieldset.Legend>Assignment Details</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Provide the basic information for your assignment
                        </Fieldset.HelperText>
                        <Fieldset.Content>
                            <Field.Root invalid={!!errors.title}>
                                <Field.Label>Assignment Title *</Field.Label>
                                <Input
                                    {...register('title')}
                                    placeholder="Enter assignment title"
                                />
                                {errors.title && (
                                    <Field.ErrorText>{errors.title.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Field.Root invalid={!!errors.assignment_type}>
                                <Field.Label>Assignment Type *</Field.Label>
                                <Select.Root
                                    collection={assignmentTypes}
                                    value={[assignmentType]}
                                    onValueChange={handleSelectChange}
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select assignment type" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {assignmentTypes.items.map((type) => (
                                                    <Select.Item item={type} key={type.value}>
                                                        {type.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                                {errors.assignment_type && (
                                    <Field.ErrorText>{errors.assignment_type.message}</Field.ErrorText>
                                )}
                            </Field.Root>

                            <Flex gap={4}>
                                <Field.Root flex="1" invalid={!!errors.max_points}>
                                    <Field.Label>Maximum Points *</Field.Label>
                                    <Input
                                        {...register('max_points', { valueAsNumber: true })}
                                        type="number"
                                        min="1"
                                        max="1000"
                                        placeholder="100"
                                    />
                                    {errors.max_points && (
                                        <Field.ErrorText>{errors.max_points.message}</Field.ErrorText>
                                    )}
                                </Field.Root>

                                <Field.Root flex="1" invalid={!!errors.due_date}>
                                    <Field.Label>Due Date *</Field.Label>
                                    <Input
                                        {...register('due_date')}
                                        type="datetime-local"
                                    />
                                    {errors.due_date && (
                                        <Field.ErrorText>{errors.due_date.message}</Field.ErrorText>
                                    )}
                                </Field.Root>
                            </Flex>

                            <Field.Root invalid={!!errors.description}>
                                <Field.Label>Assignment Description *</Field.Label>
                                <Textarea
                                    {...register('description')}
                                    placeholder="Provide detailed instructions for the assignment..."
                                    rows={6}
                                />
                                {errors.description && (
                                    <Field.ErrorText>{errors.description.message}</Field.ErrorText>
                                )}
                            </Field.Root>
                        </Fieldset.Content>
                    </Fieldset.Root>

                    <Fieldset.Root>
                        <Fieldset.Legend>Publishing Options</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Choose when to make this assignment available to students
                        </Fieldset.HelperText>
                        <Fieldset.Content>
                            <Field.Root>
                                <Flex align="center" gap={3}>
                                    <input
                                        {...register('is_published')}
                                        type="checkbox"
                                        id="is_published"
                                    />
                                    <label htmlFor="is_published">
                                        <Text fontSize="sm" color="gray.700">
                                            Publish assignment immediately
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            Students will be able to see and submit to this assignment
                                        </Text>
                                    </label>
                                </Flex>
                            </Field.Root>
                        </Fieldset.Content>
                    </Fieldset.Root>

                    {/* Form Actions */}
                    <Flex justify="space-between" align="center" pt={4} borderTop="1px solid" borderColor="border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                // TODO: Navigate back
                                console.log('Cancel');
                            }}
                        >
                            Cancel
                        </Button>
                        <Flex gap={3}>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    // Test form validation
                                    console.log('Testing form validation...');
                                    trigger().then((isValid) => {
                                        console.log('Form is valid:', isValid);
                                        console.log('Current errors:', errors);
                                        console.log('Current values:', watch());
                                    });
                                }}
                            >
                                Test Validation
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    // TODO: Preview assignment
                                    console.log('Preview assignment');
                                }}
                            >
                                <TbEye />
                                Preview
                            </Button>
                            <Button
                                type="submit"
                                bg="primary.500"
                                loading={isLoading}
                            >
                                <TbDeviceFloppy />
                                {isLoading ? "Creating..." : "Create Assignment"}
                            </Button>
                        </Flex>
                    </Flex>
                </Stack>
            </form>
        </Box>
    );
}
