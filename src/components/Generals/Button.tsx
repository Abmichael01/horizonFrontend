import { Box, type BoxProps } from "@chakra-ui/react";

type Props = BoxProps;

export default function Button({ children, ...rest }: Props) {
  return <Box {...rest} >
    {children}
</Box>;
}
