import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useMutation } from "react-query";
import { Loading } from "../components/common/loading";
import { ExternalLogin } from "../components/external-login";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import { useAuth } from "../hooks/use-auth";
import { loginMutation, LoginMutationData } from "../mutations/login";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { initialising, user, setUser, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
  } = useForm<LoginMutationData>({
    defaultValues: { stayLoggedIn: false },
  });

  const { isLoading, mutate } = useMutation(loginMutation, {
    onSuccess: async ({ data }) => {
      setToken(data.token);
      setUser(data.user);
      await router.push("/calendar");
    },
  });

  const onSubmit = handleSubmit(async ({ email, password, stayLoggedIn }) => {
    mutate({ email, password, stayLoggedIn });
  });

  useEffect(() => {
    if (!initialising && user) {
      router.push("/calendar");
    }
  }, [initialising, user]);

  if (initialising) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Login">
      <Page simple>
        <Page.Title>
          <Heading>Login</Heading>
        </Page.Title>
        <Page.Content>
          <form onSubmit={onSubmit}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="green.500" />
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

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaKey} color="green.500" />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  ref={register({ required: "This field is required" })}
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
              <FormHelperText color="red">
                {errors.password && errors.password.message} &nbsp;
              </FormHelperText>
            </FormControl>

            <FormControl id="stayLoggedIn">
              <Controller
                control={control}
                name="stayLoggedIn"
                render={({ value, ref }) => (
                  <Checkbox
                    colorScheme="green"
                    onChange={({ target }) => {
                      setValue("stayLoggedIn", target.checked);
                    }}
                    checked={value}
                    ref={ref}
                  >
                    Keep me signed in
                  </Checkbox>
                )}
              />

              <FormHelperText color="red">
                {errors.stayLoggedIn && errors.stayLoggedIn.message} &nbsp;
              </FormHelperText>
            </FormControl>

            <Button
              isLoading={isLoading}
              type="submit"
              variant="primary"
              w="full"
            >
              Sign in
            </Button>

            <Divider my="25px" />

            <ExternalLogin />
          </form>
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
