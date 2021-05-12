import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { Loading } from "../components/loading";
import { api } from "../services/api";

type AuthContextType = {
  logout: () => void;
  token: string | null;
  setToken: Dispatch<SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType>(undefined);

export function AuthProvider(props) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTokenFromStorage() {
      if (window) {
        const token = window.localStorage.getItem("token");
        setToken(token);
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    loadTokenFromStorage();
    setLoading(false);
  }, [token]);

  const properties: AuthContextType = {
    setToken: (token: string) => {
      window.localStorage.setItem("token", token);
      setToken(token);
    },
    logout: () => {
      if (window) {
        window.localStorage.removeItem("token");
      }
      setToken(null);
      delete api.defaults.headers["Authorization"];
    },
    token,
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
