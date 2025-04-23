import { useContext, useEffect, useState } from "react";
import { CreateActivityModal } from "../components/activities/CreateActivityModal";
import { MyActivitiesModal } from "../components/activities/MyActivitiesModal";
import { AvatarContainer } from "../components/AvatarContainer";
import { SettingsButton } from "../components/Buttons";
import { ActionModal } from "../components/Modals";
import { ProfileCard } from "../components/ProfileCard";
import { SideBar } from "../components/SideBar";
import { StatContainer } from "../components/StatContainer";
import { AuthContext } from "../context/AuthProvider";
import { StatUpdateContext } from "../context/StatUpdateProvider";

const Dashboard = () => {
  const pxl = window.innerWidth / 1920;
  const { user } = useContext(AuthContext);
  const { health, loading } = useContext(StatUpdateContext);
  const [modal, setModal] = useState<string | null>(null);

  const doAction = () => {
    setModal("action");
  };

  const setActivity = () => {
    setModal("my_activities");
  };

  const exitModal = () => {
    setModal(null);
  };

  useEffect(() => {
    if (!loading) console.log(health);
  }, [loading]);

  return (
    <div className="h-screen w-screen flex">
      {modal === "action" ? (
        <ActionModal exit={exitModal} />
      ) : modal === "my_activities" ? (
        <MyActivitiesModal exit={exitModal} setModal={setModal} />
      ) : modal === "create_activity" ? (
        <CreateActivityModal
          exit={exitModal}
          setModal={setModal}
          next="my_activities"
        />
      ) : null}
      <SideBar />
      <div className="flex-1 flex" style={{ padding: pxl * 20, gap: 20 }}>
        <div className="flex-1 flex flex-col" style={{ gap: pxl * 15 }}>
          <div className="w-full bg-gray-400" style={{ height: pxl * 15 }} />
          <div className="w-full" style={{ height: pxl * 170 }}>
            <AvatarContainer />
          </div>
          <div className="w-full flex" style={{ gap: pxl * 10 }}>
            <StatContainer health={health} />
            <div
              className="flex flex-col justify-evenly bg-gray-300"
              style={{
                width: pxl * 380,
                paddingLeft: pxl * 10,
                paddingRight: pxl * 10,
              }}
            >
              <SettingsButton text="edit_stat" onClick={doAction} />
              <SettingsButton text="" onClick={() => {}} />
              <SettingsButton text="" onClick={() => {}} />
            </div>
          </div>
          <div className="flex-1 bg-gray-200" />
        </div>
        <ProfileCard user={user} setActivity={setActivity} />
      </div>
    </div>
  );
};

export default Dashboard;
