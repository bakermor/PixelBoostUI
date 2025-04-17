import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EatFood } from "../components/actions/StatActions";
import { StatUpdateContext } from "../context/StatUpdateProvider";

const Action = () => {
  const pxl = window.innerWidth / 1920;
  const allowedStats = [
    "energy",
    "hunger",
    "thirst",
    "hygiene",
    "social",
    "fun",
  ];

  const [params] = useSearchParams();
  const [action, setAction] = useState("");
  const { health, loading } = useContext(StatUpdateContext);

  const stat = params.get("stat");
  const navigate = useNavigate();

  useEffect(() => {
    if (!stat || !allowedStats.includes(stat)) {
      navigate("/dashboard");
      return;
    }

    if (stat === "hunger") setAction("eat_food");
  }, [params, loading]);

  if (!stat || !allowedStats.includes(stat)) return null;

  return (
    <div className="w-screen h-screen flex">
      <div className="flex-1 bg-gray-200" />
      <div className="flex h-full" style={{ width: pxl * 850 }}>
        {action === "" ? (
          <div>No Action Selected</div>
        ) : action === "eat_food" ? (
          <EatFood level={health.hunger} />
        ) : null}
      </div>
      <div className="flex-1 bg-gray-200" />
    </div>
  );
};

export default Action;
