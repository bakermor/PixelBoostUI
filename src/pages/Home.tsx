import { useNavigate } from "react-router-dom";
import sec2 from "../assets/action.png";
import sec3_1 from "../assets/activity.png";
import sec1 from "../assets/dashboard.png";
import sec4_2 from "../assets/friends2.png";
import sec3_3 from "../assets/set_levels.png";
import sec3_2 from "../assets/stat_settings.png";
import { DefaultButton } from "../components/Buttons";
import { Strings } from "../constants/Strings";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center bg-linear-to-t from-[#FFFFFC] to-[#FFFEE0] to-95% overflow-auto min-w-300">
      <div className="navbar flex relative items-center justify-center w-full min-h-14 ">
        <div className="kameron mt-3 leading-none whitespace-nowrap text-lg font-semibold text-[#C957BC]">
          {Strings.site}
        </div>
        <div className="absolute right-4 mt-2 w-28">
          <DefaultButton
            text={Strings.login}
            onClick={() => {
              navigate("/login");
            }}
            size="small"
            variant="delete2"
          />
        </div>
      </div>
      <div className="flex w-full p-10 gap-5 justify-between">
        <div className="flex-1 flex flex-col gap-8">
          <div className="kameron text-7xl pl-2 mt-6">
            {Strings.home_sec1_t}
          </div>
          <div className="sans text-xl pl-2 min-w-100 max-w-150">
            {Strings.home_sec1}
          </div>
          <div className="mt-2 w-44">
            <DefaultButton
              text={Strings.go_signup}
              onClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>
        <img src={sec1} className="max-w-[720px] object-contain" />
      </div>
      <div className="flex w-full py-5 px-10 gap-10 items-center">
        <div className="flex-1 h-1 bg-[#C957BC]" />
        <div className="kameron text-6xl min-w-185">{Strings.home_sec2_t}</div>
      </div>
      <div className="flex w-full pt-0 p-8 gap-20 justify-between">
        <img
          src={sec2}
          className="outline-3 outline-[#752092] max-w-[540px] object-contain pt-2 pr-1 ml-14 mb-12"
        />
        <div className="flex-1 flex flex-col pt-6 justify-between min-w-100">
          <div className="sans text-xl px-3">{Strings.home_sec2}</div>
          <div className="w-full h-1 mb-12 bg-[#C957BC]" />
        </div>
      </div>
      <div className="flex w-full justify-between px-20 gap-2">
        <div className="flex-1 flex flex-col gap-4 items-center">
          <img
            src={sec3_1}
            width={350}
            className="outline-3 outline-[#752092] p-3 object-contain"
          />
          <div className="sans text-center text-lg px-5">
            {Strings.home_sec3_1}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center">
          <img
            src={sec3_2}
            width={350}
            className="outline-3 outline-[#752092] p-3 object-contain"
          />
          <div className="sans text-center text-lg px-5">
            {Strings.home_sec3_2}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center">
          <img
            src={sec3_3}
            width={350}
            className="outline-3 outline-[#752092] p-3 object-contain"
          />
          <div className="sans text-center text-lg px-5">
            {Strings.home_sec3_3}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 px-10">
        <div className="w-full h-1 mt-10 bg-[#C957BC]" />
        <div className="flex flex-col w-full gap-10 ml-10 mb-10">
          <div className="kameron text-6xl mt-6 max-w-140 ">
            {Strings.home_sec4_t}
          </div>
          <img
            src={sec4_2}
            width={600}
            className="ml-4 outline-3 outline-[#752092] object-contain"
          />
          <div className="w-60 ml-4">
            <DefaultButton
              text={Strings.signup}
              onClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
