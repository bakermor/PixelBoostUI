import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../api/AuthApi";
import { User } from "../models/User";

interface Auth {
  user: User | undefined;
  loading: boolean;
  updateAuth: () => Promise<void>;
  updateFollowers: (followers: string[], following: string[]) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<Auth>({
  user: undefined,
  loading: true,
  updateAuth: async () => {},
  updateFollowers: () => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const updateAuth = useCallback(async () => {
    setLoading(true);
    const res = await getCurrentUser();
    if (res.status === 200) setUser(res.data);
    setLoading(false);
  }, []);

  const updateFollowers = (followers: string[], following: string[]) => {
    if (user) setUser({ ...user, followers: followers, following: following });
  };

  useEffect(() => {
    updateAuth();
    const interval = setInterval(updateAuth, 900000);
    return () => clearInterval(interval);
  }, [updateAuth]);

  return (
    <AuthContext.Provider
      value={{ user, loading, updateAuth, updateFollowers }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
