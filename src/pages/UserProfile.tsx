import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFromUsername } from "../api/AuthApi";
import { followUser, unfollowUser } from "../api/FollowApi";
import { AvatarContainer } from "../components/avatar/AvatarContainer";
import { FollowModal } from "../components/FollowModal";
import { UserProfileCard } from "../components/ProfileCard";
import { SideBar } from "../components/SideBar";
import { StatContainer } from "../components/StatContainer";
import { AuthContext } from "../context/AuthProvider";
import { HealthLevels, User } from "../models/User";

const UserProfile = () => {
  const { user, updateFollowers } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username } = useParams();

  const [u, setU] = useState<User | undefined>(undefined);

  const [modal, setModal] = useState<string | null>(null);

  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const chooseModal = (m: string) => {
    const params = new URLSearchParams(location.search);
    params.set("open", m);
    setModal(m);
    navigate({ search: params.toString() }, { replace: true });
  };

  const exitModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete("open");
    setModal(null);
    navigate({ search: params.toString() }, { replace: true });
  };

  const follow = async (id: string) => {
    if (u && user) {
      const result = await followUser(id);
      if (result.status === 200 && result.data) {
        setU({
          ...u,
          followers: [...u.followers, user.id],
        });
        updateFollowers(result.data.followers, result.data.following);
      }
    }
    if (!user) {
      navigate("/login");
    }
  };

  const unfollow = async (id: string) => {
    if (u && user) {
      const result = await unfollowUser(id);
      if (result.status === 200 && result.data) {
        setU({
          ...u,
          followers: u.followers.filter((uid) => uid !== user.id),
        });
        updateFollowers(result.data.followers, result.data.following);
      }
    }
  };

  const onLoad = async () => {
    if (username) {
      const result = await getUserFromUsername(username);
      if (result.status === 200) {
        setU(result.data);
        setStatus(true);
      } else if (result.status === 404) {
        setStatus(false);
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setModal(params.get("open"));
    onLoad();
  }, [u]);

  return (
    <div className="w-screen h-screen flex bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC]">
      <SideBar />
      {status === false ? (
        <div>NotFound</div>
      ) : u ? (
        <div className="flex-1 flex">
          {modal === "following" ? (
            <FollowModal
              user={u}
              me={user}
              tab="following"
              exit={exitModal}
              changeTab={chooseModal}
            />
          ) : modal === "followers" ? (
            <FollowModal
              user={u}
              me={user}
              tab="followers"
              exit={exitModal}
              changeTab={chooseModal}
            />
          ) : null}
          <UserProfileCard
            user={u}
            me={user}
            onClick={() => {
              user?.following.includes(u.id) ? unfollow(u.id) : follow(u.id);
            }}
            modal={chooseModal}
          />
          <div className="flex-1 flex flex-col h-full py-28 pr-10 pl-4 gap-6">
            <AvatarContainer />
            <StatContainer
              health={
                Object.fromEntries(
                  Object.keys(u.health).map((key) => [
                    key,
                    u.health[key as keyof HealthLevels].current_level,
                  ])
                ) as Record<keyof HealthLevels, number>
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
