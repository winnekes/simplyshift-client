import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { CtaButton } from "../components/common/cta-button";
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
  Icon,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useAuth } from "../contexts/auth-context";
import { signup, SignupMutationData } from "../services/mutations/signup";

export default function Signup() {
  const auth = useAuth();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<SignupMutationData>();

  const { isLoading, error, mutate } = useMutation(signup, {
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

            <form onSubmit={onSubmit}>
              <FormControl isRequired>
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
                <FormControl isRequired>
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

                <FormControl isRequired>
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
              <FormControl isRequired>
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

              <FormControl isRequired>
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

              <CtaButton isLoading={isLoading} variant="primary" type="submit">
                Setup your calendar now!
              </CtaButton>
            </form>
          </DividedSegment>
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
