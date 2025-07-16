import { Strings } from "../constants/Strings";

interface Props {
  name: string;
  type: string;
  warning?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  variant?: string;
}

export const Input = (props: Props) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="w-full flex justify-between gap-2 text-md">
        <div className="sans flex items-end leading-none text-[#752092]">
          {Strings[`in_${props.name}`]}
        </div>
        {props.warning !== "" ? (
          <div className="sans h-full flex-1 flex justify-end leading-none text-[#C957BC]">
            {props.warning}
          </div>
        ) : null}
      </div>
      <div
        className={`w-full flex p-1.5 rounded-lg border-3 ${
          props.variant === "activity"
            ? "bg-[#FFF0A6] border-[#FFC872] hover:border-[#C957BC] focus-within:!border-[#C957BC]"
            : props.variant === "action"
            ? "bg-[#FFFEE0] border-[#C957BC] hover:border-[#752092] focus-within:!border-[#752092]"
            : "border-[#C957BC] hover:border-[#752092] focus-within:!border-[#752092]"
        } transition-colors duration-300`}
      >
        <input
          className="sans flex-1 outline-none p-1.5 placeholder-[#C957BC] text-[#752092]"
          name={props.name}
          type={props.type}
          placeholder={Strings[`in_${props.name}_desc`]}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </div>
  );
};
