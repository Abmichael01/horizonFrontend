import { Avatar, Flex, Text, Menu, Portal, Button } from "@chakra-ui/react";

export default function Navbar() {
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
          <button className="outline-none" >
            <Avatar.Root cursor={"pointer"}>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
          </button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content rounded="md">
              <Menu.Item value="new-txt">Logout</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}
