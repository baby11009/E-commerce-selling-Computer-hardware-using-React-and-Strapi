import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinkVars = {
  hidden: {
    y: "30vh",
    transition: {
      duration: 0.6,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};

const MotionLink = motion(Link)

const NavLink = ({ title,href, isChosed }) => {
  return (
    <AnimatePresence>
      <MotionLink
        variants={navLinkVars}
        initial="hidden"
        animate="visible"
        className="flex items-center w-[50%]"
        to={href}
      >
        <div className="w-[50px] text-center">
          <svg
            className={`${isChosed === title ? "block" : "hidden"}`}
            fill="#FFF34A"
            height="20px"
            width="36px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <polygon points="12,7 13,7 13,9 15,9 15,11 3,11 3,13 15,13 15,15 13,15 13,17 12,17 12,19 15,19 15,17 17,17 17,15 19,15 19,14 20,14 20,13 21,13 21,11 20,11 20,10 19,10 19,9 17,9 17,7 15,7 15,5 12,5 "></polygon>{" "}
            </g>
          </svg>
        </div>
        <span
          className={`text-[24px] font-bold ${isChosed === title ? "text-yellow" : ""}`}
        >
          {title}
        </span>
      </MotionLink>
    </AnimatePresence>
  );
};
export default NavLink;
