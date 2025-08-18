import { getUser } from "@/api/apiEndpoints";
import { Navigate, useNavigate } from "@/router";
import { Box, BoxProps } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";



export default function ProctectedRoute({ children, ...rest }: BoxProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const navigate = useNavigate()

  useEffect(() => {
    if(isError && !isLoading) {
      navigate("/portal/login")
    }
  }, [isError, isLoading, navigate])
  

  if(isLoading) return <p>Is Loading...</p>

  if(isError) return <Navigate to="/portal/login" />

  console.log(data);
  return (
    <Box {...rest} >
      {children}
    </Box>
  );
}
