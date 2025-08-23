import Student from "@/components/Portal/Auth/Student";
import { Button, Stack, Text } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router";

export default function CreateUser() {
  const [params] = useSearchParams();
  const userType = params.get("userType");
  return (
    <Stack>
      {!userType && (
        <Stack spaceY={"15px"} align={"center"}>
          <Text textAlign="center">Select Account Type</Text>
          <Link to="?userType=student" className="w-[95%]">
            <Button w="full">Student</Button>
          </Link>
          <Link to="?userType=lecturer" className="w-[95%]">
            <Button w="full">Lecturer</Button>
          </Link>
        </Stack>
      )}
      {userType === "student" && <Student /> }
    </Stack>
  );
}
