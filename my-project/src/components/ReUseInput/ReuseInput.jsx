
import { Link } from "react-router-dom";

const ReuseInput = ({
  register,
  errors,
  SVG,
  name,
  type,
  placeholder,
  required,
  pattern,
  validate,
  reset,
}) => {
  return (
    <div className="flex flex-col mb-[20px]">
      <div className="flex items-center justify-center  gap-[20px] md:gap-[30px] py-[10px]">
        <label htmlFor={name}>
          <SVG />
        </label>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required,
            pattern,
            validate,
          })}
          className="pb-[7px] flex-1 outline-none !bg-transparent placeholder:text-white text-[18px] border-b-[2px]
                  focus:pb-[12px] focus:pt-[-20px] focus:placeholder:text-transparent auth"
        />
      </div>
      <div className="flex items-center justify-center gap-[20px]  md:gap-[30px]">
        <div className="w-[36px] h-[10px]" />
        {errors[name] && (
          <p
            role="alert"
            className="text-redErr flex-1 text-[18px] leading-[17px]"
          >
            {errors[name].message}
          </p>
        )}
      </div>
      {reset && (
        <div className="flex items-center justify-end gap-[20px]  md:gap-[30px]">
          <Link to="/forgot-password" className=" text-yellow hover:underline">
            Forgot your password ?
          </Link>
        </div>
      )}
    </div>
  );
};
export default ReuseInput;
