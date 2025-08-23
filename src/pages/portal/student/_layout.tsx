import Navbar from "@/components/Portal/Student/Navbar";
import Sidebar from "@/components/Portal/Student/Sidebar";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <ProtectedRoute>
      <Flex minH={"100vh"}>
        <Sidebar />
        <Flex flex="1" direction={"column"} ml={ {md:"0px", lg:"250px"} } >
          <Navbar />
          <Box bg="gray.50" h="full" p={[ "10px", "20px"]}>
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </ProtectedRoute>
  );
}
