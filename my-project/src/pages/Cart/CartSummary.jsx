import dollarUs from "../../components/Money";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CartSummary = ({ subtotal, total, coupon, toast }) => {

  const navigate = useNavigate()

  const handleProceed = () => {
    if(subtotal === 0) {
      toast.error(() => (
        <div>Your cart is empty</div>
      ))
      return null
    }
    navigate('/check-out/1')
  }

  return (
    <div className="basis-[45%] flex flex-col gap-[4vh] text-[22px] xl:text-[24px]">
      <div className="border-[2px] w-full h-fit py-[5px] px-[7%] rounded-[30px] text-[24px] font-bold">
        ORDER SUMMARY
      </div>
      <div className="px-[7%] text-[18px] xl:text-[20px]">
        Shipping and additional costs are not included in the summary.
      </div>
      <div className="px-[7%] flex flex-col gap-[2vh]">
        <div className="flex justify-between">
          <div>Order subtotal</div>
          <div>{dollarUs.format(subtotal)}</div>
        </div>
        <hr className="border-[1.5px]" />
        <div className="flex justify-between">
          <div>Discount ({coupon}%)</div>
          <div>
            {dollarUs.format(Math.ceil((subtotal * coupon) / 100)) || 0}
          </div>
        </div>
        <hr className="border-[1.5px]" />
        <div className="flex justify-between">
          <div>Tax (5%)</div>
          <div>{dollarUs.format(Math.ceil((subtotal * 5) / 100))}</div>
        </div>
        <hr className="border-[1.5px]" />
        <div className="flex justify-between">
          <div>Total</div>
          <div>{dollarUs.format(total)}</div>
        </div>
        <hr className="border-[1.5px]" />
      </div>
      <div className="px-[7%] text-center">
        <motion.div
          onClick={handleProceed}
          className="rounded-[30px] block bg-purpleBtn cursor-pointer py-[1vh] selection:bg-transparent"
          whileHover={{
            boxShadow: "0px 0px 5px 1px rgba(0,0,0,.5)",
          }}
          transition={{
            duration: 0.1,
          }}
        >
          Proceed to checkout
        </motion.div>
      </div>
    </div>
  );
};
export default CartSummary;
