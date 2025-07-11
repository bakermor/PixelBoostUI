import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { followUser, getUsersFromSearch, unfollowUser } from "../api/FollowApi";
import { SearchBar } from "../components/SearchBar";
import { NewSideBar } from "../components/SideBar";
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

  const [me, setMe] = useState<User | undefined>(user);
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

  // Follow/unfollow users
  const onClick = (
    e: React.MouseEvent<any>,
    id: string,
    following: boolean
  ) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
    } else {
      if (following) follow(id);
      else unfollow(id);
    }
  };

  const follow = async (id: string) => {
    const result = await followUser(id);
    if (result.status === 200) {
      setMe(result.data);
    }
  };

  const unfollow = async (id: string) => {
    const result = await unfollowUser(id);
    if (result.status === 200) {
      setMe(result.data);
    }
  };

  useEffect(() => {
    onPause(search);
  }, [search]);

  return (
    <div className="w-screen h-screen flex bg-linear-to-t from-[#FFFFFC] to-[#FFFEE0]">
      <NewSideBar focused="search" />
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
                  me?.id === item.id
                    ? undefined
                    : {
                        text: me?.following.includes(item.id)
                          ? Strings.following
                          : Strings.follow,
                        onClick: (e) => {
                          onClick(
                            e,
                            item.id,
                            me?.following.includes(item.id) ? false : true
                          );
                        },
                        focused: me?.following.includes(item.id),
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
