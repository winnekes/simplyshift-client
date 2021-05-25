import { Box, useColorMode } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { colors } from "../../theme/colors";
import { width } from "../../theme/theme";

interface PageSubComponents {
  Title: FunctionComponent;
  Content: FunctionComponent;
}

const Title: FunctionComponent = ({ children }) => (
  <Box paddingX={[6, 6, 6, 0]}>{children}</Box>
);

const Content: FunctionComponent = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colors[colorMode].ui02}
      p={6}
      marginY={4}
      borderRadius={5}
      border={[null, `1px solid ${colors[colorMode].ui03}`]}
      borderY={[`1px solid ${colors[colorMode].ui03}`]}
      width={width}
    >
      {children}
    </Box>
  );
};

export const Page: FunctionComponent & PageSubComponents = ({ children }) => (
  <div>{children}</div>
);

Page.Title = Title;
Page.Content = Content;
