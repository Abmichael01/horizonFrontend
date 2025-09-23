import { logout } from "@/api/apiEndpoints";
import { useSidebarStore } from "@/stores/sidebarStore";
import {
  Avatar,
  Flex,
  Text,
  Menu,
  Portal,
  Box
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip"

export default function LecturerNavbar() {
  const { isOpen, toggle } = useSidebarStore()
  const { mutate, isPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      window.location.href = "/portal/login";
    },
  });

  return (
    <Flex
      py="20px"
      px={[ "10px", "20px", "40px"]}
      align={"center"}
      justify="space-between"
      borderBottom="1px solid"
      borderBottomColor="border"
      pos="sticky"
      top="0"
      right="0"
    >
      <Box cursor="pointer" onClick={toggle} display={{ base: "block", lg: "none" }} >
        { isOpen ? <Tooltip content="Close Sidebar"><SidebarClose /></Tooltip> : <Tooltip content="Open Sidebar"><SidebarOpen /></Tooltip> }
      </Box>
      <Text>Lecturer Portal</Text>

      <Menu.Root>
        <Menu.Trigger asChild>
          <button className="outline-none">
            <Avatar.Root cursor={"pointer"}>
              <Avatar.Fallback name="Dr. John Smith" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
          </button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content rounded="md">
              <Menu.Item onClick={() => mutate()} value="new-txt">
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      {isPending && (
        <Flex
          pos="fixed"
          top="0"
          right="0"
          w="full"
          h="full"
          zIndex={"9999999"}
          bg="rgba(31,34,40, 0.4)"
          justify={"center"}
          align="center"
        >
          <Flex p="5" bg="rgb(31,34,40)" color="white">
            <Text>Logging Out...</Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}


