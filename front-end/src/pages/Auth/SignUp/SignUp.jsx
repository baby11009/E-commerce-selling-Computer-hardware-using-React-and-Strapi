import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import request from "../../../utils/request";
import { useNavigate } from "react-router-dom";
import { ReuseInput } from "../../../components";
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";
import {
  EmailIcon,
  PasswordIcon,
  UserNameIcon,
  ResendPswdIcon,
} from "../../../assets/Icon";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    toast
  }  = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (value) => {
    setIsLoading(true);
    try {
      request
        .post("auth/local/register", {
          ...value,
        })
        .then((rsp) => {
          console.log(rsp);
          toast.success(() => (
            <div>We have sent you a confirmation email.</div>
          ));

          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        })
        .catch((err) => {
          toast.error(() => (
            <div>{err?.response.data.error.message}</div>
          ))
          throw err;
        });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Định nghĩa pattern cho Input
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

  const resendPswdPattern = useRef();

  resendPswdPattern.current = (value) => {
    return value === getValues("password") || "Confirm password not right";
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center  px-[30px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm  shadow-[-1px_4px_28px_0px_rgba(0,0,0,0.55)]
        w-[95%] sm:w-[60%] md:w-[50%] lg:w-[35%] md:min-w-[500px] py-[30px] rounded-[20px]"
      >
        <div className="text-[36px] mb-[20px]">Sign Up</div>
        <div className="w-full">
          <ReuseInput
            register={register}
            errors={errors}
            SVG={UserNameIcon}
            name="username"
            type="text"
            placeholder="User name"
            required={"User name required"}
          />
          <ReuseInput
            register={register}
            errors={errors}
            SVG={EmailIcon}
            name="email"
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
          />
          <ReuseInput
            register={register}
            errors={errors}
            SVG={ResendPswdIcon}
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required={"Confirm password required"}
            validate={resendPswdPattern.current}
          />
        </div>

        <button
          type="submit"
          className=" bg-purpleBtn w-[40%] py-[10px] text-[18px] font-bold rounded-[30px] mt-[20px]"
        >
          Sign Up
        </button>
        <Link to='/' className="flex justify-end items-center w-full text-yellow hover:underline text-[18px] mt-[20px]">
          Back to home
        </Link>
      </form>
      <div className="flex w-full flex-col items-center justify-end mt-[20px] text-[16px] text-right">
        <Link to="/signin" className=" text-yellow hover:underline inline">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
