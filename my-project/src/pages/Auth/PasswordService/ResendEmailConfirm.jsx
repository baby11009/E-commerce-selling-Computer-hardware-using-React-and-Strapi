import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import request from "../../../utils/request";
import { useNavigate } from "react-router-dom";
import { ReuseInput } from "../../../components";
import { EmailIcon } from "../../../assets/Icon";
import { LoadingCircle } from "../../../components";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";

const ResendEmailConfirm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { toast } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    setIsLoading(true);

    try {
      request
        .get(
          `users?filters[$and][0][email][$eq]=${value.email}&filters[$and][1][confirmed][$eq]=false`
        )
        .then((rsp) => {
          if (rsp.data.length) {
            request
              .post("auth/send-email-confirmation", value)
              .then(() => {
                toast.success(() => (
                  <div>We have send you an confirmation email.</div>
                ));

                setTimeout(() => {
                  navigate("/signin", { replace: true });
                }, 2500);
              })
              .catch((err) => {
                toast.error(() => <div>{}</div>);
                throw err;
              });
          } else {
            toast.error(() => (
              <div>Account is not create or had been confirmed.</div>
            ));
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      console.log(err);
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
    <div className="flex flex-col items-center justify-center h-[100dvh] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center  px-[30px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm  shadow-[-1px_4px_28px_0px_rgba(0,0,0,0.55)]
      w-[95%] sm:w-[60%] md:w-[50%] lg:w-[35%] md:min-w-[500px] py-[30px] rounded-[20px]"
      >
        <div className="text-[36px] mb-[20px]">Resend email confirm</div>
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
          className=" bg-purpleBtn w-[40%] py-[10px] text-[18px] font-bold rounded-[30px] mt-[10px] flex justify-center items-center"
        >
          {isLoading ? <LoadingCircle /> : "Send email"}
        </button>
        <Link
          to="/"
          className="flex justify-end items-center w-full text-yellow hover:underline text-[18px] mt-[10px]"
        >
          Back to home
        </Link>
      </form>
    </div>
  );
};
export default ResendEmailConfirm;
