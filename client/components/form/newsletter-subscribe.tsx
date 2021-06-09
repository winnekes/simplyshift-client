import {
  Alert,
  AlertIcon,
  Flex,
  IconButton,
  Input,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import MailchimpSubscribe from "react-mailchimp-subscribe";

export const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const { colorMode } = useColorMode();
  const url =
    "https://googlemail.us7.list-manage.com/subscribe/post?u=84997ea5ce2e52834a5dd1b34&amp;id=b54f3d9c90";

  return (
    <VStack align="stretch">
      <Text fontWeight="500" fontSize="lg" mb={2}>
        Follow us! Be the first to hear about new features
      </Text>

      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status }) => (
          <>
            <Flex>
              <Input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value as string)}
                bg={colorMode === "light" ? "gray.100" : "whiteAlpha.100"}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                onClick={() => subscribe({ EMAIL: email })}
                isLoading={status === "sending"}
                icon={<BiMailSend />}
                color="white"
                bg="green.500"
                _hover={{
                  bg: "green.500",
                }}
                aria-label="Subscribe"
                ml={2}
              />
            </Flex>
            {status === "success" && (
              <Alert status="success" variant="left-accent">
                <AlertIcon />
                Thank you for subscribing and talk to you soon!
              </Alert>
            )}

            {status === "error" && (
              <Alert status="warning" variant="left-accent">
                <AlertIcon />
                {!email && <>Please enter a valid email address.</>}
                {email && <>Something went wrong. Please try again later!</>}
              </Alert>
            )}
          </>
        )}
      />
    </VStack>
  );
};
