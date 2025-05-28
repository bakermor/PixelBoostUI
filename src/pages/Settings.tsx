import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultButton, DefaultIconButton } from "../components/Buttons";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { StatsSettings } from "../components/settings/StatsSettings";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";
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
    <div
      className="w-screen h-screen flex"
      style={{ gap: pxl * 10, backgroundColor: Colors.p1 }}
    >
      <div
        className="h-full flex flex-col"
        style={{
          width: pxl * 450,
          minWidth: pxl * 250,
          padding: pxl * 15,
          paddingTop: pxl * 20,
          gap: pxl * 30,
          backgroundColor: Colors.a5,
        }}
      >
        <DefaultIconButton
          onClick={() => {
            navigate("/dashboard");
          }}
          size={[80, 50]}
          colors={[Colors.a4, Colors.a3]}
        />
        <div className="flex-1 flex flex-col" style={{ gap: pxl * 5 }}>
          {allowedSections.map((option) => (
            <div className="flex" key={option}>
              <DefaultButton
                text={Strings[`sec_${option}`]}
                onClick={() => {
                  navigate(`/settings/${option}`);
                }}
                focused={
                  option === section || (option === "profile" && !section)
                }
                size={50}
                alignLeft
                colors={[Colors.a2, Colors.a3, Colors.a5, Colors.p1]}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex-1 flex flex-col overflow-y-auto"
        style={{
          minWidth: pxl * 900,
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
