import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "../models/User";
import { AvatarContainer } from "../components/avatar/AvatarContainer";
import { NewSideBar } from "../components/SideBar";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { username } = useParams();

  useEffect(() => {
    //get user from username
  }, []);

  return (
    <div className="w-screen h-screen flex bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC]">
      <NewSideBar />
      {user ? <UserProfileCard user={user} /> : null}
      <div className="flex-1 flex flex-col h-full py-28 pr-10 pl-4">
        <AvatarContainer />
      </div>
    </div>
  );
};

export default UserProfile;

interface Props {
  user: User;
}

const UserProfileCard = (props: Props) => {
  const updateFollow = () => {};

  return (
    <div className="h-full w-96 p-6 flex">
      <div className="flex-1 flex flex-col gap-4 items-center bg-linear-to-t from-[#FFF0A6] from-80% to-[#FFC872] outline-3 outline-[#FFC872] py-4">
        <div className="flex flex-col gap-3">
          <div className="w-[310px] h-80 bg-[#FFFEE0] outline-3 outline-[#C957BC]" />
          <div className="flex w-full justify-end gap-2 items-center">
            <MoreHorizIcon className="bg-[#FFD785] outline-4 outline-[#FFD785] rounded-sm text-[#752092] cursor-pointer hover:bg-[#FFC872] hover:outline-[#FFC872] transition-colors duration-300" />
            <SmallButton text={Strings.follow} onClick={updateFollow} />
          </div>
        </div>
        <div className="kameron px-5 mt-2 w-full leading-none whitespace-nowrap font-semibold text-3xl text-[#752092]">
          {props.user.name}
        </div>
        <div className="px-5 w-full flex flex-col gap-1.5">
          <div className="sans w-full leading-none whitespace-nowrap font-semibold text-[#C957BC]">
            @{props.user.username}
          </div>
          <div className="flex w-full items-center h-4 rounded-sm cursor-pointer bg-[#FFD785] kameron font-semibold text-xs text-[#752092]">
            <div className="flex-1 h-full rounded-sm flex items-center justify-center leading-none whitespace-nowrap hover:bg-[#FFC872] transition-colors duration-300">
              0 {Strings.followers}
            </div>
            <div className="flex-1 h-full rounded-sm flex items-center justify-center leading-none whitespace-nowrap hover:bg-[#FFC872] transition-colors duration-300">
              0 {Strings.following}
            </div>
          </div>
        </div>
      </div>
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
      className={`flex justify-center items-center w-48 h-8 rounded-sm cursor-pointer ${
        props.focused
          ? "bg-[#C957BC] hover:bg-[#FFC872] text-[#FFFFFC] hover:text-[#752092]"
          : "bg-[#FFC872] hover:bg-[#C957BC] text-[#752092] hover:text-[#FFFFFC]"
      }  transition-colors duration-300`}
      onClick={props.onClick}
    >
      <div className="sans leading-none text-sm">{props.text}</div>
    </button>
  );
};
