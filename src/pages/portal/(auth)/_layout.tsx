import Logo from "@/components/Generals/Logo";
import { AbsoluteCenter, Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";


export default function Layout() {
  return (
    <AbsoluteCenter>
        <Flex flexDir="column" align={"center"} gap="30px"  >
            <Logo />
            <Box p="30px" px="30px" rounded="10px" border="1px solid" borderColor={"border"} minW="450px">
                <Outlet />
            </Box>
        </Flex>
    </AbsoluteCenter>
  )
}
