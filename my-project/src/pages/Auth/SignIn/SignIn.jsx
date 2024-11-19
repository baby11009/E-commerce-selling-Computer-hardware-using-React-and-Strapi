import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";
import { setToken } from "../../../apiService/Login/tokenHelper";
import request from "../../../utils/request";
import { ReuseInput } from "../../../components";
import { EmailIcon, PasswordIcon } from "../../../assets/Icon";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [isRemember, setIsRemember] = useState(false);

  const navigate = useNavigate();

  const { setUser,toast } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (value) => {
    toast.promise(request.post("auth/local", value), {
      loading: "Signing in...",
      success: (rsp) => {
        setToken(import.meta.env.VITE_AUTH_TOKEN,rsp.data.jwt, isRemember);
        setUser(rsp.data);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
        return "Successfully signed in";
      },
      error: (error) => {
        if (
          error?.response.data.error.message ===
          "Invalid identifier or password"
        ) {
          return "Invalid email or password";
        }
        return error?.response.data.error.message;
      },
    });
  };

  const emailPattern = useRef();

  emailPattern.current = {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Invalid email address",
  };

  const pswdPattern = useRef();

  pswdPattern.current = {
    value: /^.{6,}$/,
    message: "Minimum of 6 characters",
  };

  return (
    <div className="flex flex-col gap-[20px] items-center justify-center h-[100vh] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center px-[50px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm  shadow-[-1px_4px_28px_0px_rgba(0,0,0,0.55)]
        w-[95%] max-w-[450px] sm:w-[50%] md:w-[40%] lg:w-[30%] lg:min-w-[400px] py-[30px] rounded-[20px]"
      >
        <div className="text-[36px] mb-[20px]">Sign In</div>
        <div className="w-full">
          <ReuseInput
            register={register}
            errors={errors}
            SVG={EmailIcon}
            name="identifier"
            type="email"
            placeholder="Email"
            required={"Email address required"}
            pattern={emailPattern.current}
          />
          <ReuseInput
            register={register}
            errors={errors}
            SVG={PasswordIcon}
            name="password"
            type="password"
            placeholder="Password"
            required={"Password required"}
            pattern={pswdPattern.current}
            reset={true}
          />
        </div>
        <div className="flex gap-[5px] my-[5px]">
          <input
            type="checkbox"
            checked={isRemember}
            onChange={(e) => setIsRemember(e.target.checked)}
            id="remember"
            className="cursor-pointer"
          />
          <label htmlFor="remember" className="text-[20px] cursor-pointer">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className=" bg-purpleBtn w-[40%] py-[10px] text-[18px] font-bold rounded-[30px] mt-[20px]"
        >
          Sign In
        </button>
        <Link to='/' className="flex justify-end items-center w-full text-yellow hover:underline text-[18px] mt-[20px]">
          Back to home
        </Link>
      </form>
      <div className="flex w-full flex-col items-center text-right">
        <Link to="/signup" className=" text-yellow hover:underline inline">
          Create new account.
        </Link>
        <Link
          to="/resend-email-confirmation"
          className=" text-yellow hover:underline"
        >
          Resend email confirmation.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
