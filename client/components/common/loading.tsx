import { Center, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Center h="100vh">
      <Spinner
        color="green.500"
        emptyColor="green.100"
        height="100px"
        width="100px"
        thickness="4px"
        speed="1s"
      />
    </Center>
  );
};
