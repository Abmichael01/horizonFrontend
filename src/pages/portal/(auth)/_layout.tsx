import Logo from "@/components/Generals/Logo";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";


export default function Layout() {
  return (
    <Flex align="center" justify="center" minH={"100vh"} py={"40px"}>
        <Flex flexDir="column" align={"center"} gap="30px"  >
            <Logo />
            <Box p="30px" px="30px" rounded="10px" border="1px solid" borderColor={"border"} minW="450px">
                <Outlet />
            </Box>
        </Flex>
    </Flex>
  )
}
