import { Button, Field, Fieldset, Input, Stack, Portal, Select, createListCollection, Spinner, Center, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getCreateUserData } from "@/api/apiEndpoints";
import { CreateUser } from "@/types";
import { toaster } from "@/components/ui/toaster";
import errorMessage from "@/lib/errorMessage";
import { Link, useNavigate } from "react-router";

// Zod schema for lecturer validation
const schema = z.object({
  email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  full_name: z.string().nonempty("Full name is required"),
  phone: z.string().nonempty("Phone number is required"),
  department: z.string().nonempty("Department is required"),
  specialization: z.string().nonempty("Specialization is required"),
});

type FormData = z.infer<typeof schema>;

export default function Lecturer() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const { data: createUserData, isLoading: isLoadingData } = useQuery({
    queryKey: ["create-user-data"],
    queryFn: getCreateUserData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<CreateUser>) => createUser(data),
    onSuccess: () => {
      toaster.create({
        type: "success",
        description: "Lecturer account created successfully!",
      });
      navigate("/portal/login");
    },
    onError: (error: Error) => {
      toaster.create({
        type: "error",
        description: errorMessage(error),
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const lecturerData: Partial<CreateUser> = {
      user_type: "lecturer",
      email: data.email,
      password: data.password,
      full_name: data.full_name,
      phone: data.phone,
      department: parseInt(data.department),
      specialization: data.specialization,
    };

    mutate(lecturerData);
  };

  if (isLoadingData) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  const departments = createUserData?.departments || [];

  return (
    <Stack spaceY="20px" maxW="500px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Lecturer Registration
      </Text>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Stack spaceY="20px">
            <Field.Root  required invalid={!!errors.email}>
              <Field.Label>Email Address</Field.Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <Field.ErrorText>{errors.email.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <Field.ErrorText>{errors.password.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!errors.full_name}>
              <Field.Label>Full Name</Field.Label>
              <Input
                {...register("full_name")}
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <Field.ErrorText>{errors.full_name.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!errors.phone}>
              <Field.Label>Phone Number</Field.Label>
              <Input
                {...register("phone")}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <Field.ErrorText>{errors.phone.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!errors.department}>
              <Field.Label>Department</Field.Label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    collection={createListCollection({ items: departments.map(dept => ({ label: `${dept.name} (${dept.short})`, value: dept.id.toString() })) })}
                    value={field.value ? [field.value] : []}
                    onValueChange={(e) => field.onChange(e.value[0])}
                  >
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select your department" />
                    </Select.Trigger>
                    <Portal>
                      <Select.Content />
                    </Portal>
                  </Select.Root>
                )}
              />
              {errors.department && (
                <Field.ErrorText>{errors.department.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!errors.specialization}>
              <Field.Label>Specialization</Field.Label>
              <Input
                {...register("specialization")}
                placeholder="e.g., Software Engineering, Data Science, etc."
              />
              {errors.specialization && (
                <Field.ErrorText>{errors.specialization.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Button
              type="submit"
              loading={isPending}
              loadingText="Creating Account..."
              bg="primary.dark"
              color="white"
              _hover={{ bg: "primary.600" }}
              size="lg"
            >
              Create Lecturer Account
            </Button>
          </Stack>
        </Fieldset.Root>
      </form>

      <Text textAlign="center" fontSize="sm" color="gray.600">
        Already have an account?{" "}
        <Link to="/portal/login" style={{ color: "#3182ce", textDecoration: "underline" }}>
          Sign in here
        </Link>
      </Text>
    </Stack>
  );
}
