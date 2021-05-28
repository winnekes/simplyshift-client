import { Button, ButtonProps, ComponentWithAs } from "@chakra-ui/react";

export const CtaButton: ComponentWithAs<"button", ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Button
      color="white"
      bg="green.400"
      _hover={{
        bg: "green.500",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
