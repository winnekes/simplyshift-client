import * as React from "react";
import {useState} from "react";

type AuthContextType = {
  logout: () => void;
  setToken: (token: string) => void;
  token: string | null;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProvider(props) {

    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

  if (true) {
    return <div />;
  }

  const login = () => {};
  const register = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{ data, login, logout, register }}
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