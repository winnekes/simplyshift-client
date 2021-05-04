import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { api } from "../services/api";

type AuthContextType = {
  logout: () => void;
  token: string | null;
  setToken: Dispatch<SetStateAction<string>>;
  user: {} | null;
};

const AuthContext = createContext<AuthContextType>(undefined);

export function AuthProvider(props) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{} | null>(null);

  useEffect(() => {
    async function loadUserFromStorage() {
      if (window) {
        const token = window.localStorage.getItem("token");
        setToken(token);
        if (token) {
          try {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            const { data } = await api.get("users/me");
            if (data) {
              setUser(data);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    }

    loadUserFromStorage();
    setLoading(false);
  }, [token]);
  //todo no provider
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
      window.location.pathname = "/";
    },
    user,
    token,
  };
  // todo spinner
  if (loading) return <div>Loading</div>;
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
