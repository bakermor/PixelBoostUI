import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsersFromSearch } from "../api/FollowApi";
import { SearchBar } from "../components/SearchBar";
import { SideBar } from "../components/SideBar";
import { UserInfo } from "../components/UserInfo";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";
import { User } from "../models/User";
import { debounce } from "../utils/helperFuncs";

const Search = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [search, setSearch] = useState(params.get("q") ?? "");
  const [results, setResults] = useState<User[] | undefined>(undefined);

  // Add search to params on keydown/blur
  const updateURL = (q: string) => {
    if (q) params.set("q", q);
    else params.delete("q");

    navigate({ search: params.toString() }, { replace: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") updateURL(search);
  };

  const handleBlur = () => {
    updateURL(search);
  };

  // Search on pause typing
  const searchUsers = async (q: string) => {
    if (q === "") setResults(undefined);
    else {
      try {
        const users = await getUsersFromSearch(q);
        if (users.status === 200) setResults(users.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const onPause = useMemo(() => debounce(searchUsers, 300), []);

  useEffect(() => {
    onPause(search);
  }, [search]);

  return (
    <div className="w-screen h-screen flex bg-linear-to-t from-[#FFFFFC] to-[#FFFEE0]">
      <SideBar focused="search" />
      <div className="flex-1 flex flex-col py-5 px-12 gap-2">
        <div className="flex pb-4">
          <SearchBar
            val={search}
            change={setSearch}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
        {results ? (
          results.length > 0 ? (
            results.map((item, index) => (
              <UserInfo
                key={index}
                user={item}
                button={
                  user?.id === item.id
                    ? undefined
                    : {
                        text: user?.following.includes(item.id)
                          ? Strings.following
                          : Strings.follow,
                        type: user?.following.includes(item.id)
                          ? "unfollow"
                          : "follow",

                        focused: user?.following.includes(item.id),
                      }
                }
              />
            ))
          ) : (
            <div className="">{Strings.no_results}</div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Search;
