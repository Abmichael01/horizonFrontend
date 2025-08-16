import { getUser } from "@/api/apiEndpoints";
import { Box, BoxProps } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";



export default function ProctectedRoute({ children, ...rest }: BoxProps) {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  console.log(data);
  return (
    <Box {...rest} >
      {children}
    </Box>
  );
}
