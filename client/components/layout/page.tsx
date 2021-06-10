import { Box, Center, useColorMode } from "@chakra-ui/react";
import { Children, cloneElement, FunctionComponent, ReactElement } from "react";
import { colors } from "../../theme/colors";
import { width } from "../../theme/theme";

interface PageProps {
  simple?: boolean;
}

interface PageSubComponents {
  Title: FunctionComponent;
  Content: FunctionComponent;
}

const Title: FunctionComponent<PageProps> = ({ children }) => {
  return <Box paddingX={[6, 6, 6, 0]}>{children}</Box>;
};

const PageTitle: FunctionComponent<PageProps> = ({ children, simple }) => {
  if (simple) {
    return (
      <Center>
        <Title>{children}</Title>
      </Center>
    );
  }
  return <Title>{children}</Title>;
};

const Content: FunctionComponent<PageProps> = ({ children, ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colors[colorMode].ui02}
      p={6}
      marginY={4}
      borderRadius={5}
      border={[null, `1px solid ${colors[colorMode].ui03}`]}
      borderY={[`1px solid ${colors[colorMode].ui03}`]}
      width={props.simple ? "container.sm" : width}
    >
      {children}
    </Box>
  );
};

const PageContent: FunctionComponent<PageProps> = ({ children, ...props }) => {
  if (props.simple) {
    return (
      <Center>
        <Content {...props}>{children}</Content>
      </Center>
    );
  }
  return <Content {...props}>{children}</Content>;
};

export const Page: FunctionComponent<PageProps> & PageSubComponents = ({
  children,
  ...props
}) => (
  <div>
    {Children.map(children, (child) =>
      cloneElement(child as ReactElement<any>, { ...props })
    )}
  </div>
);

Page.Title = PageTitle;
Page.Content = PageContent;
