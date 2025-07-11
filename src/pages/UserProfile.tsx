import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFromUsername } from "../api/AuthApi";
import { followUser, unfollowUser } from "../api/FollowApi";
import { AvatarContainer } from "../components/avatar/AvatarContainer";
import { UserProfileCard } from "../components/ProfileCard";
import { SideBar } from "../components/SideBar";
import { StatContainer } from "../components/StatContainer";
import { AuthContext } from "../context/AuthProvider";
import { HealthLevels, User } from "../models/User";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username } = useParams();
  const [u, setU] = useState<User | undefined>(undefined);
  const [me, setMe] = useState<User | undefined>(user);

  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const follow = async (id: string) => {
    if (u && me) {
      const result = await followUser(id);
      if (result.status === 200) {
        setMe(result.data);
        setU({
          ...u,
          followers: [...u.followers, me.id],
        });
      }
    }
    if (!me) {
      navigate("/login");
    }
  };

  const unfollow = async (id: string) => {
    if (u && me) {
      const result = await unfollowUser(id);
      if (result.status === 200) {
        setMe(result.data);
        setU({
          ...u,
          followers: u.following.filter((uid) => uid !== me.id),
        });
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
    onLoad();
  }, []);

  return (
    <div className="w-screen h-screen flex bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC]">
      <SideBar />
      {status === false ? (
        <div>NotFound</div>
      ) : u ? (
        <div className="flex-1 flex">
          <UserProfileCard
            user={u}
            me={me}
            onClick={() => {
              me?.following.includes(u.id) ? unfollow(u.id) : follow(u.id);
            }}
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
