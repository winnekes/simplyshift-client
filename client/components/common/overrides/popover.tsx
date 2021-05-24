import {
  ComponentWithAs,
  PopoverContentProps,
  useColorMode,
} from "@chakra-ui/react";
import { colors } from "../../../theme/colors";
import { PopoverContent as ChakraPopoverContent } from "@chakra-ui/react";

export const PopoverContent: ComponentWithAs<"section", PopoverContentProps> = (
  props
) => {
  const { colorMode } = useColorMode();
  const { children, ...rest } = props;
  return (
    <ChakraPopoverContent bg={colors[colorMode].ui02} {...rest}>
      {children}
    </ChakraPopoverContent>
  );
};
