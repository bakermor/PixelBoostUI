import { useContext, useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { UserInfo } from "./UserInfo";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Strings } from "../constants/Strings";

interface Props {
  tab?: "following" | "followers";
}

export const FollowModal = (props: Props) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tab, setTab] = useState<"following" | "followers">(
    props.tab ?? "followers"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    // get followers info from list
  }, [tab]);

  return (
    <div className="flex flex-col gap-2 w-170 h-3/4 bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC] outline-2 outline-[#752092]">
      <div className="flex w-full h-12 border-b-2 border-b-[#F5F5F5]">
        <div
          className="sans flex flex-1 justify-center h-full pt-2 text-[#919191] hover:bg-[#F5F5F5] cursor-pointer transition-colors duration-300"
          onClick={() => setTab("following")}
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
          onClick={() => setTab("followers")}
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
        {user ? (
          <UserInfo
            user={user}
            navigate={() => navigate(`/${user.username}`)}
            button={{
              text: true ? Strings.following : Strings.follow,
              onClick: (e) => {
                e.stopPropagation();
              },
              focused: true ? true : false,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
