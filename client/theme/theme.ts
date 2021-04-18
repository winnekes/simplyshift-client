import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { Button } from "./components/button";

// color mode configuration
// todo store somewhere
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const themeColors = {
  brand01: colors.brand01,
};

export const theme = extendTheme({
  config,
  colors: themeColors,
  fonts: {
    body: "PT Sans",
    heading: "Quicksand",
  },
  components: { Button },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? colors.dark.ui01 : colors.light.ui01,
      },
    }),
  },
});

export const width = ["100%", "container.lg"];
