import { Box, Button, Flex } from "@chakra-ui/react";
import XPadding from "../../Generals/XPadding";
import Logo from "../../Generals/Logo";
import DropDown from "./DropDown";
import DropDownMobile from "./DropDownMobile";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";

interface NavData {
  title: string;
  url: string;
  subUrls: {
    name: string;
    url: string;
  }[];
}

const navData: NavData[] = [
  {
    title: "About Us",
    url: "/about-us",
    subUrls: [
      {
        name: "Mission & Vision",
        url: "/about-us/mission-vision",
      },
      {
        name: "History",
        url: "/about-us/history",
      },
      {
        name: "Our Team",
        url: "/about-us/our-team",
      },
      {
        name: "Campus & Facilities",
        url: "/about-us/campus-facilities",
      },
      {
        name: "Accreditation",
        url: "/about-us/accreditation",
      },
    ],
  },
  {
    title: "Staff",
    url: "/staff",
    subUrls: [
      {
        name: "Faculty",
        url: "/staff/faculty",
      },
      {
        name: "Administration",
        url: "/staff/administration",
      },
    ],
  },
  {
    title: "Admission",
    url: "/admission",
    subUrls: [
      {
        name: "How to Apply",
        url: "/admission/how-to-apply",
      },
      {
        name: "Scholarships",
        url: "/admission/scholarships",
      },
      {
        name: "Tuition Fees",
        url: "/admission/tuition-fees",
      },
      {
        name: "Requirements",
        url: "/admission/requirements",
      },
      {
        name: "Application Deadlines",
        url: "/admission/application-deadlines",
      },
    ],
  },
  {
    title: "E-Portals",
    url: "/e-portals",
    subUrls: [
      {
        name: "Student Portal",
        url: "/e-portals/student",
      },
      {
        name: "Staff Portal",
        url: "/e-portals/staff",
      },
    ],
  },
  {
    title: "Events",
    url: "/events",
    subUrls: [
      {
        name: "Upcoming Events",
        url: "/events/upcoming",
      },
      {
        name: "Past Events",
        url: "/events/past",
      },
    ],
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    subUrls: [
      {
        name: "Email Us",
        url: "/contact-us/email",
      },
      {
        name: "Location",
        url: "/contact-us/location",
      },
    ],
  },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <XPadding
      display="flex"
      alignItems={"center"}
      justifyContent="space-between"
      py="5"
      borderBottom={"1px solid"}
      borderBottomColor={"gray.200"}
      zIndex={99999}
      pos="relative"
    >
      <Logo />
      <Flex gap={8} align={"center"} display={{ base: "none", lg: "flex" }}>
        {navData.map((nav, index) => (
          <div key={index}>
            <DropDown data={nav} />
          </div>
        ))}
        <Button>login</Button>
      </Flex>
      <Box
        onClick={() => setOpenMenu((prev) => !prev)}
        fontSize={40}
        color={"secondary.dark"}
        cursor={"pointer"}
        display={{ base: "block", lg: "none" }}
      >
        {!openMenu ? <MenuIcon className="size-[30px]" /> : <X />}
      </Box>
      <Flex
        direction="column"
        bg="white"
        pos="absolute"
        right={openMenu ? "0px" : "-100%"}
        top="100%"
        // h="100vh"
        w="full"
        zIndex={999}
        display={{ base: "flex", lg: "none" }}
        p={5}
        className="-right-full"
        transition={"right .4s ease-in-out"}
      >
        {navData.map((nav, index) => (
          <div key={index}>
            <DropDownMobile data={nav} />
          </div>
        ))}
        <Button>login</Button>
      </Flex>
    </XPadding>
  );
}
