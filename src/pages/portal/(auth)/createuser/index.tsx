import Student from "@/components/Portal/Auth/Student";
import Lecturer from "@/components/Portal/Auth/Lecturer";
import { Button, Stack, Text } from "@chakra-ui/react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function CreateUser() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const userType = params.get("userType");
  
  return (
    <Stack>
      {userType && (
        <Button
          variant="ghost"
          size="sm"
          alignSelf="flex-start"
          onClick={() => navigate("/portal/createuser")}
          mb={4}
          p={2}
        >
          <ArrowLeft size={16} />
        </Button>
      )}
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
      {userType === "lecturer" && <Lecturer /> }
    </Stack>
  );
}
