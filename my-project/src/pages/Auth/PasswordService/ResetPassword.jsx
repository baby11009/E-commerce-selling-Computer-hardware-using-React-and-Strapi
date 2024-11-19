import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import request from "../../../utils/request";
import { useNavigate,useParams,Link } from "react-router-dom";
import { ReuseInput } from "../../../components";
import {
  PasswordIcon,
  ResendPswdIcon,
} from "../../../assets/Icon";
import { LoadingCircle} from '../../../components'
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";


const ResetPassword = () => {
  const { privateCode } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    toast
  } = useAuthContext()

  console.log(isLoading)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (value) => {

      setIsLoading(true);

    let resetInfo = {
      code: privateCode,
      password: value.password,
      passwordConfirmation: value.confirmPassword,
    };

    try {
      request
        .post("auth/reset-password", resetInfo)
        .then((rsp) => {
          console.log(rsp);
          toast.success(() => (
            <div>Your password has been successfully reset</div>
          ));

          setTimeout(() => {
            navigate("/signin",{replace : true});
          }, 2500);
        })
        .catch((err) => {
          toast.error(() => (
            <div>There're somethings wrong, please do it again</div>
          ));
          throw err;
        });
    } catch (err) {
      console.log(err);
    } finally {
        setTimeout(() => { 
            setIsLoading(false)
        },2000)
    }
  };

  // Định nghĩa pattern cho Input

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
    <div className="flex flex-col gap-10 items-center justify-center h-[100dvh] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center  px-[30px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm  shadow-[-1px_4px_28px_0px_rgba(0,0,0,0.55)]
      w-[95%] sm:w-[60%] md:w-[50%] lg:w-[35%] md:min-w-[500px] py-[30px] rounded-[20px]"
      >
        <div className="text-[36px] mb-[20px]">Reset Password</div>
        <div className="w-full">
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
          className=" bg-purpleBtn w-[40%] py-[10px] text-[18px] font-bold rounded-[30px] mt-[20px] flex justify-center items-center"
        >
          {
            isLoading ? <LoadingCircle /> : 'Change password'
          }
        </button>
        <div className="flex justify-end items-center w-full text-yellow hover:underline text-[18px] mt-[10px]"
          onClick={() => navigate('/',{replace : true})}
        >
          Back to home
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
