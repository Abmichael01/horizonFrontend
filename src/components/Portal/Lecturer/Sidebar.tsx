import Logo from "@/components/Generals/Logo";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuNotebookText } from "react-icons/lu";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { useSidebarStore } from "@/stores/sidebarStore";

const mainNavs = [
  { title: "Dashboard", icon: TbLayoutDashboard, path: "/portal/lecturer" },
  {
    title: "My Courses",
    icon: FaChalkboardTeacher,
    path: "/portal/lecturer/courses",
  },
  { title: "Students", icon: FaUsers, path: "/portal/lecturer/students" },
  { title: "Assignments", icon: LuNotebookText, path: "/portal/lecturer/assignments" },
  { title: "Grades", icon: LuClipboardList, path: "/portal/lecturer/grades" },
  { title: "Calendar", icon: IoCalendarNumberOutline, path: "/portal/lecturer/calendar" },
];

export default function LecturerSidebar() {
  const pathname = useLocation().pathname;
  const { isOpen, toggle } = useSidebarStore();
  return (
    <Box>
      {isOpen && (
        <Box
          pos="fixed"
          inset="0"
          bg="rgba(0,0,0, 0.5)"
          backdropFilter={"blur(10px)"}
          blur={"lg"}
          zIndex="99999"
          onClick={toggle}
        ></Box>
      )}
      <Stack
        w={"250px"}
        pos="fixed"
        left={isOpen ? "0px" : { base: "-300px", lg: "0px" }}
        h="100vh"
        borderRight="1px solid"
        borderColor="border"
        py="20px"
        spaceY="20px"
        transition="left .5s"
        zIndex="999999"
        bg="white"
        display={{ base: "flex", lg: "flex" }}
      >
        <Box scale="0.8">
          <Logo />
        </Box>
        <Flex h="full" direction="column">
          {mainNavs.map((nav, index) => (
            <Link key={index} to={nav.path} onClick={toggle}>
              <Text
                display="flex"
                gap="10px"
                alignItems="center"
                px="30px"
                py="10px"
                bg={pathname === nav.path ? "gray.100" : ""}
                borderRight={pathname === nav.path ? "2px solid" : ""}
                borderRightColor={pathname === nav.path ? "primary.500" : ""}
                color="gray.700"
              >
                <nav.icon fontSize="30px" />
                {nav.title}
              </Text>
            </Link>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
}


