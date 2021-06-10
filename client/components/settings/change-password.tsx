import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { useMutation } from "react-query";
import {
  changePasswordMutation,
  ChangePasswordData,
} from "../../mutations/change-password";

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeated, setShowPasswordRepeated] = useState(false);

  const { isLoading, mutate } = useMutation(changePasswordMutation, {
    onSuccess: async () => {},
  });

  const { register, errors, handleSubmit } = useForm<ChangePasswordData>();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <>
      <Heading as="h3" size="md" mb={5}>
        Change your password
      </Heading>

      <form onSubmit={onSubmit}>
        <Stack spacing={5}>
          <FormControl isRequired>
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
              Min. 8 characters <br />
              {errors.password && errors.password.message}
            </FormHelperText>
          </FormControl>
          <FormControl isRequired>
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
                  onClick={() => setShowPasswordRepeated(!showPasswordRepeated)}
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
            isLoading={isLoading}
            type="submit"
            variant="primary"
            w="full"
          >
            Save new password
          </Button>
        </Stack>
      </form>
    </>
  );
};
