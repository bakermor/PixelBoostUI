import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Action = () => {
  const [params] = useSearchParams();
  const allowedStats = [
    "energy",
    "hunger",
    "thirst",
    "hygiene",
    "social",
    "fun",
  ];
  const stat = params.get("stat");
  const navigate = useNavigate();

  useEffect(() => {
    if (!stat || !allowedStats.includes(stat)) {
      navigate("/dashboard");
      return;
    }
  }, []);

  if (!stat || !allowedStats.includes(stat)) return null;

  return (
    <div className="w-screen h-screen">
      <div>{params.get("stat")}</div>
    </div>
  );
};

export default Action;
