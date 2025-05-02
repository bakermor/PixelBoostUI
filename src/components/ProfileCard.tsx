import { useEffect, useState } from "react";
import { updateUser, User } from "../api/AuthApi";
import { Strings } from "../constants/Strings";
import { CardEditButton, SettingsButton } from "./Buttons";

interface ProfileCardProps {
  user: User | undefined;
  edit?: boolean;
  setModal: () => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const pxl = window.innerWidth / 1920;

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
    <div
      className="flex flex-col bg-gray-600"
      style={{ width: pxl * 400, padding: pxl * 15, gap: pxl * 15 }}
    >
      <div
        className="w-full flex items-end"
        style={{
          height: pxl * 65,
          gap: pxl * 10,
        }}
      >
        <input
          className={`flex-1 flex justify-start items-center leading-none whitespace-nowrap overflow-clip outline-none text-gray-400 ${
            edit ? "" : "cursor-default border-gray-400"
          }`}
          style={{
            height: pxl * 59,
            paddingLeft: pxl * 12,
            fontSize: pxl * 36,
            fontFamily: "'pxlLarge', monospace",
            borderWidth: edit ? pxl * 5 : 0,
          }}
          title={name ?? null}
          placeholder={edit ? Strings.in_name_desc : ""}
          readOnly={!edit}
          value={name}
          onChange={handleChange}
        />
        <div
          className="flex h-full items-center"
          style={{ paddingTop: pxl * 10 }}
        >
          <CardEditButton onClick={edit ? handleSave : startEdit} />
        </div>
      </div>
      <div className="w-full bg-gray-300" style={{ height: pxl * 370 }}></div>
      <div
        className="w-full flex flex-col"
        style={{
          gap: pxl * 15,
          marginTop: pxl * 5,
          marginBottom: pxl * 5,
        }}
      >
        <div className="w-full flex items-end" style={{ height: pxl * 20 }}>
          <div
            className="flex leading-none text-gray-300"
            style={{
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            @{props.user?.username}
          </div>
        </div>
        <div
          className="w-full flex bg-gray-500"
          style={{ height: pxl * 12, gap: pxl * 20 }}
        >
          <div className="flex bg-gray-500" style={{ gap: pxl * 5 }}>
            <div
              className="flex leading-none text-gray-500"
              style={{
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
              }}
            ></div>
            <div
              className="flex leading-none text-gray-500"
              style={{
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
              }}
            ></div>
          </div>
          <div className="flex bg-gray-500" style={{ gap: pxl * 5 }}>
            <div
              className="flex leading-none text-gray-500"
              style={{
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
              }}
            ></div>
            <div
              className="flex leading-none text-gray-500"
              style={{
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        className="w-full flex items-center overflow-clip"
        style={{ height: pxl * 24, gap: pxl * 5, marginBottom: pxl * 10 }}
      >
        <div
          className="flex leading-none text-gray-400"
          style={{
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
          title={props.user?.current_activity?.name ?? undefined}
        >
          {Strings.activity}
        </div>
        <div
          className="flex leading-none whitespace-nowrap text-gray-300"
          style={{
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {props.user?.current_activity?.name ?? ""}
        </div>
      </div>
      <SettingsButton text="my_activity" onClick={props.setModal} />
    </div>
  );
};
