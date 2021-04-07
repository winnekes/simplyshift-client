import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/auth-context";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../constants/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
