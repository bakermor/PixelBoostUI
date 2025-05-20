import { User } from "../../api/AuthApi";

interface Props {
  user: User;
}

export const StatsSettings = (props: Props) => {
  const pxl = window.innerWidth / 1920;

  return <div className="flex-1 flex flex-col" style={{ gap: pxl * 50 }}></div>;
};
