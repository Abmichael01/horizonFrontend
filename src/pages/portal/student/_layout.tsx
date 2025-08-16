import Navbar from "@/components/Portal/Student/Navbar";
import Sidebar from "@/components/Portal/Student/Sidebar";
import ProctectedRoute from "@/layouts/ProctectedRoute";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <ProctectedRoute>
      <Flex minH={"100vh"}>
        <Sidebar />
        <Flex flex="1" direction={"column"} ml="250px">
          <Navbar />
          <Box bg="gray.50" h="full" p="20px">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </ProctectedRoute>
  );
}
