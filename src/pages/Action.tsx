import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PickAction } from "../components/actions/ActionBase";
import { StatAction } from "../components/actions/StatAction";
import {
  ActionComponentStat,
  ActionComponents,
} from "../constants/ActionConstants";
import { allowedStats } from "../constants/StatConstants";
import { AuthContext } from "../context/AuthProvider";
import { StatUpdateContext } from "../context/StatUpdateProvider";

const Action = () => {
  const pxl = window.innerWidth / 1920;

  const { health, loading } = useContext(StatUpdateContext);
  const { user } = useContext(AuthContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const stat = params.get("stat");

  const [action, setAction] = useState("");
  const [level, setLevel] = useState(0);

  const [modifier, setModifier] = useState(0);

  const updateModifier = (modifier: number) => {
    if (user?.health) {
      const currentStat = user.health[stat as keyof typeof health];
      let equation = currentStat?.equation.reduce((sum, n) => sum + n, 0);
      setModifier(equation * modifier);
    }
  };

  const chooseAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAction(e.currentTarget.name);
  };

  useEffect(() => {
    if (!stat || !allowedStats.includes(stat)) {
      navigate("/dashboard");
      return;
    }

    if (stat === "hunger") setAction("eat_food");
    if (stat === "thirst") setAction("drink");
    if (stat === "hygiene") setAction("get_clean");
    if (stat === "fun") setAction("do_fun");
    if (stat === "social") setAction("hangout");
  }, [params, loading]);

  useEffect(() => {
    if (stat && allowedStats.includes(stat) && action !== "") {
      const statKey = ActionComponentStat[action];
      const currentLevel = health[statKey as keyof typeof health];

      setLevel(currentLevel);
    }
  }, [action, health]);

  if (!stat || !allowedStats.includes(stat)) return null;

  return (
    <div className="w-screen h-screen flex">
      <div className="flex-1 bg-gray-200" />
      <div className="flex h-full" style={{ width: pxl * 850 }}>
        {action === "" ? (
          <PickAction stat={stat} onClick={chooseAction} />
        ) : ActionComponents[action] ? (
          <StatAction
            action={action}
            stat={stat}
            level={level}
            modifier={modifier}
            setModifier={updateModifier}
          />
        ) : null}
      </div>
      <div className="flex-1 bg-gray-200" />
    </div>
  );
};

export default Action;
