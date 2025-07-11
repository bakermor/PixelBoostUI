import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getToken, usernameCheck } from "../api/AuthApi";
import sign_up from "../assets/sign_up.png";
import { NewDefaultButton } from "../components/Buttons";
import { NewInput } from "../components/Input";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";
import { isValidEmail } from "../utils/helperFuncs";

const SignUp = () => {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);

  const formItems = ["username", "email", "password", "confirm_password"];

  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(formItems.map((item) => [item, ""]))
  );

  const [warnings, setWarnings] = useState<Record<string, string>>(
    Object.fromEntries(formItems.map((item) => [item, ""]))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changeWarning = (target: string, value: string = "") => {
    setWarnings({
      ...warnings,
      [target]: value,
    });
  };

  // Validate field functions

  const validateUsername = async (e: React.FocusEvent<HTMLInputElement>) => {
    // Check username is valid and not in use
    if (e.target.value != "") {
      const valid = await usernameCheck({ username: e.target.value });
      if (!valid.status) {
        // Add warning if invalid
        changeWarning("username", valid.description);
        return;
      }
    }
    changeWarning("username");
  };

  const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    // Add warning if invalid remove warning if not
    if (e.target.value != "" && !isValidEmail(e.target.value)) {
      changeWarning("email", Strings.warn_email);
    } else changeWarning("email");
  };

  const validatePassword = () => {
    // Check that confirm password matches password
    if (
      formData.confirm_password !== "" &&
      formData.password !== formData.confirm_password
    )
      // Add warning if invalid
      changeWarning("confirm_password", Strings.warn_password_match);
    else changeWarning("confirm_password");
    if (warnings.password) changeWarning("password");
  };

  const validateFunction: Record<string, (e?: any) => any> = {
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
    confirm_password: validatePassword,
  };

  // Create user and login

  const loginUser = async () => {
    const result = await getToken({
      username: formData.username,
      password: formData.password,
    });
    if (result.status === 204) return true;
    else return false;
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

  const createAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (checkNoWarnings()) {
      const result = await createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.status === 201) {
        // Get user's token
        const authenticated = await loginUser();
        if (authenticated) {
          await updateAuth();
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        // On error, add a warning to invalid field
        if (result.field) {
          changeWarning(result.field, result.description);
        }
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-end bg-[#FFFFFC]">
      <div className="flex justify-start p-10 pr-0">
        <img
          src={sign_up}
          width={700}
          className="h-full max-h-screen overflow-clip"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="flex-1 h-full min-w-2xl gap-5 px-16 flex flex-col justify-center items-center">
        <div className="flex flex-col mt-12 mb-3 px-20 min-w-xl">
          <div className="kameron w-full py-1 flex items-end justify-center leading-none font-semibold text-5xl text-[#000000]">
            {Strings.signup_title}
          </div>
          <div className="sans w-full mt-1 flex justify-center leading-none text-[#919191]">
            {Strings.signup_desc}
          </div>
        </div>
        <div className="flex flex-col w-full min-w-xl px-14 gap-6">
          <form className="flex w-full flex-col gap-3.5">
            {Object.entries(formData).map(([input, value]) => (
              <NewInput
                key={input}
                name={input}
                type={input.includes("password") ? "password" : "text"}
                warning={warnings[input]}
                value={value}
                onChange={handleChange}
                onBlur={validateFunction[input]}
              />
            ))}
            <div className="mt-3">
              <NewDefaultButton
                text={Strings.create_account}
                onClick={createAccount}
                size="large"
              />
            </div>
          </form>
        </div>
        <div className="w-full flex justify-center gap-1">
          <div className="sans flex leading-none text-[#919191]">
            {Strings.login_prompt}
          </div>
          <Link to="/login">
            <div className="sans flex leading-none text-[#C957BC] hover:text-[#752092] underline underline-offset-1 transition-colors duration-300">
              {Strings.login}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
