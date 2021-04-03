// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Axios from "axios";

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
