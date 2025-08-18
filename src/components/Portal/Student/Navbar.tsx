import { logout } from "@/api/apiEndpoints";
import { useNavigate } from "@/router";
import {
  Avatar,
  Flex,
  Text,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export default function Navbar() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate("/portal/login");
    },
  });

  return (
    <Flex
      py="20px"
      px="40px"
      align={"center"}
      justify="space-between"
      borderBottom="1px solid"
      borderBottomColor="border"
      pos="sticky"
      top="0"
      right="0"
    >
      <Text>Hey</Text>

      <Menu.Root>
        <Menu.Trigger asChild>
          <button className="outline-none">
            <Avatar.Root cursor={"pointer"}>
              <Avatar.Fallback name="Segun Adebayo" />
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
