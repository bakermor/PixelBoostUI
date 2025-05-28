import { Strings } from "../constants/Strings";
import { pxl } from "../constants/ThemeConstants";

interface ButtonProps {
  text: string;
  name?: string;
  onClick: React.MouseEventHandler<any>;

  colors: string[];
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
