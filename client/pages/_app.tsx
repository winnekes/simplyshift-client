import "../theme/calendar.scss";
import "../theme/globals.scss";
import type { AppProps } from "next/app";
import React, { Component, ErrorInfo } from "react";
import { AuthProvider } from "../contexts/auth-context";
import {
  Center,
  ChakraProvider,
  createStandaloneToast,
  Spinner,
} from "@chakra-ui/react";
import { api } from "../services/api";
import { theme } from "../theme/theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { SWRConfig } from "swr";

function App({ Component, pageProps }: AppProps) {
  const toast = createStandaloneToast();
  const toastId = "loading-toast";

  const showToast = () => {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        position: "top",
        duration: 5000,
        isClosable: false,
        render: () => (
          <Center color="red" p={3}>
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

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <SWRConfig
            value={{
              fetcher: (url) => api.get(url).then((res) => res.data),
              loadingTimeout: 1,
              onLoadingSlow: showToast,
              onSuccess: () => toast.close(toastId),
              onError: () => toast.close(toastId),
              revalidateOnFocus: true,
              revalidateOnReconnect: true,
            }}
          >
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </SWRConfig>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}
