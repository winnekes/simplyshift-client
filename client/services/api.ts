import Axios from "axios";

// todo update when necessary (env variables)
const urls = {
  test: `http://localhost:4400`,
  development: "https://60730d468e47.ngrok.io/",
  production: "http://localhost:4400/",
};

export const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
