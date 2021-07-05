import { Text, ComponentWithAs, TextProps } from "@chakra-ui/react";

export const Paragraph: ComponentWithAs<"p", TextProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Text my={5} {...rest}>
      {children}
    </Text>
  );
};
