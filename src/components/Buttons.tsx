import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<any>;

  children?: ReactNode;

  name?: string;
  focused?: boolean;
  variant?: string;
  size?: "2xs" | "xs" | "small" | "large";
  align?: "left" | "right" | "center" | "left_indent";
}

interface IconButtonProps {
  onClick: React.MouseEventHandler<any>;
  children?: ReactNode;

  focused?: boolean;
  variant?: string;
  disabled?: boolean;
}

export const DefaultButton = (props: ButtonProps) => {
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
    nav: "bg-[#FFF0A6] hover:bg-[#FFC872] outline-2 outline-[#FFC872] text-[#752092]",
    nav_sec:
      "bg-[#FFE497] hover:bg-[#FFC872] outline-2 outline-[#FFC872] text-[#752092]",
    nav_focus:
      "bg-[#FFD785] hover:bg-[#FFC872] outline-2 outline-[#FFC872] text-[#752092]",
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
            props.align === "left"
              ? "justify-start"
              : props.align === "left_indent"
              ? "justify-start pl-4"
              : "justify-center"
          }`}
        >
          {props.text}
        </div>
        {props.children}
      </div>
    </button>
  );
};

export const SmallButton = (props: ButtonProps) => {
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
      name={props.name}
    >
      <div className="sans leading-none text-sm">{props.text}</div>
    </button>
  );
};

export const IconButton = (props: IconButtonProps) => {
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
