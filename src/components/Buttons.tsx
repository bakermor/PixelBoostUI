import { ReactNode } from "react";
import { Strings } from "../constants/Strings";
import { pxl } from "../constants/ThemeConstants";

interface ButtonProps {
  text: string;
  name?: string;
  onClick: React.MouseEventHandler<any>;

  colors: string[];
  variant?: string;
  size?: number;

  focused?: boolean;
  alignLeft?: boolean;
  icon?: {
    onClick: () => void;
    colors: string[];
  };
}

interface IconButtonProps {
  onClick: React.MouseEventHandler<any>;

  colors: string[];
  size?: number[];

  disabled?: boolean;
}

export const DefaultButton = (props: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    props.onClick(e);
  };

  return (
    <button
      style={
        {
          "--main-color": props.focused ? props.colors[1] : props.colors[0],
          "--hover-color": props.colors[1],
          "--text-color": props.focused
            ? props.colors[3] ?? props.colors[2]
            : props.colors[2],
          "--text-hover": props.colors[3] ?? props.colors[2],
          marginRight: props.icon ? `${pxl * 5}px` : null,
          marginLeft: props.icon ? `${pxl * 5}px` : null,
        } as React.CSSProperties & Record<string, string>
      }
      className="clickable w-full items-center cursor-pointer"
      onClick={handleClick}
      name={props.name}
    >
      <div
        className="flex-1 flex items-center"
        style={{
          height: pxl * (props.size ?? 60),
          paddingLeft: pxl * 10,
          paddingRight: pxl * 10,
          gap: pxl * 10,
        }}
      >
        <div
          className="w-full flex whitespace-nowrap overflow-clip leading-none"
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
            justifyContent: props.alignLeft ? undefined : "center",
          }}
        >
          {props.text}
        </div>
        {props.icon ? (
          <DefaultIconButton
            onClick={props.icon.onClick}
            size={[30]}
            colors={props.icon.colors}
          />
        ) : null}
      </div>
    </button>
  );
};

export const DefaultIconButton = (props: IconButtonProps) => {
  const handleClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    props.onClick(e);
  };

  return (
    <div
      className={`clickable ${props.disabled ? null : "cursor-pointer"}`}
      style={
        {
          width: `${pxl * (props.size ? props.size[0] : 36)}px`,
          height: `${
            pxl * (props.size ? props.size[1] ?? props.size[0] : 36)
          }px`,
          "--main-color": props.disabled ? props.colors[2] : props.colors[0],
          "--hover-color": props.disabled ? props.colors[2] : props.colors[1],
        } as React.CSSProperties & Record<string, string>
      }
      onClick={handleClick}
    />
  );
};

export const AbsoluteButton = (props: ButtonProps) => {
  return (
    <button
      className="clickable absolute top-0 flex justify-center items-center cursor-pointer"
      style={
        {
          width: `${pxl * 120}px`,
          height: `${pxl * 30}px`,
          right: `${pxl * 5}px`,
          "--main-color": props.colors[0],
          "--hover-color": props.colors[1],
        } as React.CSSProperties & Record<string, string>
      }
      onClick={props.onClick}
      name={props.name}
      value={props.text}
    >
      <div
        className="flex justify-start leading-none"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
          color: props.colors[2],
        }}
      >
        {Strings[props.text]}
      </div>
    </button>
  );
};

interface NewButtonProps {
  text: string;
  onClick: React.MouseEventHandler<any>;

  name?: string;
  focused?: boolean;
  variant?: "default" | "inverted";
  icon?: {
    onClick: () => void;
    colors: string[];
  };
}

interface NewIconButtonProps {
  onClick: React.MouseEventHandler<any>;
  children?: ReactNode;

  variant?: "default";
  disabled?: boolean;
}

export const NewDefaultButton = (props: NewButtonProps) => {
  const handleClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    props.onClick(e);
  };

  return (
    <button
      className={`w-full items-center cursor-pointer rounded-xl border-3 ${
        props.variant === "inverted"
          ? "bg-[#FFC872] border-[#FFC872] text-[#752092] hover:bg-[#C957BC] hover:border-[#752092] hover:text-[#FFFFFC]"
          : "bg-[#C957BC] border-[#752092] text-[#FFFFFC] hover:bg-[#FFC872] hover:border-[#FFC872] hover:text-[#752092]"
      } transition-colors duration-300`}
      onClick={handleClick}
      name={props.name}
    >
      <div className="flex-1 flex items-center h-13 px-2 py-1 gap-1">
        <div className="sans w-full flex whitespace-nowrap leading-none justify-center">
          {props.text}
        </div>
        {props.icon ? (
          <DefaultIconButton
            onClick={props.icon.onClick}
            size={[30]}
            colors={props.icon.colors}
          />
        ) : null}
      </div>
    </button>
  );
};

export const SmallButton = (props: NewButtonProps) => {
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

export const IconButton = (props: NewIconButtonProps) => {
  const handleClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    props.onClick(e);
  };

  return (
    <div
      className={`flex min-w-7 min-h-7 mt-1 items-center justify-center rounded-xs cursor-pointer outline-3 bg-[#FFF0A6] text-[#C957BC] outline-[#C957BC] hover:bg-[#C957BC] hover:outline-[#752092] hover:text-[#752092] transition-colors duration-300`}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};
