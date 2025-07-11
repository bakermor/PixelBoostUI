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

  children?: ReactNode;

  name?: string;
  focused?: boolean;
  variant?: string;
  size?: "2xs" | "xs" | "small" | "large";
  align?: "left" | "right" | "center";
}

interface NewIconButtonProps {
  onClick: React.MouseEventHandler<any>;
  children?: ReactNode;

  focused?: boolean;
  variant?: string;
  disabled?: boolean;
}

export const NewDefaultButton = (props: NewButtonProps) => {
  const variantStyles: Record<string, string> = {
    default:
      "rounded-xl border-3 bg-[#C957BC] border-[#752092] text-[#FFFFFC] hover:bg-[#FFC872] hover:border-[#FFC872] hover:text-[#752092]",
    inverted:
      "rounded-xl border-3 bg-[#FFC872] border-[#FFC872] text-[#752092] hover:bg-[#C957BC] hover:border-[#752092] hover:text-[#FFFFFC]",
    light_invert:
      "rounded-xl border-3 bg-[#FFF0A6] border-[#FFC872] text-[#752092] hover:bg-[#FFC872]",
    delete1:
      "rounded-xl bg-[#FBC0E5] text-[#C957BC] hover:bg-[#752092] hover:text-[#FFFFFC]",
    delete2:
      "rounded-xl bg-[#FFC872] text-[#752092] hover:bg-[#752092] hover:text-[#FFFFFC]",
    dropdown:
      "outline-3 bg-[#FBC0E5] text-[#752092] outline-[#C957BC] hover:bg-[#C957BC] hover:text-[#FFFFFC]",
    dropdown_ph:
      "outline-3 bg-[#FBC0E5] text-[#C957BC] outline-[#C957BC] hover:bg-[#C957BC] hover:text-[#FFFFFC]",
  };

  const handleClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    props.onClick(e);
  };

  return (
    <button
      className={`flex w-full items-center cursor-pointer transition-colors duration-300 ${
        variantStyles[props.variant ?? "default"] ?? variantStyles.default
      }`}
      onClick={handleClick}
      name={props.name}
    >
      <div
        className={`flex-1 flex items-center px-3 py-0.5 gap-1 ${
          props.size
            ? props.size === "large"
              ? "h-13"
              : props.size === "small"
              ? "h-9.5"
              : props.size === "xs"
              ? "h-7.5"
              : "h-6.5"
            : "h-11"
        }`}
      >
        <div
          className={`sans w-full flex whitespace-nowrap leading-none ${
            props.align === "left" ? "justify-start" : "justify-center"
          }`}
        >
          {props.text}
        </div>
        {props.children}
      </div>
    </button>
  );
};

export const SmallButton = (props: NewButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center rounded-sm cursor-pointer ${
        props.variant === "activity"
          ? "w-24 h-7 bg-[#FBC0E5] hover:bg-[#C957BC] text-[#C957BC] hover:text-[#FFFFFC]"
          : props.focused
          ? "w-48 h-8 bg-[#C957BC] hover:bg-[#FFC872] text-[#FFFFFC] hover:text-[#752092]"
          : "w-48 h-8 bg-[#FFC872] hover:bg-[#C957BC] text-[#752092] hover:text-[#FFFFFC]"
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
      className={
        props.variant === "edit"
          ? "flex max-h-7 max-w-7 min-w-7 min-h-7 items-center justify-center rounded-xs cursor-pointer outline-3 mt-1 bg-[#FFF0A6] text-[#C957BC] outline-[#C957BC] hover:bg-[#C957BC] hover:outline-[#752092] hover:text-[#752092] transition-colors duration-300"
          : props.variant === "add"
          ? props.focused
            ? "flex h-6 w-11 min-w-7 min-h-7 items-center justify-center rounded-xs cursor-pointer bg-[#C957BC] text-[#752092]"
            : "flex h-6 w-11 min-w-7 min-h-7 items-center justify-center rounded-xs cursor-pointer bg-[#FBC0E5] text-[#C957BC] hover:bg-[#C957BC] hover:text-[#752092] transition-colors duration-300"
          : "flex h-7 w-7 min-w-7 min-h-7 items-center justify-center rounded-xs cursor-pointer outline-3 bg-[#FFF0A6] text-[#FFC872] outline-[#FFC872] hover:bg-[#FFC872] hover:outline-[#C957BC] hover:text-[#C957BC] transition-colors duration-300"
      }
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};
