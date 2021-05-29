import { Text, ComponentWithAs, TextProps } from "@chakra-ui/react";

export const BrandText: ComponentWithAs<"p", TextProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Text color="green.400" fontWeight="bold" as="span" {...rest}>
      {children}
    </Text>
  );
};
