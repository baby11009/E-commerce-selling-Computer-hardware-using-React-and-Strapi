import { Link, useLocation } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { CategoryArrowIcon } from "../../../assets/Icon";

const hovVars = {
  hover: {
    backgroundColor: "rgba(0,0,0,0.3)",
    color: "rgb(255,255,255)",
  },
};

const LeftNavbar = ({ hovered, setHovered }) => {
  const [scope, animate] = useAnimate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (hovered) {
      animate("svg", { rotateZ: 180 }, { duration: 0.4 });
    } else {
      animate("svg", { rotateZ: 0 }, { duration: 0.4 });
    }
  }, [hovered]);

  return (
    <div className="flex items-center text-[20px] basis-[20%] lg:basis-[50%]">
      <Link to="/" className="text-[48px] md:mr-[20px] font-bold">
        HT
      </Link>
      <motion.ul className="hidden lg:flex ">
        <motion.li
          className={`flex cursor-pointer w-[100px] justify-center  rounded-[8px] mx-[10px] z-[10] `}
          variants={hovVars}
          whileHover="hover"
        >
          <Link
            className={`flex justify-center items-center w-full h-full rounded-[8px] py-[5px] z-[10] ${
              pathname === "/" ? "bg-[rgba(0,0,0,0.3)] " : ""
            }`}
            to="/"
          >
            Home
          </Link>
        </motion.li>
        <motion.li
          className={`flex justify-center cursor-pointer w-[100px]  rounded-[8px] mx-[10px] z-[10]`}
          variants={hovVars}
          whileHover="hover"
        >
          <Link
            className={`flex justify-center items-center w-full h-full  rounded-[8px] z-[10] ${
              pathname.includes("shop") && !pathname.includes("shop/category")
                ? "bg-[rgba(0,0,0,0.3)]"
                : ""
            }`}
            to="/shop/page/1"
          >
            Shop
          </Link>
        </motion.li>
        <motion.li
          className="flex justify-center cursor-pointer w-[120px] rounded-[8px] mx-[10px] relative z-[10]"
          ref={scope}
          variants={hovVars}
          whileHover="hover"
          onHoverStart={() => {
            setHovered(true);
          }}
          onHoverEnd={() => {
            setHovered(false);
          }}
        >
          <span
            className={`flex justify-center items-center w-full h-full rounded-[8px] z-[10] ${
              pathname.includes("category") ? "bg-[rgba(0,0,0,0.3)]" : ""
            }`}
          >
            Category
            <CategoryArrowIcon motion={motion} />
          </span>
          <div className="absolute w-[100%] h-[50px] bottom-[-50px] z" />
        </motion.li>
      </motion.ul>
    </div>
  );
};
export default LeftNavbar;
