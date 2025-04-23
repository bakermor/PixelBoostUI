import { Strings } from "../constants/Strings";
import { SubmitButton } from "./pixel/SubmitButton";

interface ButtonProps {
  name?: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface IconButtonProps {
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
      className="w-full bg-gray-500 hover:bg-gray-600 items-center cursor-pointer"
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
      className="w-full bg-gray-500 hover:bg-gray-600 items-center cursor-pointer"
      onClick={props.onClick}
      name={props.text}
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

export const ActionButton = (props: ButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <button
      className="w-full bg-gray-300 hover:bg-gray-400 items-center cursor-pointer text-gray-500 hover:text-gray-600"
      style={{ marginLeft: pxl * 5, marginRight: pxl * 5 }}
      onClick={props.onClick}
    >
      <div
        className="w-full flex items-center"
        style={{
          paddingLeft: pxl * 15,
          paddingRight: pxl * 15,
          height: pxl * 50,
        }}
      >
        <div
          className="w-full flex whitespace-nowrap overflow-clip leading-none "
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {props.text}
        </div>
      </div>
    </button>
  );
};

export const SwitchFormButton = (props: ButtonProps) => {
  const pxl = window.innerWidth / 1920;
  return (
    <button
      className="absolute top-0 bg-gray-300 flex justify-center items-center cursor-pointer"
      style={{ width: pxl * 120, height: pxl * 30, right: pxl * 5 }}
      onClick={props.onClick}
      name={props.name}
      value={props.text}
    >
      <div
        className="flex justify-start leading-none text-gray-500"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {Strings[props.text]}
      </div>
    </button>
  );
};

export const ExitModalButton = (props: IconButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 absolute cursor-pointer"
      style={{
        right: pxl * 5,
        top: pxl * 5,
        width: pxl * 40,
        height: pxl * 40,
      }}
      onClick={props.onClick}
    />
  );
};

export const AddNewButton = (props: IconButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <button
      className="bg-gray-400 hover:bg-gray-500 cursor-pointer"
      style={{
        width: pxl * 50,
        height: pxl * 30,
      }}
      onClick={props.onClick}
    />
  );
};
