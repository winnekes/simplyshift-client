// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

let urls = {
  test: `http://localhost:4400`,
  development: "http://localhost:4400/",
  production: "https://your-production-url.com/",
};

export const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log();
    return response;
  },
  function (error) {
    console.log("AAAAAH");
    const toast = createStandaloneToast();
    // const customToast = createStandaloneToast({ theme: yourCustomTheme })
    toast({
      title: "An error occurred.",
      description: "Unknown origin",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
