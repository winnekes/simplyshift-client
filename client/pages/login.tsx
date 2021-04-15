import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { DividedSegment } from "../components/divided-segment";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";
import { useAuthContext } from "../contexts/auth-context";
import { api } from "../services/api";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const auth = useAuthContext();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const response = await api.post("login", { email, password });

    auth.setToken(response.data["jwt"]);

    await router.push("/calendar");
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
                  {errors.email && errors.email.message}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaKey} color="brand01.100" />
                  </InputLeftElement>
                  <Input
                    variant="filled"
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register({ required: "This field is required" })}
                  />
                </InputGroup>
                <FormHelperText>
                  {errors.password && errors.password.message}
                </FormHelperText>
              </FormControl>

              <button type="submit">Submit</button>
            </form>

            <Image src="/images/illustration-login.svg" />
          </DividedSegment>
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
