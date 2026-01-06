import { LecturerOverview as LecturerOverviewType, LecturerProfile } from "@/types";
import { Flex, Box, Text, Grid, Avatar, Separator } from "@chakra-ui/react";

interface Props {
  data?: LecturerOverviewType;
}

export default function LecturerOverview({ data }: Props) {
  const lecturerData = [
    {
      title: "Current Session",
      value: data?.current_academic_session.session_name,
      icon: "📅",
      color: "primary.dark",
    },
    {
      title: "Current Semester",
      value: data?.current_semester,
      icon: "📅",
      color: "primary.dark",
    },
    {
      title: "Total Courses",
      value: data?.total_courses,
      icon: "📚",
      color: "primary.dark",
    },
    {
      title: "Total Students",
      value: data?.total_students,
      icon: "👥",
      color: "primary.dark",
    },
  ];

  const lecturer = data?.lecturer_profile as LecturerProfile;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={5}>
      <Box
        bg="white"
        border="1px solid"
        borderColor={"border"}
        rounded="xl"
        p="20px"
        pb="30px"
        divideY="1px"
      >
        <Flex gap={3} py="15px" align="center">
          <Avatar.Root cursor={"pointer"} w="100px" h="100px">
            <Avatar.Fallback name="Dr. John Smith" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Separator
            h="30px"
            w="1px"
            border={"1px solid"}
            borderColor={"border"}
          />
          <Box>
            <Text fontSize="lg">{lecturer?.full_name}</Text>
            <Text fontSize="lg">{lecturer?.user.email}</Text>
            <Text fontSize="lg">{lecturer?.phone}</Text>
          </Box>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">Staff ID</Text>
          <Text fontSize="sm">{lecturer?.staff_id}</Text>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">Faculty</Text>
          <Text fontSize="sm">
            {lecturer?.department.faculty.name} (
            {lecturer?.department.faculty.short})
          </Text>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">Department</Text>
          <Text fontSize="sm">
            {lecturer?.department.name} ({lecturer?.department.short})
          </Text>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">Specialization</Text>
          <Text fontSize="sm">{lecturer?.specialization}</Text>
        </Flex>
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={5}>
        {lecturerData.map((data, index) => (
          <Flex
            key={index}
            bg="white"
            border="1px solid"
            borderColor={"border"}
            rounded="xl"
            p="20px"
            pb="30px"
            justify={"space-between"}
            align="center"
          >
            <Flex gap="2" align="center">
              <Text>{data.title}</Text>
            </Flex>
            <Text
              fontWeight={500}
              color={data.color}
              fontSize={20}
              textAlign={"center"}
            >
              {data.value}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Grid>
  );
}
