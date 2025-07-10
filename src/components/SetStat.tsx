import { useEffect, useRef, useState } from "react";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";
import { HealthLevels } from "../models/User";
import { DefaultIconButton } from "./Buttons";

interface Props {
  stat: keyof HealthLevels;
  level: number;
  onClick: (stat: keyof HealthLevels, value: number) => void;
}

interface DragStatProps {
  stat: keyof HealthLevels;
  level: number;
  onClick: (stat: keyof HealthLevels, value: number) => void;
}

interface LevelDisplayProps {
  level: number;
}

export const SetStat = (props: Props) => {
  useEffect(() => {}, [props]);

  return (
    <div className="w-full flex flex-col" style={{ gap: pxl * 20 }}>
      <div className="w-full flex items-center" style={{ gap: pxl * 50 }}>
        <div
          className="flex justify-start leading-none"
          style={{
            marginTop: pxl * 2,
            paddingLeft: pxl * 15,
            width: pxl * 140,
            height: pxl * 26,
            fontSize: pxl * 24,
            fontFamily: "'pxlLarge', monospace",
            color: Colors.p6,
          }}
        >
          {Strings[props.stat]}
        </div>
        <div
          className="flex items-center"
          style={{ gap: pxl * 5, marginRight: pxl * 20 }}
        >
          <DefaultIconButton
            onClick={() => {
              props.onClick(props.stat, -5);
            }}
            disabled={props.level <= 0}
            size={[46]}
            colors={[Colors.a3, Colors.a4, Colors.a2]}
          />
          <DragStat {...props} />
          <DefaultIconButton
            onClick={() => {
              props.onClick(props.stat, 5);
            }}
            disabled={props.level >= 100}
            size={[46]}
            colors={[Colors.a3, Colors.a4, Colors.a2]}
          />
        </div>
        <LevelDisplay {...props} />
      </div>
      <div
        className="w-full"
        style={{ height: pxl * 5, backgroundColor: Colors.p3 }}
      />
    </div>
  );
};

const DragStat = (props: DragStatProps) => {
  const width = Math.floor((props.level / 100) * 810) * pxl;

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    // Outside the stat bar
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setOffset(e.clientX - rect.left - width);
    setIsDragging(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newWidth = e.clientX - rect.left - offset;
    newWidth = Math.max(0, Math.min(rect.width, newWidth));

    const newLevel =
      ((Math.round(newWidth / pxl) * pxl - width) * 100) / 810 / pxl;
    props.onClick(props.stat, newLevel);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="flex overflow-clip relative"
      style={{
        width: pxl * 820,
        height: pxl * 50,
        borderWidth: pxl * 5,
        borderColor: Colors.a6,
        backgroundColor: Colors.a1,
      }}
      ref={containerRef}
    >
      <div
        className="h-full"
        style={{
          width: width,
          position: "absolute",
          left: 0,
          top: 0,
          backgroundColor:
            props.level > 65
              ? Colors.green
              : props.level > 27
              ? Colors.yellow
              : Colors.red,
        }}
      />

      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 h-full cursor-ew-resize"
        style={{
          width: pxl * 10,
          left: width - pxl * 5,
          backgroundColor:
            props.level > 65
              ? Colors.green
              : props.level > 27
              ? Colors.yellow
              : Colors.red,
        }}
      />
    </div>
  );
};

const LevelDisplay = (props: LevelDisplayProps) => {
  return (
    <div
      className="flex justify-between items-center pointer-events-none"
      style={{
        width: pxl * 120,
        height: pxl * 54,
        padding: pxl * 5,
        borderWidth: pxl * 5,
        borderColor: Colors.p5,
        backgroundColor: Colors.p3,
      }}
    >
      <div
        className="flex-1 flex justify-center leading-none"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
          color: Colors.a6,
        }}
      >
        {`${Math.floor(props.level)}${Strings.level_display}`}
      </div>
    </div>
  );
};
