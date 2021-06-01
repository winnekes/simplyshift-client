import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";
import { useAuth } from "../contexts/auth-context";
import { googleSignUpMutation } from "../services/mutations/signup";

export const ExternalLogin = () => {
  const [error, setError] = useState("");

  const auth = useAuth();
  const router = useRouter();

  const { isLoading: googleIsLoading, mutate: googleSignUp } = useMutation(
    googleSignUpMutation,
    {
      onSuccess: async ({ data }) => {
        auth.setToken(data.token);
        auth.setUser(data.user);

        await router.push("/calendar");
      },
    }
  );

  const handleGoogleResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in response && response.tokenId) {
      return googleSignUp({ tokenId: response.tokenId });
    }

    setError("Something went wrong. Please try again later.");
  };

  // TODO Facebook login

  const handleGoogleError = () => {
    setError("Something went wrong. Try again later.");
  };

  const handleGoogleRequest = () => {
    setError("");
  };

  return (
    <VStack>
      <GoogleLogin
        render={(renderProps) => (
          <Button
            w="full"
            variant="outline"
            leftIcon={<FcGoogle />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            isLoading={googleIsLoading}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        )}
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onSuccess={handleGoogleResponse}
        onRequest={handleGoogleRequest}
        onFailure={handleGoogleError}
        cookiePolicy="single_host_origin"
      />
      {error && (
        <Alert status="error" variant="left-accent">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {/*<FacebookLogin*/}
      {/*  appId="1088597931155576"*/}
      {/*  autoLoad={true}*/}
      {/*  fields="name,email,picture"*/}
      {/*  render={(renderProps) => (*/}
      {/*    <Button*/}
      {/*      w="full"*/}
      {/*      colorScheme="facebook"*/}
      {/*      leftIcon={<FaFacebook />}*/}
      {/*      onClick={renderProps.onClick}*/}
      {/*      disabled={renderProps.disabled}*/}
      {/*      loading={renderProps.isProcessing}*/}
      {/*    >*/}
      {/*      <Center>*/}
      {/*        <Text>Continue with Facebook</Text>*/}
      {/*      </Center>*/}
      {/*    </Button>*/}
      {/*  )}*/}
      {/*  callback={handleFacebookResponse}*/}
      {/*/>*/}
    </VStack>
  );
};
