import { FooterWebImg } from "../../assets/Images";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Email,
  Location,
  Phone,
} from "../../assets/Icon";
import { useAuthContext } from "../../apiService/Login/context/AuthContext";

const MotionLink = motion(Link);

const Footer = () => {
  const navigate = useNavigate();

  const browsers = useRef();

  const categories = useRef();

  const { toast, user } = useAuthContext();

  browsers.current = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Shop",
      path: "/shop/page/1",
    },
    {
      title: "Login",
      path: "/signin",
    },
    {
      title: "Register",
      path: "/signup",
    },
  ];

  categories.current = [
    {
      title: "PC",
      path: "pc",
    },
    {
      title: "Laptop",
      path: "laptop",
    },
    {
      title: "Gaming gear",
      path: "gear",
    },
    {
      title: "Gaming chair",
      path: "chair",
    },
    {
      title: "Figure",
      path: "gaming-chair",
    },
  ];

  const handlNavigation = (path) => {
    if (path === "/signin" || path === "/signup") {
      if (user) {
        toast.error("You've already have signed in");
        return null;
      }
      console.log(path);
    }
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="border-t-[2px] rounded-t-[40px] mt-[40px] text-white text-[22px]">
      <div className="pt-[25px] pb-[45px] md:px-[6%] lg:px-[9%] flex flex-wrap lg:flex-nowrap md:gap-2 lg:gap-4">
        <div className="w-[100%] md:w-[65%] lg:w-[30%] flex flex-col items-center text-center md:items-start md:text-left px-[5%] md:px-0 py-[10px]">
          <div
            className="bg-cover bg-no-repeat w-[200px] rounded-[20px] h-[160px]"
            style={{ backgroundImage: `url(${FooterWebImg})` }}
          />
          <div className="my-[15px] text-[24px] font-bold leading-[30px]">
            HuyThanh Company
          </div>
          <div className="text-[18px] leading-[22px]">
            TechXperience: Elevate your tech game with premium PC components,
            keyboards, mice, and cutting-edge accessories.
          </div>
        </div>
        <div className="w-[45%] md:w-[30%] lg:w-[15%]  flex flex-col px-[5%] md:px-[2%]">
          <div className="font-bold mb-[10px]">Browses</div>
          <div className="flex flex-col gap-1 text-[19px]">
            {browsers.current.map((brow, index) => (
              <div
                key={index}
                to={brow.link}
                onClick={() => {handlNavigation(brow.path);}}
                className="cursor-pointer"
              >
                {brow.title}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[45%] md:w-[30%] lg:w-[15%]  flex flex-col px-[5%] md:px-[2%]">
          <div className="font-bold mb-[10px]">Categories</div>
          <div className="flex flex-col gap-1 text-[19px]">
            {categories.current.map((brow, index) => (
              <MotionLink
                key={index}
                onClick={() => window.scrollTo(0, 0)}
                className="cursor-pointer"
                to={`/shop/category/${brow.path}/page/1`}
              >
                {brow.title}
              </MotionLink>
            ))}
          </div>
        </div>
        <div className="w-[100%] md:w-[65%] lg:w-[35%]  flex flex-col gap-5 px-[5%] md:px-[2%] font-bold">
          <div>
            Social
            <div className="flex items-center gap-5 mt-[10px] ">
              <a className="flex items-center justify-center cursor-pointer">
                <Facebook />
              </a>
              <a className="flex items-center justify-center cursor-pointer">
                <Instagram />
              </a>
              <a className="flex items-center justify-center cursor-pointer">
                <Twitter />
              </a>
              <a className="flex items-center justify-center cursor-pointer">
                <LinkedIn />
              </a>
            </div>
          </div>
          <div>
            Contact
            <div className="mt-[10px] flex flex-col gap-2 text-[18px] font-normal">
              <div className="flex items-center gap-4">
                <Email />
                12345@gmail.com
              </div>
              <div className="flex items-center gap-4">
                <Location />
                Bien Hoa, Dong Nai, Viet Nam
              </div>
              <div className="flex items-center gap-4">
                <Phone />
                0123456789
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[rgba(0,0,0,0.2)] py-[3px] px-[5%] md:px-[6%] lg:px-[9%] flex items-center justify-between text-[14px] md:text-[18px] ">
        <div>© Copyright 2024&nbsp; - &nbsp;Võ Huy Thành</div>
        <div>WEBSITE FOR LEARNING PURPOSE ONLY.</div>
      </div>
    </div>
  );
};
export default Footer;
