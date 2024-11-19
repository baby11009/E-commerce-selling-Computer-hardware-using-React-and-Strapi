import { SadFace,Box,Search } from "../../assets/Icon";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NoResultFound = () => {

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() / 1000; // convert to seconds
      setOffset({
        x: 65 * Math.cos(time),
        y: 65 * Math.sin(time),
      });
    }, 10); // update every 10ms (time update small = smooth)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[15px] h-[70vh] flex flex-col items-center justify-center text-[36px] text-yellow">
      <div className="relative">
        <Box />
        <motion.div className="absolute top-[20%] right-[5%]"
          style={{
            x: offset.x,
            y: offset.y,
          }}
        >
          <Search />
        </motion.div>
      </div>
      <div className="flex items-center gap-[10px] mt-[15px]">
        Sorry! No result found <SadFace />
      </div>
      <div className="text-[18px] text-white text-center  ">
        We apologize, we couldn’t find the product you requested. Please try again with a different approach.
      </div>
    </div>
  )
};
export default NoResultFound;