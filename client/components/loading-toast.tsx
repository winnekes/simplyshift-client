import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
// todo handle closing
export const LoadingToast = () => {
  const toast = useToast();

  return (
    <>
      {toast({
        position: "top-left",
        isClosable: false,
        duration: null,
        render: () => (
          <Center m={3} p={3} width="50px" bg="brand01.100" borderRadius="25">
            <Spinner color="white" speed="1s" />
          </Center>
        ),
      })}
    </>
  );
};
