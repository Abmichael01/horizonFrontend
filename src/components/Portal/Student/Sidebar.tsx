import Logo from "@/components/Generals/Logo";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { TbLayoutDashboard, TbSchool, TbChevronDown, TbChevronRight } from "react-icons/tb";
import { LuNotebookText } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { TbBell } from "react-icons/tb";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useState } from "react";

const mainNavs = [
  { title: "Dashboard", icon: TbLayoutDashboard, path: "/portal/student" },
  {
    title: "Course Registration",
    icon: FaTasks,
    path: "/portal/student/course-registration",
  },
];

const lmsSubNavs = [
  { title: "Overview", icon: TbSchool, path: "/portal/student/lms" },
  { title: "Assignments", icon: LuNotebookText, path: "/portal/student/lms/assignments" },
  { title: "Grades", icon: LuClipboardList, path: "/portal/student/lms/grades" },
  { title: "Announcements", icon: TbBell, path: "/portal/student/lms/announcements" },
];

// const additionalNavs = [
//   { title: "Profile", icon: FaUser, path: "/profile" },
//   { title: "Notifications", icon: FaBell, path: "/notifications" },
// ];

export default function Sidebar() {
  const pathname = useLocation().pathname;
  const { isOpen, toggle } = useSidebarStore();
  const [isLmsOpen, setIsLmsOpen] = useState(false);
  
  // Check if current path is under LMS
  const isLmsPath = pathname.startsWith('/portal/student/lms');
  
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
          display={{ base: "block", lg: "none" }}
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
                userSelect="none"
              >
                <nav.icon fontSize="30px" />
                {nav.title}
              </Text>
            </Link>
          ))}
          
          {/* LMS Dropdown */}
          <Box>
            <Flex
              gap="10px"
              alignItems="center"
              px="30px"
              py="10px"
              color="gray.700"
              cursor="pointer"
              onClick={() => setIsLmsOpen(!isLmsOpen)}
              userSelect={"none"}
            >
              <TbSchool fontSize="30px" />
              <Text flex="1">LMS</Text>
              {isLmsOpen ? (
                <TbChevronDown fontSize="20px" />
              ) : (
                <TbChevronRight fontSize="20px" />
              )}
            </Flex>
            
            {isLmsOpen && (
              <Stack gap="1" ml="6">
                {lmsSubNavs.map((nav, index) => (
                  <Link key={index} to={nav.path} onClick={toggle}>
                    <Text
                      display="flex"
                      gap="10px"
                      alignItems="center"
                      px="20px"
                      py="8px"
                      bg={pathname === nav.path ? "gray.100" : ""}
                      borderRight={pathname === nav.path ? "2px solid" : ""}
                      borderRightColor={pathname === nav.path ? "primary.500" : ""}
                      color="gray.600"
                      fontSize="sm"
                      userSelect={"none"}
                    >
                      <nav.icon fontSize="20px" />
                      {nav.title}
                    </Text>
                  </Link>
                ))}
              </Stack>
            )}
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
