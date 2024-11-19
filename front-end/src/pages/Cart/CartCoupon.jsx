import InputCoupon from "./InputCoupon";

const CartCoupon = ({
    title = String,
    coupon,
    setCoupon,
    handleEnterCounpon
}) => {

  return (
    <div className="basis-[45%] flex flex-col gap-[4vh] items-center text-[18px] xl:text-[20px]">
         <div className="border-[2px] w-full h-fit py-[5px] px-[7%] rounded-[30px] text-[20px] lg:text-[22px] font-bold">{title} COUPON</div>
         <div className="text-left px-[7%]">
            Enter a {title?.toLowerCase( )} coupon into the box below to get an order discount.
         </div>
         <div className="px-[7%] w-full">
           <InputCoupon coupon={coupon} setCoupon={setCoupon} handleEnterCounpon={handleEnterCounpon}/>
         </div>
    </div>
  )
};
export default CartCoupon;