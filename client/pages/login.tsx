import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useMutation } from "react-query";
import { CtaButton } from "../components/common/cta-button";
import { DividedSegment } from "../components/layout/divided-segment";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import { useAuth } from "../contexts/auth-context";
import { login, LoginMutationData } from "../services/mutations/login";

export default function Login() {
  const auth = useAuth();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<LoginMutationData>();

  const { isLoading, error, mutate } = useMutation(login, {
    onSuccess: async ({ data }) => {
      auth.setToken(data.token);
      auth.setUser(data.user);
      await router.push("/calendar");
    },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    mutate({ email, password });
  });

  return (
    <PageWrapper title="Login">
      <Page>
        <Page.Title>
          <Heading>Login</Heading>
        </Page.Title>
        <Page.Content>
          <DividedSegment>
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaEnvelope} color="green.400" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="simply@shift.com"
                    name="email"
                    ref={register({ required: "This field is required" })}
                  />
                </InputGroup>
                <FormHelperText>
                  {errors.email && errors.email.message} &nbsp;
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaKey} color="green.400" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register({ required: "This field is required" })}
                  />
                </InputGroup>
                <FormHelperText color="red">
                  {errors.password && errors.password.message} &nbsp;
                </FormHelperText>
              </FormControl>

              <CtaButton
                isLoading={isLoading}
                type="submit"
                variant="secondary"
              >
                Sign in
              </CtaButton>
            </form>

            <Image src="/images/illustration-login.svg" />
          </DividedSegment>
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
