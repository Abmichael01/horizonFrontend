import { getUser } from "@/api/apiEndpoints";
import { useNavigate } from "@/router";
import { Box, BoxProps, Spinner, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function ProtectedRoute({ children, ...rest }: BoxProps) {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  console.log(isError, error)

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data);
    }
  }, [isLoading, data, setUser]);

  useEffect(() => {
    if (!isLoading && isError) {
      logout();
      navigate("/portal/login");
    }
  }, [isError, isLoading, logout, navigate]);

  // Show loading spinner
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // If we have data, render the protected content
  return (
    <Box {...rest}>
      {children}
    </Box>
  );
}
