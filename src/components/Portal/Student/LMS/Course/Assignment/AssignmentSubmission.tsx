import React, { useState } from 'react';
import { Box, Text, VStack, HStack, Button, Textarea, Field, Fieldset } from "@chakra-ui/react";
import { FiUpload, FiCheck } from 'react-icons/fi';

interface AssignmentSubmissionProps {
  assignmentId: number;
  onSubmit: (submissionData: any) => void;
  isSubmitting?: boolean;
  submission?: any;
}

const AssignmentSubmission: React.FC<AssignmentSubmissionProps> = ({
  assignmentId,
  onSubmit,
  isSubmitting = false,
  submission
}) => {
  const [submissionText, setSubmissionText] = useState(submission?.submission_text || '');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = () => {
    const submissionData = {
      submission_text: submissionText,
      files: files
    };
    onSubmit(submissionData);
  };

  const isAlreadySubmitted = submission?.submission_status === 'submitted';

  return (
    <Box>
      <VStack gap={6} align="stretch">

        {/* Submission Status */}
        {isAlreadySubmitted && (
          <Box
            p={4}
            bg="green.50"
            border="1px"
            borderColor="green.200"
            borderRadius="lg"
            color="green.800"
          >
            <HStack gap={2}>
              <FiCheck />
              <Text fontWeight="medium">You have already submitted this assignment.</Text>
            </HStack>
          </Box>
        )}

        {/* Submission Form */}
        <Fieldset.Root>
          <Fieldset.Legend>Submit Assignment</Fieldset.Legend>
          <Fieldset.HelperText>
            Submit your work for this assignment
          </Fieldset.HelperText>
          <Fieldset.Content>
            <VStack gap={4} align="stretch">
              <Field.Root>
                <Field.Label>Submission Text</Field.Label>
                <Textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Enter your submission text here..."
                  rows={8}
                  disabled={isAlreadySubmitted}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Attach Files (Optional)</Field.Label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  disabled={isAlreadySubmitted}
                  style={{
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    width: '100%'
                  }}
                />
              </Field.Root>
            </VStack>
          </Fieldset.Content>
        </Fieldset.Root>

        <HStack justify="flex-end" gap={4}>
          <Button
            colorScheme="blue"
            leftIcon={isAlreadySubmitted ? <FiCheck /> : <FiUpload />}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Submitting..."
            isDisabled={isAlreadySubmitted || !submissionText.trim()}
          >
            {isAlreadySubmitted ? 'Already Submitted' : 'Submit Assignment'}
          </Button>
        </HStack>

        {/* Previous Submission */}
        {submission && (
          <Box
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="border"
          >
            <Text fontWeight="medium" color="gray.700" mb={3}>
              Previous Submission
            </Text>
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" color="gray.600">
                <strong>Status:</strong> {submission.submission_status}
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>Submitted:</strong> {new Date(submission.submitted_at).toLocaleString()}
              </Text>
              {submission.submission_text && (
                <Box
                  border="1px solid"
                  borderColor="border"
                  borderRadius="md"
                  p={3}
                >
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    <strong>Submission Text:</strong>
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    {submission.submission_text}
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default AssignmentSubmission;
