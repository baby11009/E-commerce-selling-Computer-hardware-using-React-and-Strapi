import { motion } from "framer-motion";
import { GiftIcon } from "../../assets/Icon";



const InputCoupon = ({
    coupon,
    setCoupon,
    handleEnterCounpon
}) => {
  return (
    <div className="border-[2px] w-full rounded-[30px] px-[5%] flex py-[1vh] justify-between">
      <input
        type="text"
        placeholder="Enter coupon"
        value={coupon}
        spellCheck={false}
        className="bg-transparent placeholder:text-white text-white outline-none w-[55%] px-[5%] border-[2px] border-transparent focus:border-white rounded-[20px] "
        onChange={(e) => setCoupon(e.target.value || '')}
      />
      <motion.div
        className="flex items-center justify-center gap-[5%] py-[5px] bg-purpleBtn cursor-pointer w-[40%] rounded-[30px] selection:bg-transparent"
        whileHover={{
          boxShadow: "0px 0px 5px 1px rgba(0,0,0,.5)",
        }}
        transition={{
          duration: 0.1,
        }}
        onClick={handleEnterCounpon}
      >
        <GiftIcon color={"#ffffff"} />
        <span>Apply</span>
      </motion.div>
    </div>
  );
};
export default InputCoupon;
