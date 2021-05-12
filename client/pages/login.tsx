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
import { DividedSegment } from "../components/divided-segment";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";
import { login, LoginMutationData } from "../services/mutations/login";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<LoginMutationData>();

  const { isLoading, error, mutate } = useMutation(login, {
    onSuccess: async ({ data }) => {
      window.localStorage.setItem("token", data["jwt"]);
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
                    <Icon as={FaEnvelope} color="brand01.100" />
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
                    <Icon as={FaKey} color="brand01.100" />
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

              <Button isLoading={isLoading} type="submit" variant="secondary">
                Submit
              </Button>
            </form>

            <Image src="/images/illustration-login.svg" />
          </DividedSegment>
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
