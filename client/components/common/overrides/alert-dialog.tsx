import {
  ComponentWithAs,
  ModalContentProps,
  useColorMode,
} from "@chakra-ui/react";
import { colors } from "../../../theme/colors";
import { AlertDialogContent as ChakraAlertDialogContent } from "@chakra-ui/react";

export const AlertDialogContent: ComponentWithAs<"section", ModalContentProps> =
  (props) => {
    const { colorMode } = useColorMode();
    const { children, ...rest } = props;
    return (
      <ChakraAlertDialogContent bg={colors[colorMode].ui02} {...rest}>
        {children}
      </ChakraAlertDialogContent>
    );
  };
