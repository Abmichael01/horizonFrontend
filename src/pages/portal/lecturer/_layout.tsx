import LecturerNavbar from "@/components/Portal/Lecturer/Navbar";
import LecturerSidebar from "@/components/Portal/Lecturer/Sidebar";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function LecturerLayout() {
  return (
    <ProtectedRoute>
      <Flex minH={"100vh"}>
        <LecturerSidebar />
        <Flex flex="1" direction={"column"} ml={{ md: "0px", lg: "250px" }}>
          <LecturerNavbar />
          <Box bg="gray.50" h="full" p={["10px", "20px"]}>
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </ProtectedRoute>
  );
}


