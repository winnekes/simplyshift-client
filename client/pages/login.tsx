import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";
import { api } from "../services/api";
import { PageWrapper } from "../components/page-wrapper";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";

import { FaEnvelope, FaKey } from "react-icons/fa";

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
      <h3>Login</h3>
      <SimpleGrid columns={2} gap={6}>
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

        <img src="/images/illustration-login.svg" />
      </SimpleGrid>
    </PageWrapper>
  );
}