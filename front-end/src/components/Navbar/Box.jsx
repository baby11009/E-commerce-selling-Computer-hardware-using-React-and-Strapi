import { motion } from "framer-motion";
import Bag from "./Bag/Bag";
import Notify from "./Notify/Notify";
import { useAuthContext } from "../../apiService/Login/context/AuthContext";
import { useEffect, useState } from "react";

const boxVars = {
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

const Box = ({ type, windowSize, setOpened }) => {
  const { cart, cartProducts, fetchUserNotis, userNotifications } =
    useAuthContext();

  const [boxType, setBoxType] = useState(type);

  useEffect(() => {
    if (cart?.attributes?.product_carts?.data?.length === 0 || !cart) {
      setBoxType(null);
    }
  }, [cart]);

  return (
    <motion.div
      className={` ${
        windowSize < 770 ? "w-[70vw]" : "md:w-[55vw] lg:w-[35vw] xl:w-[30vw]"
      }
        p-[20px] rounded-[5px] absolute top-[110%] right-0 shadow-myShadow origin-top-right text-white
        cursor-default z-[50] bg-[rgba(0,0,0,0.55)]`}
      style={{
        height: boxType ? "75vh" : "auto",
      }}
      variants={boxVars}
      initial="hidden"
      animate="visible"
      onClick={(e) => e.stopPropagation()}
    >
      {type === "bag" ? (
        <Bag cart={cart} cartProducts={cartProducts} setOpened={setOpened} />
      ) : (
        <Notify
          setOpened={setOpened}
          fetchUserNotis={fetchUserNotis}
          userNotifications={userNotifications}
        />
      )}
    </motion.div>
  );
};
export default Box;
