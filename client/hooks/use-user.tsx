import { useEffect, useState } from "react";
import useSWR from "swr";
import { api, fetcher } from "../services/api";
import { User } from "../types";

export const useUser = () => {
  const [token, setToken] = useState<string | null>(null);
  const { data, error } = useSWR<User>(token && "/users/profile", fetcher);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return {
    user: data,
    loading: token && !error && !data,
    error,
  };
};
