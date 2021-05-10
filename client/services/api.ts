import Axios, { AxiosError } from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

// todo update when necessary
const urls = {
  test: `http://localhost:4400`,
  development: "http://localhost:4400/",
  production: "http://localhost:4400/",
};

export const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const fetcher = (url) => api.get(url).then((res) => res.data);

// TODO better error handling
// TODO ErrorBoundary
// TODO refactor Toast
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: AxiosError) {
    let errorMessage = "Oh no, something went wrong!";

    if (error.response) {
      errorMessage = error.response.data.message;

      if (error.response.data?.message === "JWT expired") {
        localStorage.removeItem("token");
      }
    }

    console.log({ error });
    const toast = createStandaloneToast();

    toast({
      title: errorMessage,
      status: "error",
      duration: 5000,
      isClosable: true,
    });

    return Promise.reject(error);
  }
);
