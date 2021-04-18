import { Box, Stack, StackDivider, useColorMode } from "@chakra-ui/react";
import { Children, FunctionComponent } from "react";
import { colors } from "../theme/colors";

export const DividedSegment: FunctionComponent = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      direction={["column", "row"]}
      spacing="24px"
      divider={<StackDivider borderColor={colors[colorMode].ui03} />}
    >
      {Children.map(children, (child) => (
        <Box flex={1}>{child}</Box>
      ))}
    </Stack>
  );
};
