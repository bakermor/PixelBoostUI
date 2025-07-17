import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { updateUser } from "../api/AuthApi";
import { Strings } from "../constants/Strings";
import { User } from "../models/User";
import { IconButton, NewDefaultButton, SmallButton } from "./Buttons";

interface Props {
  user?: User;
  onClick: (modal: string) => void;

  edit?: boolean;
}

interface ProfileProps {
  user: User;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  modal: (modal: string) => void;
  me?: User;
}

export const ProfileCard = (props: Props) => {
  const [edit, setEdit] = useState(props.edit ?? false);
  const [name, setName] = useState(props.user?.name ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const startEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    setEdit(false);
    if (props.user && props.user.name != name) {
      const result = await updateUser(props.user.id, { name: name });
      if (result.status !== 200) console.log(result);
    }
  };

  useEffect(() => {}, [props]);

  return (
    <div className="h-full w-88 p-2 flex">
      <div className="flex-1 flex flex-col gap-4 items-center bg-linear-to-t from-[#FFF0A6] from-80% to-[#FFC872] outline-3 outline-[#FFC872] py-4">
        <div className="w-full flex justify-between items-center gap-5 px-5">
          <input
            className={`kameron mt-2 p-0.5 w-full leading-none whitespace-nowrap overflow-clip font-semibold text-3xl text-[#752092] ${
              edit
                ? "outline-3 outline-[#C957BC] cursor-text"
                : "cursor-default outline-none"
            }`}
            title={name ?? null}
            placeholder={edit ? Strings.in_name_desc : ""}
            readOnly={!edit}
            value={name}
            onChange={handleChange}
          />
          <IconButton onClick={edit ? handleSave : startEdit} variant="edit">
            {edit ? <DoneOutlineIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="w-[310px] h-80 bg-[#FFFEE0] outline-3 outline-[#C957BC]" />
        {props.user ? (
          <div className="w-full flex flex-col gap-6 items-center px-5">
            <div className="w-full flex flex-col gap-1.5">
              <div className="sans w-full leading-none whitespace-nowrap font-semibold text-[#C957BC]">
                @{props.user.username}
              </div>
              <div className="flex w-full items-center h-4 rounded-sm cursor-pointer bg-[#FFD785] kameron font-semibold text-xs text-[#752092]">
                <div
                  className="flex-1 h-full rounded-sm flex items-center justify-center leading-none whitespace-nowrap hover:bg-[#FFC872] transition-colors duration-300"
                  onClick={() => props.onClick("following")}
                >
                  {props.user.following.length} {Strings.following}
                </div>
                <div
                  className="flex-1 h-full rounded-sm flex items-center justify-center leading-none whitespace-nowrap hover:bg-[#FFC872] transition-colors duration-300"
                  onClick={() => props.onClick("followers")}
                >
                  {props.user.followers.length} {Strings.followers}
                </div>
              </div>
            </div>
            <div
              className="flex w-full gap-1"
              title={props.user.current_activity?.name ?? undefined}
            >
              <div className="sans leading-none whitespace-nowrap text-[#752092]">
                {Strings.activity}
              </div>
              <div className="sans leading-none whitespace-nowrap text-[#C957BC]">
                {props.user.current_activity?.name}
              </div>
            </div>
            <NewDefaultButton
              text={Strings.my_activity}
              onClick={() => props.onClick("activities")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const UserProfileCard = (props: ProfileProps) => {
  return (
    <div className="h-full w-96 p-6 flex">
      <div className="flex-1 flex flex-col gap-4 items-center bg-linear-to-t from-[#FFF0A6] from-80% to-[#FFC872] outline-3 outline-[#FFC872] py-4">
        <div className="flex flex-col gap-3">
          <div className="w-[310px] h-80 bg-[#FFFEE0] outline-3 outline-[#C957BC]" />
          {props.user.id != props.me?.id ? (
            <div className="flex w-full justify-end gap-2 items-center">
              <MoreHorizIcon className="bg-[#FFD785] outline-4 outline-[#FFD785] rounded-sm text-[#752092] cursor-pointer hover:bg-[#FFC872] hover:outline-[#FFC872] transition-colors duration-300" />
              <SmallButton
                text={
                  props.me?.following.includes(props.user.id)
                    ? Strings.following
                    : Strings.follow
                }
                onClick={props.onClick}
                focused={props.me?.following.includes(props.user.id)}
              />
            </div>
          ) : (
            <div className="w-full h-4" />
          )}
        </div>
        <div className="kameron px-5 mt-2 w-full leading-none whitespace-nowrap font-semibold text-3xl text-[#752092]">
          {props.user.name}
        </div>
        <div className="px-5 w-full flex flex-col gap-1.5">
          <div className="sans w-full leading-none whitespace-nowrap font-semibold text-[#C957BC]">
            @{props.user.username}
          </div>
          <div className="flex w-full items-center h-4 rounded-sm cursor-pointer bg-[#FFD785] kameron font-semibold text-xs text-[#752092]">
            <div
              className="flex-1 h-full rounded-sm flex items-center justify-center leading-none whitespace-nowrap hover:bg-[#FFC872] transition-colors duration-300"
              onClick={() => props.modal("following")}
            >
              {props.user.following.length} {Strings.following}
            </div>
            <div
              className="flex-1 h-full rounded-sm flex items-center justify-center leading-none whitespace-nowrap hover:bg-[#FFC872] transition-colors duration-300"
              onClick={() => props.modal("followers")}
            >
              {props.user.followers.length} {Strings.followers}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
