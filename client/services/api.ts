import Axios from "axios";

// todo update when necessary
const urls = {
  test: `http://localhost:4400`,
  development: "https://dcbbfe3d50e6.ngrok.io/",
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
