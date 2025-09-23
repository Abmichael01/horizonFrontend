import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";

type Props = FlexProps &  {
    textSize?: number;
    bc?: string
}

export default function BulletTitle({ textSize, children, bc, ...rest }: Props) {
  return (
    <Flex gap="2" align="center" {...rest}>
      <Box w="16px" h="16px" bg={bc ? bc : "primary.dark"} rounded="full" />
      <Text fontSize={textSize && textSize} fontWeight={700} >{children}</Text>
    </Flex>
  );
}
