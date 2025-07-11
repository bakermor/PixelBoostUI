import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserFollowing } from "../api/FollowApi";
import { ActivityModal } from "../components/activities/ActivityModal";
import { AvatarContainer } from "../components/avatar/AvatarContainer";
import { NewDefaultButton } from "../components/Buttons";
import { ActionModal } from "../components/Modals";
import { ProfileCard } from "../components/ProfileCard";
import { SideBar } from "../components/SideBar";
import { StatContainer } from "../components/StatContainer";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";
import { StatUpdateContext } from "../context/StatUpdateProvider";
import { User } from "../models/User";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { health } = useContext(StatUpdateContext);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [modal, setModal] = useState<string | null>(params.get("open"));
  const [friendList, setFriendList] = useState<User[] | undefined>(undefined);

  const chooseModal = (m: string) => {
    params.set("open", m);
    setModal(m);
    navigate({ search: params.toString() }, { replace: true });
  };

  const exitModal = () => {
    params.delete("open");
    setModal(null);
    navigate({ search: params.toString() }, { replace: true });
  };

  const getFriendsList = async (user_id: string) => {
    const result = await getUserFollowing(user_id);
    if (result.status === 200) setFriendList(result.data);
  };

  useEffect(() => {
    if (user) {
      getFriendsList(user.id);
    }
  }, [user]);

  return (
    <div className="h-screen w-screen flex bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC]">
      {modal === "action" ? (
        <ActionModal exit={exitModal} />
      ) : modal === "activities" ? (
        <ActivityModal exit={exitModal} />
      ) : null}

      <SideBar variant="dashboard" friends={friendList} />
      <div className="flex-1 flex p-4 gap-4">
        <div className="flex-1 flex flex-col gap-5 px-5 pt-12">
          <AvatarContainer />
          <StatContainer health={health} />
          <div className="w-full flex justify-around gap-3 px-12">
            <NewDefaultButton
              text={Strings.edit_stat}
              onClick={() => {
                chooseModal("action");
              }}
              variant="inverted"
            />
            <NewDefaultButton
              text={Strings.set_levels}
              onClick={() => {
                navigate("/set-levels");
              }}
              variant="inverted"
            />
          </div>
        </div>
        <ProfileCard
          user={user}
          onClick={() => {
            chooseModal("activities");
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
