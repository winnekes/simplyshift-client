import Axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

let urls = {
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

// TODO better error handling
// TODO refactor Toast
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log({ error });
    if (error.response.data.message === "JWT expired") {
      localStorage.removeItem("token");
    }

    const toast = createStandaloneToast();
    // const customToast = createStandaloneToast({ theme: yourCustomTheme })
    toast({
      title: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
