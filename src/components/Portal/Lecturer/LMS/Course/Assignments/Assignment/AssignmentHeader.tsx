import { Flex, Text, Button, Breadcrumb } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TbArrowLeft, TbEdit } from "react-icons/tb";
import { Assignment } from "@/types";

interface AssignmentHeaderProps {
  assignment: Assignment;
  courseId: number;
  assignmentId: string;
}

export default function AssignmentHeader({ assignment, courseId, assignmentId }: AssignmentHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link 
              onClick={() => navigate("/portal/lecturer/lms")}
              cursor="pointer"
            >
              LMS
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link
              onClick={() =>
                navigate(`/portal/lecturer/lms/course/${courseId}`)
              }
              cursor="pointer"
            >
              {assignment.course.code}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link
              onClick={() =>
                navigate(`/portal/lecturer/lms/course/${courseId}/assignments`)
              }
              cursor="pointer"
            >
              Assignments
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>{assignment.title}</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      {/* Header */}
      <Flex justify="space-between" align="center">
        <div>
          <Text fontWeight={500} fontSize={24}>
            {assignment.title}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {assignment.course.code} • {assignment.course.title}
          </Text>
        </div>
        <Flex gap={3}>
          <Button
            variant="outline"
            onClick={() =>
              navigate(`/portal/lecturer/lms/course/${courseId}/assignments`)
            }
          >
            <TbArrowLeft />
            Back to Assignments
          </Button>
          <Button
            bg="primary.500"
            onClick={() =>
              navigate(
                `/portal/lecturer/lms/course/${courseId}/assignments/${assignmentId}/edit`
              )
            }
          >
            <TbEdit />
            Edit Assignment
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
