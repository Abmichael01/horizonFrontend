import Logo from "@/components/Generals/Logo";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuNotebookText } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";

const mainNavs = [
  { title: "Dashboard", icon: TbLayoutDashboard, path: "/portal/student" },
  { title: "Course Registration", icon: FaTasks, path: "/portal/student/course-registration" },
  { title: "Assignments", icon: LuNotebookText, path: "/assignments" },
  { title: "Results", icon: LuClipboardList, path: "/results" },
  { title: "Calendar", icon: IoCalendarNumberOutline, path: "/calendar" },
];

// const additionalNavs = [
//   { title: "Profile", icon: FaUser, path: "/profile" },
//   { title: "Notifications", icon: FaBell, path: "/notifications" },
// ];

export default function Sidebar() {
  const pathname = useLocation().pathname;
  return (
    <Stack
      w="250px"
      pos="fixed"
      h="100vh"
      borderRight="1px solid"
      borderColor="border"
      py="20px"
      spaceY="20px"
    >
      <Box scale="0.8">
        <Logo />
      </Box>
      <Flex h="full" direction="column">
        {mainNavs.map((nav, index) => (
          <Link key={index} to={nav.path}>
            <Text
              display="flex"
              gap="10px"
              alignItems="center"
              px="30px"
              py="10px"
              bg={pathname === nav.path ? "gray.100" : "" }
              borderRight={pathname === nav.path ? "2px solid" : ""}
              borderRightColor={ pathname === nav.path ? "primary.500" : "" }
              color="gray.700"
            >
              <nav.icon fontSize="30px" />
              {nav.title}
            </Text>
          </Link>
        ))}
      </Flex>
    </Stack>
  );
}
