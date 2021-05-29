import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

type Props = {
  message?: string;
};

export const ErrorContainer = ({ message }: Props) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Something went wrong</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
};
