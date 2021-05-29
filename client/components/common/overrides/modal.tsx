import {
  ComponentWithAs,
  ModalContentProps,
  useColorMode,
} from "@chakra-ui/react";
import { colors } from "../../../theme/colors";
import { ModalContent as ChakraModalContent } from "@chakra-ui/react";

export const ModalContent: ComponentWithAs<"section", ModalContentProps> = (
  props
) => {
  const { colorMode } = useColorMode();
  const { children, ...rest } = props;
  return (
    <ChakraModalContent bg={colors[colorMode].ui02} {...rest}>
      {children}
    </ChakraModalContent>
  );
};
