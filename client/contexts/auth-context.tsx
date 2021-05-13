import { createStandaloneToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import Router from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import useSWR from "swr";
import { Loading } from "../components/loading";
import { api, fetcher } from "../services/api";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  logout: () => void;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<User>>;
};

const AuthContext = createContext<AuthContextType>(undefined);

export function AuthProvider(props) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [shouldLoadUser] = useState(!!token);

  const [loading, setLoading] = useState(true);
  const { data } = useSWR<User>(
    shouldLoadUser ? "/users/profile" : null,
    fetcher
  );

  useEffect(() => {
    async function loadTokenFromStorage() {
      if (window) {
        const token = window.localStorage.getItem("token");
        setToken(token);
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
          delete api.defaults.headers["Authorization"];
          setUser(null);
        }
      }
    }

    loadTokenFromStorage();

    setLoading(false);
  }, [token]);

  const logout = () => {
    if (window) {
      window.localStorage.removeItem("token");
      Router.push("/");
    }

    setUser(null);
    setToken(null);
    delete api.defaults.headers["Authorization"];
  };

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
          logout();
          Router.push("/");
        }
      }

      console.log({ error });
      const toast = createStandaloneToast();

      const id = "test-toast";
      console.log({ toastId: toast.isActive(id) });

      if (!toast.isActive(id)) {
        toast({
          id,
          title: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return Promise.reject(error);
    }
  );

  const properties: AuthContextType = {
    user,
    token,
    setToken: (token: string) => {
      window.localStorage.setItem("token", token);
      setToken(token);
    },
    setUser: (user: User) => {
      setUser(user);
    },
    logout,
  };

  if (loading) return <Loading />;
  if (!loading) {
    return <AuthContext.Provider value={properties} {...props} />;
  }
}

export function useAuthContext() {
  const data = useContext(AuthContext);

  if (!data) {
    throw new Error("AuthProvider is missing");
  }

  return data;
}
