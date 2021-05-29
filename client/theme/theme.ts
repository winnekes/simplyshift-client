import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { Button } from "./overrides/button";
import { Modal } from "./overrides/modal";

// color mode configuration
// todo store somewhere
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    body: "Roboto",
    heading: "Roboto Condensed",
  },
  components: {
    Button,
    Modal,
  },
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === "dark" ? "white" : "gray.900",
        bg: props.colorMode === "dark" ? colors.dark.ui01 : colors.light.ui01,
      },
    }),
  },
});

export const width = ["100%", "100%", "100%", "container.lg"];
