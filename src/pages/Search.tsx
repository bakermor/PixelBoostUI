import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { NewSideBar } from "../components/SideBar";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";
import { UserInfo } from "../components/UserInfo";
import { SearchBar } from "../components/SearchBar";

const Search = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[] | undefined>(undefined);

  const searchUsers = () => {};
  const followUser = () => {};
  const unfollowUser = () => {};

  return (
    <div className="w-screen h-screen flex bg-linear-to-t from-[#FFFFFC] to-[#FFFEE0]">
      <NewSideBar focused="search" />
      <div className="flex-1 flex flex-col py-5 px-12 gap-5">
        <SearchBar val={search} change={setSearch} />
        {user ? (
          <UserInfo
            user={user}
            navigate={() => navigate(`/${user.username}`)}
            button={{
              text: Strings.follow,
              onClick: (e) => {
                e.stopPropagation();
                followUser();
              },
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Search;
