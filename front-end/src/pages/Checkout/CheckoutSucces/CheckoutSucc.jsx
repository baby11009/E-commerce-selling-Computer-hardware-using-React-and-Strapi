import { Link } from "react-router-dom";
import { CheckIcon } from "../../../assets/Icon";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const btnVars = {
  hover: {
    boxShadow: "8px -6px 0px 0px rgba(0,0,0,0.45)",
    scale: 1.1,
    transition: {
      duration: 0.01,
      ease: "easeInOut",
    },
  },
};

const CheckoutSucc = () => {
  return (
    <div className="h-[75vh] sm:80vh md:h-[65vh] flex justify-center items-center text-white">
      <div className=" w-[95%] md:w-[75%] lg:w-[70%] xl:w-[55%] h-[65vh] md:h-[55vh] border-[2px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[6px] flex flex-col justify-center items-center">
        <div className="h-[20vh] flex items-center justify-center">
          <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-lg w-[125px] h-[125px] rounded-[50%] flex items-center justify-center relative">
            <CheckIcon />
          </div>
        </div>
        <div className="text-yellow font-bold text-[36px] text-center">
          Thank you for ordering!
        </div>
        <div className="w-[70%] text-center mb-[3vh] ">
          Thank you for choosing us! Your order means a lot. We're committed to
          providing top-notch service and can't wait to serve you again.
        </div>
        <div className="flex flex-row justify-center gap-[5%] w-[80%] text-white text-[18px] text-center">
          <MotionLink
            className="border-[2px] px-[30px] py-[5px] rounded-[6px] font-bold"
            variants={btnVars}
            whileHover="hover"
            to="/account/orders/page/1"
            replace={true}
          >
            VIEW ORDER
          </MotionLink>
          <MotionLink
            className="px-[30px] py-[5px] rounded-[6px] font-bold bg-purpleBtn"
            variants={btnVars}
            whileHover="hover"
            to="/"
            replace={true}
          >
            CONTINUE SHOPPING
          </MotionLink>
        </div>
      </div>
    </div>
  );
};
export default CheckoutSucc;
