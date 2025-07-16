import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../api/AuthApi";
import login from "../assets/login.png";
import { NewDefaultButton } from "../components/Buttons";
import { Input } from "../components/Input";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState<Record<string, string>>({
    username: "",
    password: "",
  });

  const [warnings, setWarnings] = useState<Record<string, string>>({
    invalid: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.value !== "") changeWarning(e.target.name);
  };

  const changeWarning = (target: string, value: string = "") => {
    setWarnings({
      ...warnings,
      [target]: value,
    });
  };

  const loginUser = async () => {
    const result = await getToken({
      username: formData.username,
      password: formData.password,
    });
    if (result.status === 204) return true;
    else {
      changeWarning("invalid", result.description);
      return false;
    }
  };

  const checkNoWarnings = (): boolean => {
    // Check all fields have values
    const requiredWarnings = { ...warnings };
    for (const [key, value] of Object.entries(formData)) {
      // If empty add warning that field is required
      if (value === "") {
        requiredWarnings[key] = `${Strings[`in_${key}`]}${Strings.required}`;
      }
    }
    setWarnings(requiredWarnings);

    // Check no field is invalid
    return Object.values(warnings).every((field) => field === "");
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (checkNoWarnings()) {
      // Login user
      const result = await loginUser();
      if (result) {
        // Move on to user's dashboard
        await updateAuth();
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-end bg-[#FFFFFC]">
      <div className="flex justify-start p-10 pr-0">
        <img
          src={login}
          width={700}
          className="h-full max-h-screen overflow-clip"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="flex-1 h-full min-w-2xl gap-3 px-16 flex flex-col justify-center items-center">
        <div className="flex flex-col mt-12 mb-6 px-20 min-w-xl">
          <div className="kameron w-full py-1 flex items-end justify-center leading-none font-semibold text-5xl text-[#000000]">
            {Strings.login_title}
          </div>
          <div className="sans w-full mt-1 flex justify-center leading-none text-[#919191]">
            {Strings.login_desc}
          </div>
          {warnings.invalid !== "" ? (
            <div className="sans w-full flex mt-5 justify-center leading-none text-[#C957BC]">
              {warnings.invalid}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-full min-w-xl px-14 gap-6">
          <form className="flex w-full flex-col gap-4">
            {Object.entries(formData).map(([input, value]) => (
              <Input
                key={input}
                name={input}
                type={input.includes("password") ? "password" : "text"}
                warning={warnings[input]}
                value={value}
                onChange={handleChange}
              />
            ))}
            <div className="mt-6">
              <NewDefaultButton
                text={Strings.login}
                onClick={handleLogin}
                size="large"
              />
            </div>
          </form>
        </div>
        <div className="w-full flex justify-center gap-1 mt-2">
          <div className="sans flex leading-none text-[#919191]">
            {Strings.signup_prompt}
          </div>
          <Link to="/signup">
            <div className="sans flex leading-none text-[#C957BC] hover:text-[#752092] underline underline-offset-1 transition-colors duration-300">
              {Strings.signup}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
