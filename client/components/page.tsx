import { Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { width } from "../constants/theme";

interface PageSubComponents {
  Title: FunctionComponent;
  Content: FunctionComponent;
}

const Title: FunctionComponent = ({ children }) => {
  return <Box py={6}>{children}</Box>;
};

const Content: FunctionComponent = ({ children }) => {
  return (
    <Box
      bg="white"
      p={6}
      marginY={4}
      border={[null, "1px solid lightgray"]}
      borderY={["1px solid lightgray"]}
      width={width}
    >
      {children}
    </Box>
  );
};

export const Page: FunctionComponent & PageSubComponents = ({ children }) => {
  return <div>{children}</div>;
};

Page.Title = Title;
Page.Content = Content;
