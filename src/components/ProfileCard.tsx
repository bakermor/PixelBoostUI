import { useEffect } from "react";
import { User } from "../api/UserApi";
import { SettingsButton } from "./Buttons";

interface ProfileCardProps {
  user: User | undefined;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const pxl = window.innerWidth / 1920;

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
          paddingLeft: pxl * 12,
          paddingRight: pxl * 12,
        }}
      >
        <div
          className="flex justify-start leading-none whitespace-nowrap overflow-clip text-gray-400"
          style={{
            height: pxl * 39,
            fontSize: pxl * 36,
            fontFamily: "'pxlLarge', monospace",
          }}
          title={props.user?.name}
        >
          {props.user?.name}
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
          title={props.user?.current_activity.name}
        >
          activity:
        </div>
        <div
          className="flex leading-none whitespace-nowrap text-gray-300"
          style={{
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {props.user?.current_activity.name}
        </div>
      </div>
      <SettingsButton text="set_activity" onClick={() => {}} />
    </div>
  );
};
