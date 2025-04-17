import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthProvider";

export interface HealthLevels {
  energy: number;
  hunger: number;
  thirst: number;
  fun: number;
  social: number;
  hygiene: number;
}

interface StatUpdate {
  health: HealthLevels;
  loading: boolean;
}

interface UpdateProviderProps {
  children: ReactNode;
}

export const StatUpdateContext = createContext<StatUpdate>({
  health: {
    energy: 0,
    hunger: 0,
    thirst: 0,
    fun: 0,
    social: 0,
    hygiene: 0,
  },
  loading: true,
});

export const StatUpdateProvider = (props: UpdateProviderProps) => {
  const auth = useContext(AuthContext);
  const [health, setHealth] = useState<HealthLevels>({
    energy: 0,
    hunger: 0,
    thirst: 0,
    fun: 0,
    social: 0,
    hygiene: 0,
  });
  const [loading, setLoading] = useState(true);

  const updateStats = () => {
    const result = { ...health };
    if (auth.user?.health) {
      for (const [key, value] of Object.entries(auth.user.health)) {
        let stat = auth.user.health[key as keyof typeof auth.user.health];
        let equation = stat.equation.reduce((sum, n) => sum + n, 0);
        let modifier =
          auth.user.current_activity.modifiers[
            key as keyof typeof auth.user.current_activity.modifiers
          ];

        // New Value = initial val - (equation * modifier * time diff)
        result[key as keyof typeof auth.user.health] = Math.min(
          Math.max(
            value.current_level -
              (modifier ? equation * modifier : equation) *
                (Date.now() / 1000 - stat.last_updated),
            0
          ),
          100
        );
      }
    }
    return result;
  };

  useEffect(() => {
    if (!auth.loading) {
      setHealth(updateStats());
      const interval = setInterval(() => {
        setLoading(true);
        let updatedHealth = updateStats();
        setHealth(updatedHealth);
        setLoading(false);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [auth.loading]);

  return (
    <StatUpdateContext.Provider value={{ health, loading }}>
      {props.children}
    </StatUpdateContext.Provider>
  );
};
