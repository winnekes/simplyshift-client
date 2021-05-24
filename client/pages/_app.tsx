import {
  Center,
  ChakraProvider,
  createStandaloneToast,
  Spinner,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SWRConfig } from "swr";
import { AuthProvider } from "../contexts/auth-context";
import { api } from "../services/api";
import "../theme/calendar.scss";
import "../theme/globals.scss";
import { theme } from "../theme/theme";

const toast = createStandaloneToast();
const toastId = "loading-toast";

// todo fix color
const showToast = () => {
  if (!toast.isActive(toastId)) {
    toast({
      id: toastId,
      position: "top",
      duration: 5000,
      isClosable: false,
      render: () => (
        <Center color="brand01" p={3}>
          <Spinner speed="0.65s" size="xl" />
        </Center>
      ),
    });
  }
};

// Create a client for React Query (mutations)
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onMutate: showToast,
      onSuccess: () => toast.close(toastId),
      onError: () => toast.close(toastId),
    },
  },
});

const swrConfig = {
  fetcher: (url) => api.get(url).then((res) => res.data),
  loadingTimeout: 1,
  onLoadingSlow: showToast,
  onSuccess: () => toast.close(toastId),
  onError: () => toast.close(toastId),
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SWRConfig value={swrConfig}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </SWRConfig>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
