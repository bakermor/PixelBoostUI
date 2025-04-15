import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div className="flex-1 flex flex-col">
      <div
        className="w-full flex"
        style={{
          height: pxl * 5,
          paddingLeft: pxl * 10,
          paddingRight: pxl * 10,
        }}
      >
        <div className="flex-1 bg-gray-300" />
        <div className="bg-gray-500" style={{ width: pxl * 5 }} />
      </div>
      <div className="flex-1 flex">
        <div
          className="flex flex-col"
          style={{
            width: pxl * 5,
            paddingTop: pxl * 5,
            paddingBottom: pxl * 5,
          }}
        >
          <div className="flex-1 bg-gray-300" />
          <div className="bg-gray-500" style={{ height: pxl * 5 }} />
        </div>
        <div className="flex flex-col" style={{ width: pxl * 5 }}>
          <div className="bg-gray-300" style={{ height: pxl * 5 }} />
          <div className="flex-1 bg-gray-400" />
          <div className="bg-gray-500" style={{ height: pxl * 5 }} />
        </div>
        <div className="flex-1 flex bg-gray-400" style={{ padding: pxl * 5 }}>
          {props.children}
        </div>
        <div className="flex flex-col" style={{ width: pxl * 5 }}>
          <div className="bg-gray-500" style={{ height: pxl * 5 }} />
          <div className="flex-1 bg-gray-400" />
          <div className="bg-gray-600" style={{ height: pxl * 5 }} />
        </div>
        <div
          className="flex flex-col"
          style={{
            width: pxl * 5,
            paddingTop: pxl * 5,
            paddingBottom: pxl * 5,
          }}
        >
          <div className="flex-1 bg-gray-600" />
        </div>
      </div>
      <div
        className="w-full flex"
        style={{
          height: pxl * 5,
          paddingLeft: pxl * 10,
          paddingRight: pxl * 10,
        }}
      >
        <div className="flex-1 bg-gray-600" />
      </div>
    </div>
  );
};
