import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const colors = {
  brand01: {
    100: "#a0cec2",
    200: "",
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    body: "PT Sans",
    heading: "Quicksand",
  },
  styles: {
    global: {
      body: {
        bg: "#F5F5F5",
      },
    },
  },
});
