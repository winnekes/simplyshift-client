import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SWRConfig, SWRConfiguration } from "swr";
import { MetaHead } from "../components/meta-head";
import { AuthProvider } from "../hooks/use-auth";
import { api } from "../mutations/api";
import "../theme/calendar.scss";
import "../theme/globals.scss";
import { theme } from "../theme/theme";

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const setIsLoading = () => !loading && setLoading(true);
  const setIsFinished = () => loading && setLoading(false);

  // Create a client for React Query (mutations)
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onMutate: setIsLoading,
        onSettled: setIsFinished,
      },
    },
  });

  const swrConfig: SWRConfiguration = {
    fetcher: (url) => api.get(url).then((res) => res.data),
    loadingTimeout: 1,
    onLoadingSlow: setIsLoading,
    onSuccess: setIsFinished,
    onError: setIsFinished,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SWRConfig value={swrConfig}>
          <AuthProvider globalLoading={loading}>
            <MetaHead />
            <Component {...pageProps} />
          </AuthProvider>
        </SWRConfig>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
