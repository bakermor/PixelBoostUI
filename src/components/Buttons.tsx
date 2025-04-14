import { STR } from "../constants/Strings";

interface FormButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const FormButton = (props: FormButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="w-full flex bg-gray-400"
      style={{ height: pxl * 75, marginTop: pxl * 15 }}
    >
      <button
        className="flex-1 flex justify-center items-center cursor-pointer"
        onClick={props.onClick}
      >
        <div
          className="w-full flex items-start"
          style={{ height: pxl * 35, marginTop: pxl * 5 }}
        >
          <div
            className="w-full h-full flex leading-none justify-center items-center text-white"
            style={{
              fontSize: pxl * 15.507,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {STR.get(props.text)}
          </div>
        </div>
      </button>
    </div>
  );
};
