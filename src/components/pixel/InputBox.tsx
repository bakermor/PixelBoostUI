import { ReactNode } from "react";

interface InputBoxProps {
  children: ReactNode;
}

export const InputBox = (props: InputBoxProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div className="flex-1 flex flex-col">
      <div
        className="w-full flex"
        style={{
          height: pxl * 5,
        }}
      >
        <div className="flex-1 bg-gray-400" />
      </div>
      <div className="w-full flex" style={{ height: pxl * 5 }}>
        <div className="bg-gray-400" style={{ width: pxl * 5 }} />
        <div className="flex-1 bg-gray-600" />
        <div className="bg-gray-400" style={{ width: pxl * 5 }} />
      </div>
      <div className="flex-1 flex">
        <div className=" bg-gray-400" style={{ width: pxl * 5 }} />
        <div className=" bg-gray-600" style={{ width: pxl * 5 }} />
        <div className="flex-1 flex bg-gray-200" style={{ padding: pxl * 5 }}>
          {props.children}
        </div>
        <div className="bg-gray-50" style={{ width: pxl * 5 }} />
        <div className="bg-gray-400" style={{ width: pxl * 5 }} />
      </div>
      <div className="w-full flex" style={{ height: pxl * 5 }}>
        <div className="bg-gray-400" style={{ width: pxl * 5 }} />
        <div className="flex-1 bg-gray-50" />
        <div className="bg-gray-400" style={{ width: pxl * 5 }} />
      </div>
      <div
        className="w-full flex"
        style={{
          height: pxl * 5,
        }}
      >
        <div className="flex-1 bg-gray-400" />
      </div>
    </div>
  );
};
