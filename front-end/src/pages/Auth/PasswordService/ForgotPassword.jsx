import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import request from "../../../utils/request";
import { useNavigate } from "react-router-dom";
import { ReuseInput } from "../../../components";
import { EmailIcon } from "../../../assets/Icon";
import { LoadingCircle } from "../../../components";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";

const ForgotPassword = () => {

  const {
    toast
  } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    setIsLoading(true);

    try {
      request
        .get(`users?filters[email][$eq]=${value.email}`)
        .then((rsp) => {
          if (rsp.data.length) {
            request
              .post("auth/forgot-password", value)
              .then((rsp) => {
                toast.success(() => (
                  <div>We have sent you an email to reset your password</div>
                ));

                setTimeout(() => {
                  navigate("/signin", { replace: true });
                }, 3000);
              })
              .catch((err) => {
                toast.error(() => (
                  <div>There're somethings wrong, please do it again</div>
                ));
                throw err;
              });
          }else{
            toast.error(() => (
                <div>You have not create account with this email</div>
            ))
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw err
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  // Định nghĩa pattern cho Input
  const emailPattern = useRef();

  emailPattern.current = {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Invalid email address",
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-[100dvh] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center  px-[30px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm  shadow-[-1px_4px_28px_0px_rgba(0,0,0,0.55)]
      w-[95%] sm:w-[60%] md:w-[50%] lg:w-[35%] md:min-w-[500px] py-[30px] rounded-[20px]"
      >
        <div className="text-[36px] mb-[20px]">Forgot Password</div>
        <div className="w-full">
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
        </div>
        <button
          type="submit"
          className=" bg-purpleBtn w-[40%] py-[10px] text-[18px] font-bold rounded-[30px] mt-[20px] flex justify-center items-center"
        >
          {isLoading ? <LoadingCircle /> : "Reset password"}
        </button>
        <Link to='/' className="flex justify-end items-center w-full text-yellow hover:underline text-[18px] mt-[10px]">
          Back to home
        </Link>
      </form>
    </div>
  );
};
export default ForgotPassword;
