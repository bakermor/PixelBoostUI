import { useEffect, useState } from "react";
import { getUserFollowers, getUserFollowing } from "../api/FollowApi";
import { Strings } from "../constants/Strings";
import { User } from "../models/User";
import { SearchBar } from "./SearchBar";
import { UserInfo } from "./UserInfo";

interface Props {
  exit: React.MouseEventHandler<any>;
  tab: "following" | "followers";
  changeTab: (modal: string) => void;
  user: User;
  me?: User;
}

export const FollowModal = (props: Props) => {
  const [tab, setTab] = useState<"following" | "followers">(props.tab);
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState<User[] | undefined>(undefined);

  const getUsers = async () => {
    if (tab === "following") {
      const result = await getUserFollowing(props.user.id);
      if (result.status === 200) setUserList(result.data);
    } else {
      const result = await getUserFollowers(props.user.id);
      if (result.status === 200) setUserList(result.data);
    }
  };

  const changeTab = (newTab: "following" | "followers") => {
    setUserList(undefined);
    setTab(newTab);
    props.changeTab(newTab);
  };

  const getContext = (u_id: string) => {
    if (props.me) {
      if (props.me.following.includes(u_id)) return 0;
      else return 1;
    }
    if (tab === "followers") return 2;
    else {
      if (props.user.following.includes(u_id)) return 0;
      else return 1;
    }
  };

  useEffect(() => {
    getUsers();
  }, [tab]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      onClick={props.exit}
    >
      <div
        className="flex flex-col gap-2 w-170 h-3/4 bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC] outline-2 outline-[#752092]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex w-full h-12 border-b-2 border-b-[#F5F5F5]">
          <div
            className="sans flex flex-1 justify-center h-full pt-2 text-[#919191] hover:bg-[#F5F5F5] cursor-pointer transition-colors duration-300"
            onClick={() => changeTab("following")}
          >
            <div
              className={`flex h-full w-24 justify-center items-center py-0.5 border-b-[#C957BC] ${
                tab === "following" ? "border-b-2" : null
              }`}
            >
              {Strings.following}
            </div>
          </div>
          <div
            className="sans flex flex-1 justify-center h-full pt-2 text-[#919191] hover:bg-[#F5F5F5] cursor-pointer transition-colors duration-300"
            onClick={() => changeTab("followers")}
          >
            <div
              className={`flex h-full w-24 justify-center items-center py-0.5 border-b-[#C957BC] ${
                tab === "followers" ? "border-b-2" : null
              }`}
            >
              {Strings.followers}
            </div>
          </div>
        </div>
        <div className="px-4">
          <SearchBar val={search} change={setSearch} variant="modal" />
        </div>

        <div className="px-2">
          {userList?.map((user, index) => (
            <UserInfo
              key={index}
              user={user}
              button={
                props.me?.id !== user.id
                  ? {
                      text:
                        getContext(user.id) === 0
                          ? Strings.following
                          : getContext(user.id) === 1
                          ? Strings.follow
                          : Strings.remove,
                      type:
                        getContext(user.id) === 0
                          ? "unfollow"
                          : getContext(user.id) === 1
                          ? "follow"
                          : "remove",
                      focused: getContext(user.id) === 1 ? false : true,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
