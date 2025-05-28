import { useEffect, useState } from "react";
import { updateUser, User } from "../api/AuthApi";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";
import { DefaultButton, DefaultIconButton } from "./Buttons";

interface ProfileCardProps {
  user: User | undefined;
  edit?: boolean;
  setModal: () => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
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
      className="flex flex-col"
      style={{
        width: pxl * 400,
        padding: pxl * 15,
        gap: pxl * 15,
        backgroundColor: Colors.a5,
      }}
    >
      <div
        className="w-full flex items-end"
        style={{
          height: pxl * 65,
          gap: pxl * 10,
        }}
      >
        <input
          className={`flex-1 flex justify-start items-center leading-none whitespace-nowrap overflow-clip outline-none ${
            edit ? "" : "cursor-default"
          }`}
          style={{
            height: pxl * 59,
            paddingLeft: pxl * 12,
            fontSize: pxl * 36,
            fontFamily: "'pxlLarge', monospace",
            borderWidth: edit ? pxl * 5 : 0,
            borderColor: Colors.p4,
            color: Colors.p4,
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
          <DefaultIconButton
            onClick={edit ? handleSave : startEdit}
            colors={[Colors.a3, Colors.a2]}
          />
        </div>
      </div>
      <div
        className="w-full"
        style={{ height: pxl * 370, backgroundColor: Colors.a2 }}
      ></div>
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
            className="flex leading-none"
            style={{
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
              color: Colors.a2,
            }}
          >
            @{props.user?.username}
          </div>
        </div>
        <div
          className="w-full flex"
          style={{
            height: pxl * 12,
            gap: pxl * 20,
            backgroundColor: Colors.a3,
          }}
        >
          <div
            className="flex"
            style={{ gap: pxl * 5, backgroundColor: Colors.a3 }}
          >
            <div
              className="flex leading-none"
              style={{
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
                color: Colors.a3,
              }}
            ></div>
            <div
              className="flex leading-none"
              style={{
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
                color: Colors.a3,
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
          className="flex leading-none"
          style={{
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
            color: Colors.p4,
          }}
          title={props.user?.current_activity?.name ?? undefined}
        >
          {Strings.activity}
        </div>
        <div
          className="flex leading-none whitespace-nowrap"
          style={{
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
            color: Colors.a2,
          }}
        >
          {props.user?.current_activity?.name ?? ""}
        </div>
      </div>
      <DefaultButton
        text={Strings.my_activity}
        onClick={props.setModal}
        colors={[Colors.a3, Colors.a4, Colors.p1]}
      />
    </div>
  );
};
