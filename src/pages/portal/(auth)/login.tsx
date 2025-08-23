import { Alert, Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form"; // Import from React Hook Form
import { z } from "zod"; // Import Zod for validation
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/types";
import { login } from "@/api/apiEndpoints";
import errorMessage from "@/lib/errorMessage";
import { useNavigate } from "@/router";

// Define the validation schema with Zod
const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address") // Email validation
    .nonempty("Email is required"), // Ensure it's not empty
  password: z.string().nonempty("Password is required"), // Ensure it's not empty
});

export default function Login() {
  // Set up React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Hook form validation powered by Zod
  });
  const navigate = useNavigate()

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: () => {
      navigate("/portal/student")
    }
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data); // Handle form data submission here
    mutate(data);
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack textAlign="center">
        <Fieldset.Legend>Welcome Back</Fieldset.Legend>
        <Fieldset.HelperText>Login to continue</Fieldset.HelperText>
      </Stack>

      {error && (
        <Alert.Root status="error" title="This is the alert title">
          <Alert.Indicator />
          <Alert.Title>
            {errorMessage(error)}
          </Alert.Title>
        </Alert.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spaceY="20px">
          <Fieldset.Content>
            {/* Email field */}
            <Field.Root invalid={errors?.email && true}>
              <Field.Label>Email</Field.Label>
              <Input
                {...register("email")} // Register email input
              />
              <Field.ErrorText>{errors?.email?.message}</Field.ErrorText>
            </Field.Root>

            {/* Password field */}
            <Field.Root invalid={errors?.password && true}>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                {...register("password")} // Register email input
              />
              <Field.ErrorText>{errors?.password?.message}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Content>

          <Button
            type="submit"
            alignSelf="flex-start"
            w="full"
            loading={isPending}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Fieldset.Root>
  );
}
