import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionButton } from "../components/Buttons";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { StatsSettings } from "../components/settings/StatsSettings";
import { AuthContext } from "../context/AuthProvider";

const Settings = () => {
  const pxl = window.innerWidth / 1920;
  const allowedSections = ["profile", "stat"];

  const { user } = useContext(AuthContext);

  const { section } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (section && !allowedSections.includes(section)) navigate("/settings");
  }, []);

  return (
    <div className="w-screen h-screen flex" style={{ gap: pxl * 10 }}>
      <div
        className="h-full flex flex-col bg-gray-200"
        style={{
          width: pxl * 450,
          padding: pxl * 15,
          paddingTop: pxl * 20,
          gap: pxl * 5,
        }}
      >
        <button
          className="flex bg-gray-300 hover:bg-gray-400"
          style={{ width: pxl * 80, height: pxl * 50, marginBottom: pxl * 30 }}
          onClick={() => {
            navigate("/dashboard");
          }}
        />
        {allowedSections.map((option) => (
          <div className="flex" key={option}>
            <SectionButton
              text={`sec_${option}`}
              onClick={() => {
                navigate(`/settings/${option}`);
              }}
              focused={option === section || (option === "profile" && !section)}
            />
          </div>
        ))}
      </div>
      <div
        className="flex-1 flex flex-col overflow-y-auto"
        style={{
          paddingLeft: pxl * 30,
          paddingRight: pxl * 30,
          marginTop: pxl * 40,
          marginBottom: pxl * 30,
        }}
      >
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
