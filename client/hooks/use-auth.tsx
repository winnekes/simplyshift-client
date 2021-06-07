import { createStandaloneToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  createContext,
  FunctionComponent,
} from "react";
import useSWR from "swr";
import { api } from "../services/api";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  initialising: boolean;
  setUser: Dispatch<SetStateAction<User>>;
  setToken: Dispatch<SetStateAction<string>>;
  globalLoading: boolean;
  logout: () => void;
};

const UseAuth = createContext<AuthContextType>(undefined);

interface Props {
  globalLoading: boolean;
}

export const AuthProvider: FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const [initialising, setInitialising] = useState(true);
  const [checked, setChecked] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [canFetchProfile, setCanFetchProfile] = useState(false);

  const { data } = useSWR<User>(canFetchProfile && "/users/profile");

  useEffect(() => {
    if (window) {
      const token = window.localStorage.getItem("token");
      if (token) {
        setToken(token);
      } else {
        return setChecked(true);
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (api.defaults.headers.Authorization && token) {
        setCanFetchProfile(true);
      }
    }
  }, [token]);

  useEffect(() => {
    if (data) {
      setUser(data);
      setChecked(true);
    }
  }, [data]);

  useEffect(() => {
    if (checked) {
      setInitialising(false);
    }
  }, [checked]);

  const logout = async () => {
    if (window) {
      window.localStorage.removeItem("token");
    }

    setUser(null);
    setToken(null);
    setCanFetchProfile(false);

    delete api.defaults.headers["Authorization"];
    await router.push("/login");
  };

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    // let caller handle response (no need to handle here)
    return response;
  };

  const onResponseError = async (error: AxiosError) => {
    let errorMessage = "Oh no, something went wrong!";

    if (error.response) {
      const errorCode = error.response.data?.code;

      const codesToHandle = [
        "SESSION_EXPIRED",
        "USER_NOT_FOUND",
        "PASSWORD_NOT_MATCH",
        "INCORRECT_EMAIL_OR_PASSWORD",
      ];
      // switch on errors
      // only allow certain error messages
      switch (errorCode) {
        case "SESSION_EXPIRED":
          errorMessage = "Your session expired. Please log in again!";
          await logout();
          break;
        case "USER_NOT_FOUND":
          errorMessage =
            "This email address does not exist. Sign up for SimplyShift now!";
          break;
        case "PASSWORD_NOT_MATCH":
          errorMessage = "Make sure the passwords match.";
          break;
        case "INCORRECT_EMAIL_OR_PASSWORD":
          errorMessage = "Invalid email address or password.";
          break;
      }

      if (codesToHandle.includes(errorCode)) {
        const toast = createStandaloneToast();

        const id = "test-toast";

        if (!toast.isActive(id)) {
          toast({
            id,
            title: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }

      return Promise.reject(error);
    }
  };

  api.interceptors.response.use(onResponse, onResponseError);

  const properties: AuthContextType = {
    user,
    initialising,
    setUser,
    setToken: (token: string) => {
      window.localStorage.setItem("token", token);
      setToken(token);
    },
    logout,
    globalLoading: props.globalLoading,
  };

  return <UseAuth.Provider value={properties} {...props} />;
};

export function useAuth() {
  const data = useContext(UseAuth);

  if (!data) {
    throw new Error("AuthProvider is missing");
  }

  return data;
}
