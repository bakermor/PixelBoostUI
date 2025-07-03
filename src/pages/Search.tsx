import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../api/AuthApi";
import { NewSideBar } from "../components/SideBar";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";

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
            onClick={(e) => {
              e.stopPropagation();
              followUser();
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Search;

interface Props {
  val: string;
  change: (search: string) => void;
}

const SearchBar = (props: Props) => {
  return (
    <div className="flex items-center w-full h-9 p-0.5 px-3 gap-3 rounded-full bg-[#FFFFFC] outline-2 outline-gray-400 focus-within:outline-[#C957BC] transition-colors duration-300">
      <SearchIcon className="text-gray-400" />
      <input
        className="flex-1 outline-none sans leading-none text-sm placeholder:text-gray-400"
        placeholder={Strings.search_ph}
        value={props.val}
        onChange={(e) => props.change(e.currentTarget.value)}
      />
    </div>
  );
};

interface InfoProps {
  user: User;
  navigate: () => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  following?: boolean;
}

const UserInfo = (props: InfoProps) => {
  return (
    <div
      className="flex justify-between items-center w-full h-14 gap-3 bg-[#FFFFFC] hover:bg-[#F5F5F5] cursor-pointer p-3 transition-colors duration-300"
      onClick={props.navigate}
    >
      <div className="flex gap-4">
        <div className="h-8 w-8 bg-[#FFFEE0] outline-2 outline-[#752092]" />
        <div className="flex flex-col gap-0.5 justify-center">
          <div className="sans leading-none whitespace-nowrap text-sm text-[#752092]">
            {props.user.name}
          </div>
          <div className="kameron leading-none font-semibold whitespace-nowrap text-xs text-[#C957BC]">
            @{props.user.username}
          </div>
        </div>
      </div>
      {props.following ? (
        <SmallButton text={Strings.following} onClick={props.onClick} focused />
      ) : (
        <SmallButton text={Strings.follow} onClick={props.onClick} />
      )}
    </div>
  );
};

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  focused?: boolean;
}

const SmallButton = (props: ButtonProps) => {
  return (
    <button
      className={`group flex justify-center items-center w-32 h-8 rounded-sm cursor-pointer ${
        props.focused ? "bg-[#C957BC]" : "bg-[#FBC0E5]"
      } hover:bg-[#C957BC] text-[#752092] hover:text-[#FFFFFC] transition-colors duration-300`}
      onClick={props.onClick}
    >
      <div className="sans leading-none text-sm">{props.text}</div>
    </button>
  );
};
