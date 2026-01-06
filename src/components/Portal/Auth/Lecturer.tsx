import { Button, Field, Fieldset, Input, Stack, Portal, Select, createListCollection, ListCollection, Spinner, Center, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getCreateUserData } from "@/api/apiEndpoints";
import { CreateUser } from "@/types";
import { toaster } from "@/components/ui/toaster";
import errorMessage from "@/lib/errorMessage";
import { Link, useNavigate } from "react-router";

// For chakra select collection, define the array inside createListCollection itself

// Zod schema for validation
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
    defaultValues: {
      email: "",
      password: "",
      department: "",
      specialization: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["create-user-data"],
    queryFn: getCreateUserData
  })

  // Dynamically create department collection from API data if available
  const departmentCollection = data?.departments
    ? createListCollection({
        items: data.departments.map((dept) => ({
          value: String(dept.id),
          label: dept.name,
        })),
      })
    : undefined;

  const navigate = useNavigate()
  
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<CreateUser>) => createUser(data),
    onSuccess: () => {
      toaster.create({
        description: "User Account Created",
        type: "success"
      })
      navigate("/portal/login")
    },
    onError: (error: Error) => {
      console.log(error)
      toaster.create({
        description: errorMessage(error),
        type: "error"
      })
    }
  })


  const onSubmit = (data: FormData) => {
    // You can handle the form submission here
    const formData = { 
      ...data, 
      user_type: "lecturer",
      department: parseInt(data.department)
    }
    console.log(formData)
    mutate(formData)
  };

  // Show loading spinner while fetching create user data
  if (isLoading) {
    return (
      <Center minH="300px">
        <Spinner size="xl" color="primary.dark" />
      </Center>
    );
  }

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack textAlign="center">
        <Fieldset.Legend>Create Lecturer Account</Fieldset.Legend>
        <Fieldset.HelperText>Fill in your details</Fieldset.HelperText>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spaceY="20px">
          <Fieldset.Content>
            {/* Email */}
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input {...register("email")} type="email" />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            {/* Password */}
            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <Input {...register("password")} type="password" />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            {/* Full Name */}
            <Field.Root invalid={!!errors.full_name}>
              <Field.Label>Full Name</Field.Label>
              <Input {...register("full_name")} />
              <Field.ErrorText>{errors.full_name?.message}</Field.ErrorText>
            </Field.Root>

            {/* Phone */}
            <Field.Root invalid={!!errors.phone}>
              <Field.Label>Phone Number</Field.Label>
              <Input {...register("phone")} />
              <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
            </Field.Root>

            {/* Department */}
            <Field.Root invalid={!!errors.department}>
              <Field.Label>Department</Field.Label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    collection={departmentCollection as ListCollection}
                    size="sm"
                    width="100%"
                  >
                    <Select.HiddenSelect
                      name={field.name}
                      value={field.value}
                      onChange={e => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select department" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {departmentCollection?.items.map((dept) => {
                            const d = dept as { value: string; label: string };
                            return (
                              <Select.Item item={d} key={d.value}>
                                {d.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            );
                          })}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.ErrorText>{errors.department?.message}</Field.ErrorText>
            </Field.Root>

            {/* Specialization */}
            <Field.Root invalid={!!errors.specialization}>
              <Field.Label>Specialization</Field.Label>
              <Input {...register("specialization")} />
              <Field.ErrorText>{errors.specialization?.message}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Content>
          <Button
            type="submit"
            alignSelf="flex-start"
            w="full"
            loading={isPending}
            bg="primary.dark"
          >
            Create Account
          </Button>
        <Stack w="full" align="center" mt={2}>
          <Text fontSize={"sm"}>
            Already have an account?{" "}
            <Link  to="/portal/login" style={{ color: "#3182ce", textDecoration: "underline" }}>
              Login
            </Link>
          </Text>
        </Stack>
        </Stack>
      </form>
    </Fieldset.Root>
  );
}
