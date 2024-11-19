import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../Badge";
import SearchBar from "../SearchBar/SearchBar";
import Box from "../Box";
import { getToken } from "../../../apiService/Login/tokenHelper";
import request from "../../../utils/request";

// Icon
import { CartIcon2, UserIcon, BellIcon, Facebook } from "../../../assets/Icon";

const MotionLink = motion(Link);

const signoutVars = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const RightNavbar = ({
  windowSize,
  isClicked,
  setIsClicked,
  opened,
  setOpened,
  user,
  cart,
  handleSignout,
  userNotifications,
  fetchUserNotis,
}) => {
  const navigate = useNavigate();

  const [unseenNotis, setUnseenNotis] = useState(0);

  const notifyBox = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài dropdown hay không
      if (notifyBox.current && !notifyBox.current.contains(event.target)) {
        setOpened("");
      }
    };
    // Thêm lắng nghe sự kiện click khi component mount
    document.addEventListener("click", handleClickOutside);

    // Loại bỏ lắng nghe khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    const a = userNotifications?.data?.filter(
      (item) =>
        item.attributes.notification_state.data.attributes.State === "Unseen"
    );
    setUnseenNotis(a?.length);
  }, [userNotifications]);

  const handleNotiState = () => {
    if(unseenNotis !== 0) {
      try {
        request
          .put(
            `notificantions/changeState/${user?.id}`,
            {
              notification_state: 1,
            },
            {
              headers: {
                Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
                  import.meta.env.VITE_AUTH_TOKEN
                )} `,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            fetchUserNotis();
          });
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <div className="flex items-center  lg:justify-evenly basis-[50%] lg:basis-[50%] z-[5]">
      <SearchBar
        windowSize={windowSize}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      <ul className="lg:flex justify-evenly basis-[40%] hidden ">
        <motion.li
          className="cursor-pointer w-[36px] h-[36px] rounded-full flex items-center justify-center relative"
          whileHover={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          onHoverStart={() => setOpened("Bag")}
          onHoverEnd={() => setOpened("")}
        >
          <Badge quantity={cart?.attributes?.product_carts.data.length} />
          <CartIcon2 />
          <div className="w-[120%] h-[30px] absolute bottom-[-15px]"></div>
          {opened === "Bag" && <Box type="bag" windowSize={windowSize} setOpened={setOpened} />}
        </motion.li>
        <motion.li
          className="cursor-pointer w-[36px] h-[36px] rounded-full flex items-center justify-center relative"
          whileHover={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          onHoverStart={() => setOpened("Settings")}
          onHoverEnd={() => setOpened("")}
        >
          {user ? (
            <>
              <div
                className="w-full h-full bg-cover bg-no-repeat bg-center rounded-full"
                style={{
                  backgroundImage: `url("${
                    user?.avatar_url?.formats.thumbnail.url
                      ? `http://localhost:1337${user?.avatar_url?.formats.thumbnail.url}`
                      : "data:image/jpeg;base64,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"
                  }")`,
                }}
              />
              <div className="absolute right-0 top-[50%] w-[60px] h-full " />
              {opened === "Settings" && (
                <motion.div
                  className="absolute bg-[rgba(0,0,0,.4)] w-[150px] top-[120%] right-[0] p-[10px] 
                        rounded-[5px] text-[#ccc] text-[18px] leading-[24px] origin-top-right"
                  variants={signoutVars}
                  initial="hidden"
                  animate="visible"
                >
                  <MotionLink
                    to="/account/settings"
                    whileHover={{
                      color: "rgb(255,255,255)",
                    }}
                  >
                    Account settings
                  </MotionLink>
                  <motion.div
                    onClick={() => handleSignout(navigate)}
                    className="py-[5px] mt-[5px]"
                    whileHover={{
                      color: "rgb(255,255,255)",
                    }}
                  >
                    Sign out
                  </motion.div>
                </motion.div>
              )}
            </>
          ) : (
            <Link to="/signin">
              <UserIcon />
            </Link>
          )}
        </motion.li>
        <motion.li
          className="cursor-pointer w-[36px] h-[36px] rounded-full flex items-center justify-center relative"
          whileHover={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          onClick={(e) => {
            handleNotiState()
            setOpened((prev) => (!prev ? "Notify" : ""));
          }}
          ref={notifyBox}
        >
          <Badge quantity={unseenNotis || 0} />
          <BellIcon />
          <div className="w-[120%] h-[30px] absolute bottom-[-15px]"></div>
          {opened === "Notify" && <Box setOpened={setOpened} />}
        </motion.li>
      </ul>
    </div>
  );
};
export default RightNavbar;