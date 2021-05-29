import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";
import { useAuth } from "../contexts/auth-context";
import { googleSignUpMutation } from "../services/mutations/signup";

export const ExternalLogin = () => {
  const auth = useAuth();
  const router = useRouter();

  const {
    isLoading: googleIsLoading,
    error: googleError,
    mutate: googleSignUp,
  } = useMutation(googleSignUpMutation, {
    onSuccess: async ({ data }) => {
      auth.setToken(data.token);
      auth.setUser(data.user);

      await router.push("/calendar");
    },
  });

  const handleGoogleResponse = (response: GoogleLoginResponse) => {
    googleSignUp({ tokenId: response.tokenId });
  };

  // todo facebook login
  const handleFacebookResponse = (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    console.log(response);
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
        onFailure={(e) => {
          console.log({ e });
        }}
        cookiePolicy="single_host_origin"
      />

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
