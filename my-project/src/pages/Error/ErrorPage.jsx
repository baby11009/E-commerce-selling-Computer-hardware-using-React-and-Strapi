import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const { errorMessage } = useParams();

  return (
    <div className="h-[100vh]">
      <div className="w-full h-full flex justify-center items-center relative">
        <div className="absolute w-full h-full bg-[rgba(134,240,133,0.3)] z-[5] overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            animate={{
              x: "100%",
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            <div className="cloud absolute left-[-10%] top-[20%]"></div>
            <div className="cloud absolute left-[70%] top-[10%]"></div>
            <div className="cloud absolute left-[-30%] top-[50%]"></div>
            <div className="cloud absolute left-[50%] top-[30%]"></div>
            <div className="cloud absolute left-[25%] top-[40%]"></div>
            <div className="cloud absolute left-[-60%] top-[20%]"></div>
            <div className="cloud absolute left-[40%] top-[60%]"></div>
            <div className="cloud absolute left-[-80%] top-[15%]"></div>
            <div className="cloud absolute left-[20%] top-[70%]"></div>
          </motion.div>
        </div>
        <div
          className="border-[5px] border-t-0  border-[#02008E]
          w-[500px] h-[450px]  md:w-[600px] md:h-[400px]  bg-[#f8f7f7] relative rounded-[5px] z-[10]"
        >
          <div className="bg-[#02008E] w-full h-[12%] flex items-center justify-between px-[20px]">
            <div className="w-[22%] h-[50%] rounded-[30px] bg-[#f8f7f7] "></div>
            <div className="flex gap-[10px]">
              <div className="w-[15px] h-[15px] rounded-[30px] bg-[#FBBC05] "></div>
              <div className="w-[15px] h-[15px] rounded-[30px] bg-[#4285F4] "></div>
              <div className="w-[15px] h-[15px] rounded-[30px] bg-[#EA4335] drop-shadow-[100px_35px_35px_rgba(124,213,0,0.25)]"></div>
            </div>
          </div>
          <div className="absolute top-[-12%] left-[50%] translate-x-[-50%]">
            <svg width="180" height="180">
              <path
                d="M30,120 L90,30 L150,120 z"
                fill="#F90102"
                stroke="#F90102"
                strokeWidth="20"
                strokeLinejoin="round"
              />
              <text
                x="80"
                y="105"
                fontFamily="Inconsolata"
                fontSize="55"
                fill="#f8f7f7"
                fontWeight="bold"
              >
                !
              </text>
            </svg>
          </div>
          <div className="text-center mt-[60px] flex flex-col justify-center items-center gap-[10px] font-kode font-[600]">
            <span className="text-[90px] leading-[100px] font-[700] ">
              Oops
            </span>
            <span className="text-[30px] leading-[35px]">
              Something went wrong
              <span className="text-[#FBBC05]">!</span>
              <span className="text-[#4285F4]">!</span>
              <span className="text-[#EA4335]">!</span>
            </span>
            <Link to="/" className="text-[20px] my-[15px] flex items-center gap-[30px]">
              <span className="text-[26px] hover:font-honk hover:text-[32.5px] leading-[30px] border-b-[3px] border-[#FBBC05] px-[5px] pb-[2px]">
                Back to Home Page
              </span>
            </Link>
            <span className="text-[24px] leading-[24px] text-redHover">
              ERROR : {errorMessage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
