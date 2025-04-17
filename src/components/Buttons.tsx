import { Strings } from "../constants/Strings";
import { SubmitButton } from "./pixel/SubmitButton";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const FormButton = (props: ButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="w-full flex"
      style={{ height: pxl * 75, marginTop: pxl * 15 }}
    >
      <SubmitButton>
        <button
          className="flex-1 flex justify-center items-center cursor-pointer"
          onClick={props.onClick}
        >
          <div
            className="w-full flex items-center"
            style={{ height: pxl * 35, marginTop: pxl * 5 }}
          >
            <div
              className="w-full flex leading-none justify-center text-white"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {Strings[props.text]}
            </div>
          </div>
        </button>
      </SubmitButton>
    </div>
  );
};

export const SettingsButton = (props: ButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <button
      className="w-full bg-gray-500 items-center cursor-pointer"
      onClick={props.onClick}
    >
      <div className="w-full flex items-center" style={{ height: pxl * 60 }}>
        <div
          className="w-full flex leading-none justify-center text-gray-300"
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {Strings[props.text]}
        </div>
      </div>
    </button>
  );
};

export const StatButton = (props: ButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <button
      className="w-full bg-gray-500 items-center cursor-pointer"
      onClick={props.onClick}
    >
      <div className="w-full flex items-center" style={{ height: pxl * 65 }}>
        <div
          className="w-full flex leading-none justify-center text-gray-300"
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {Strings[props.text]}
        </div>
      </div>
    </button>
  );
};
