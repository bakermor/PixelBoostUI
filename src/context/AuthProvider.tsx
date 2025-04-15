import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getCurrentUser, User } from "../api/UserApi";

interface Auth {
  user: User | undefined;
  loading: boolean;
  updateAuth: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<Auth>({
  user: undefined,
  loading: true,
  updateAuth: async () => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const updateAuth = useCallback(async () => {
    const res = await getCurrentUser();
    if (res.status === 200) setUser(res.user);
    setLoading(false);
  }, []);

  useEffect(() => {
    updateAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, updateAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
