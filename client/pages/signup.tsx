import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ExternalLogin } from "../components/external-login";
import { DividedSegment } from "../components/layout/divided-segment";
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
  Box,
  Icon,
  Heading,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useAuth } from "../contexts/auth-context";
import {
  signupMutation,
  SignupMutationData,
} from "../services/mutations/signup";

export default function Signup() {
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

  return (
    <PageWrapper title="Sign up">
      <Page>
        <Page.Title>
          <Heading>Sign up for SimplyShift</Heading>
        </Page.Title>
        <Page.Content>
          <DividedSegment>
            <img src="/images/illustration-signup.svg" />

            <Box>
              <form onSubmit={onSubmit}>
                <FormControl isRequired id="email">
                  <FormLabel>Email address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaEnvelope} color="green.400" />
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
                      <Icon as={FaKey} color="green.400" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      ref={register({
                        required: "This field is required",
                        min: 8,
                      })}
                    />
                  </InputGroup>
                  <FormHelperText>
                    {errors.password && errors.password.message}
                  </FormHelperText>
                </FormControl>
                <FormControl isRequired id="passwordRepeated">
                  <FormLabel>Confirm your password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaKey} color="green.400" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      name="passwordRepeated"
                      ref={register({
                        required: "This field is required",
                        min: 8,
                      })}
                    />
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
            </Box>
          </DividedSegment>
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
