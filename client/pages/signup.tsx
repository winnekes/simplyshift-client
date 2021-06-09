import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { ExternalLogin } from "../components/external-login";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  Heading,
  Stack,
  Divider,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useAuth } from "../hooks/use-auth";
import { signupMutation, SignupMutationData } from "../mutations/signup";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeated, setShowPasswordRepeated] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<SignupMutationData>();

  const { isLoading, mutate } = useMutation(signupMutation, {
    onSuccess: async ({ data }) => {
      auth.setToken(data.token);
      auth.setUser(data.user);

      await router.push("/calendar");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate(data);
  });

  useEffect(() => {
    if (auth.user) {
      router.push("/calendar");
    }
  }, [auth.user]);

  return (
    <PageWrapper title="Sign up">
      <Page simple>
        <Page.Title>
          <Heading>Sign up for SimplyShift</Heading>
        </Page.Title>
        <Page.Content>
          <form onSubmit={onSubmit}>
            <FormControl isRequired id="email">
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="green.500" />
                </InputLeftElement>
                <Input
                  type="email"
                  name="email"
                  placeholder="simply@shift.com"
                  ref={register({
                    required: "This field is required",
                  })}
                />
              </InputGroup>
              <FormHelperText>
                {errors.email && errors.email.message} &nbsp;
              </FormHelperText>
            </FormControl>
            <Stack direction={["column", "row"]} spacing={1}>
              <FormControl isRequired id="firstName">
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  name="firstName"
                  ref={register({
                    required: "This field is required",
                  })}
                />
                <FormHelperText>
                  {errors.firstName && errors.firstName.message}
                </FormHelperText>
              </FormControl>

              <FormControl isRequired id="lastName">
                <FormLabel>Last name</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  ref={register({
                    required: "This field is required",
                  })}
                />
                <FormHelperText>
                  {errors.lastName && errors.lastName.message}
                </FormHelperText>
              </FormControl>
            </Stack>
            <FormControl isRequired id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaKey} color="green.500" />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  ref={register({
                    required: "This field is required",
                    min: 8,
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                {errors.password && errors.password.message}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired id="passwordRepeated">
              <FormLabel>Confirm your password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaKey} color="green.500" />
                </InputLeftElement>
                <Input
                  type={showPasswordRepeated ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="passwordRepeated"
                  ref={register({
                    required: "This field is required",
                    min: 8,
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() =>
                      setShowPasswordRepeated(!showPasswordRepeated)
                    }
                  >
                    {showPasswordRepeated ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                {errors.password && errors.password.message}
              </FormHelperText>
            </FormControl>
            <Button
              w="full"
              isLoading={isLoading}
              variant="primary"
              type="submit"
            >
              Setup your calendar now!
            </Button>
          </form>
          <Divider my="25px" />

          <ExternalLogin />
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
