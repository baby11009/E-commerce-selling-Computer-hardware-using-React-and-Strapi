import { motion } from "framer-motion";
import BagList from "./BagList";
import dollarUs from "../../Money";
import { Link } from "react-router-dom";
import { NoCartIcon } from "../../../assets/Icon";

const MotionLink = motion(Link);

const Bag = ({ cart, cartProducts, setOpened }) => {
  return (
    <>
      <span className="flex text-[20px] font-bold">
        Cart summary
        <div className="ml-[7px]">
          ({cart?.attributes.product_carts.data.length || 0})
        </div>
      </span>
      <hr className="my-[10px]  border-[#B7B6B8]" />
      {cart?.attributes?.product_carts?.data?.length > 0 ? (
        <>
          <div className="h-[50%]">
            <BagList cartProducts={cartProducts} />
          </div>
          <div className="my-[15px]">
            <div className="flex justify-between text-[22px] font-bold ">
              Total :
              <span>{dollarUs.format(cart?.attributes?.TotalPrice || 0)}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <MotionLink
              to="/cart"
              className="w-full text-center border-[1px] border-white p-[10px] mb-[10px] text-[18px] font-[500] rounded-[5px]"
              whileHover={{
                backgroundColor: "#6e59f7",
                color: "#FFFFFF",
                borderColor: "#406DFF",
              }}
              onClick={() => setOpened("")}
            >
              View Cart
            </MotionLink>
            <Link
              to="/check-out/1"
              className="w-full text-center border-[1px] p-[10px] bg-purpleBtn text-[18px] text-white font-[500] rounded-[5px]"
              onClick={() => setOpened("")}
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <NoCartIcon />
          <div className="text-[14px] text-[#cccccc] md:text-[20px] mt-[10px]">
            Your cart is empty
          </div>
        </div>
      )}
    </>
  );
};
export default Bag;
