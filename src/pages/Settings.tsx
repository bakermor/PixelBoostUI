import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { StatsSettings } from "../components/settings/StatsSettings";
import { SideBar } from "../components/SideBar";
import { AuthContext } from "../context/AuthProvider";

const Settings = () => {
  const allowedSections = ["profile", "stat"];

  const { user } = useContext(AuthContext);

  const { section } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (section && !allowedSections.includes(section)) navigate("/settings");
  }, []);

  return (
    <div className="w-screen h-screen flex gap-8 bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC] overflow-clip">
      <SideBar
        focused="settings"
        focused_sec={section === "stat" ? "stat" : "profile"}
      />
      <div className="flex-1 min-w-200 p-8 pt-10 flex flex-col overflow-y-auto">
        {user ? (
          section === "stat" ? (
            <StatsSettings user={user} />
          ) : (
            <ProfileSettings user={user} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Settings;
