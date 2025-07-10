import SearchIcon from "@mui/icons-material/Search";
import { KeyboardEventHandler } from "react";
import { Strings } from "../constants/Strings";

interface Props {
  val: string;
  change: (search: string) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  variant?: string;
}

export const SearchBar = (props: Props) => {
  return (
    <div
      className={`${
        props.variant == "modal" ? "h-7.5" : "h-9"
      } flex items-center w-full p-0.5 px-3 gap-3 rounded-full bg-[#FFFFFC] outline-2 outline-gray-400 focus-within:outline-[#C957BC] transition-colors duration-300`}
    >
      <SearchIcon className="text-gray-400" />
      <input
        className="flex-1 outline-none sans leading-none text-sm placeholder:text-gray-400"
        placeholder={Strings.search_ph}
        value={props.val}
        onChange={(e) => props.change(e.currentTarget.value)}
        onKeyDown={props.onKeyDown}
        onBlur={props.onBlur}
      />
    </div>
  );
};
