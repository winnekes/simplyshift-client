import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type loginData = {
  email: string;
  password: string;
};

type AuthContextType = {
  login: (data: loginData) => void;
  logout: () => void;
  token: string | null;
  setToken: () => void;
  user: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProvider(props) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{} | null>(null);

  useEffect(() => {
    async function loadUserFromStorage() {
      if (window) {
        const token = window.localStorage.getItem("token");
        setToken(token);

        console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await api.get("users/me");
        if (user) setUser(user);
      }
      console.log({ user });
      setLoading(false);
    }
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (window) {
      const token = window.localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  const login = async ({ email, password }: loginData) => {
    const response = await api.post(`login`, { email, password });

    setToken(response.data["jwt"]);

    if (window) {
      window.localStorage.setItem("token", response.data["jwt"]);
    }
  };

  const register = () => {};

  const logout = () => {
    if (window) {
      window.localStorage.removeItem("token");
    }

    setToken(null);
    delete api.defaults.headers["Authorization"];
    window.location.pathname = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, token }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };

export function useAuthContext() {
  const data = useContext(AuthContext);
  if (!data) {
    throw new Error("useAuthContext must be used within AuthContext.Provider");
  }
  return data;
}
