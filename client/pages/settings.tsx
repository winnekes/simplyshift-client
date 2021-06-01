import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import { useAuth } from "../contexts/auth-context";
import { SignupMutationData } from "../services/mutations/signup";
import Login from "./login";

// todo optimise usage of arrow functions?
export default function Settings() {
  const { user } = useAuth();
  const { register, errors } = useForm<SignupMutationData>();

  // todo try to handle globally (so we don't have to add this check on every protected page)
  if (!user) {
    return <Login />;
  }

  return (
    <PageWrapper title="Settings" isProtectedPage>
      <Page>
        <Page.Title>
          <Heading>Settings</Heading>
        </Page.Title>
        <Page.Content>
          <Heading as="h3" size="md">
            Change your password
          </Heading>
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
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
