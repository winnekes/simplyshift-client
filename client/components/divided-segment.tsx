import { Box, Stack, StackDivider } from "@chakra-ui/react";
import { Children, FunctionComponent } from "react";

export const DividedSegment: FunctionComponent = ({ children }) => (
  <Stack
    direction={["column", "row"]}
    spacing="24px"
    divider={<StackDivider borderColor="gray.200" />}
  >
    {Children.map(children, (child) => (
      <Box flex={1}>{child}</Box>
    ))}
  </Stack>
);
