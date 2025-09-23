import { StudentOverview, StudentProfile } from "@/types";
import { Flex, Box, Text, Grid, Avatar, Separator } from "@chakra-ui/react";

interface Props {
  data: StudentOverview;
}

export default function Overview({ data }: Props) {
  const studentData = [
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
      title: "CGPA",
      value: data?.student_profile.cgpa,
      icon: "🎓",
      color: "primary.dark",
    },
    // { title: "Total Credits Completed", value: "80", icon: "📘", color: "yellow.500" },
  ];

  const student = data?.student_profile as StudentProfile;

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
            <Avatar.Fallback name="Oyekola Micheal" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Separator
            h="30px"
            w="1px"
            border={"1px solid"}
            borderColor={"border"}
          />
          <Box>
            <Text fontSize="lg">{student?.full_name}</Text>
            <Text fontSize="lg">{student?.user.email}</Text>
            <Text fontSize="lg">{student?.phone}</Text>
          </Box>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">DOB</Text>
          <Text fontSize="sm">{student?.dob}</Text>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">Faculty</Text>
          <Text fontSize="sm">
            {student?.department.faculty.name} (
            {student?.department.faculty.short})
          </Text>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">Department</Text>
          <Text fontSize="sm">
            {student?.department.name} ({student?.department.short})
          </Text>
        </Flex>
        <Flex justify="space-between" align="center" py="15px">
          <Text fontSize="sm">Level</Text>
          <Text fontSize="sm">{student?.level}</Text>
        </Flex>
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={5}>
        {studentData.map((data, index) => (
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
              {/* <Box w="16px" h="16px" bg={data.color} rounded="full" /> */}
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
