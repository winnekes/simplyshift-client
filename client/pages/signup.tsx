import { DividedSegment } from "../components/divided-segment";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Flex,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Signup() {
  const { register, handleSubmit, errors } = useForm<FormData>();
  return (
    <PageWrapper title="Sign up">
      <Page>
        <Page.Title>
          <Heading>Sign up for SimplyShift</Heading>
        </Page.Title>
        <Page.Content>
          <DividedSegment>
            <img src="/images/illustration-signup.svg" />

            <form>
              <FormControl isRequired>
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

              <Flex>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    ref={register({ required: "This field is required" })}
                  />
                  <FormHelperText>
                    {errors.email && errors.email.message}
                  </FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    ref={register({ required: "This field is required" })}
                  />
                  <FormHelperText>
                    {errors.email && errors.email.message}
                  </FormHelperText>
                </FormControl>
              </Flex>

              <FormControl isRequired>
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

              <FormControl isRequired>
                <FormLabel>Confirm your password</FormLabel>
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

              <Button>Setup your calendar now!</Button>
            </form>
          </DividedSegment>
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
