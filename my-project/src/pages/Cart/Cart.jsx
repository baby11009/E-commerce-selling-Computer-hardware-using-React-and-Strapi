import ProductCartList from "./ProductCartList";
import CartCoupon from "./CartCoupon";
import CartSummary from "./CartSummary";

import { useAuthContext } from "../../apiService/Login/context/AuthContext";

import { useState, useLayoutEffect, useRef } from "react";

import request from "../../utils/request";

const Cart = () => {
  const { 
    toast,
    cartProducts, 
    fetchUserCart, 
    subTotal, 
    totalPrice, 
    setTotalPrice, 
    coupon = 0,
    setCoupon
} = useAuthContext();

  const [dcCoupon, setDcCoupon] = useState("");

  const currentCoup = useRef();

  const prevTotal = useRef();

  const handleEnterCounpon = () => {
    setDcCoupon("");

    if (dcCoupon === "") {
      toast.error(() => <div>You haven’t entered any coupon yet.</div>);
      return null;
    }
    if (dcCoupon === currentCoup.current) {
      toast.error(() => <div>You already entered this coupon yet.</div>);
      return null;
    }
    request
      .get(
        `/coupons?populate=coupon_type&filters[couponCode][$eqi]=${dcCoupon.toUpperCase()}`
      )
      .then((rsp) => {
        if (rsp.data?.data?.length === 0) {
          toast.error(() => <div>Coupon not valid</div>);
        } else {
          if (prevTotal.current) {
            setTotalPrice(prevTotal.current);
          }
          currentCoup.current = dcCoupon;
          setCoupon(Number(rsp.data?.data[0]?.attributes.value));
          toast.success(() => (
            <div>
              You have entered
              <span className="font-bold">
                &nbsp;{rsp.data?.data[0]?.attributes.value}%&nbsp;
              </span>
              discount coupon
            </div>
          ));
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(() => <div>{err?.response.data.error.message}</div>);
      });
  };

  return (
    <div className="flex flex-col gap-[10vh] justify-center md:px-[6%] lg:px-[9%] py-[5%] sm:py-[1.5%] text-white">
      <div className="w-full h-[75vh] 2xl:h-[700px] border-[2px] rounded-[5px] py-[20px] md:px-[5%] overflow-x-auto overflow-y-hidden relative">
        <div className="text-center text-[24px] md:text-[26px] xl:text-[28px] leading-[30px] font-bold  mb-[20px] flex justify-center">
          <div className="border-[2px] w-[75%] sm:w-[50%] lg:w-[40%] xl:w-[35%] py-[5px] rounded-[30px]">
            SHOPPING CART
          </div>
        </div>
        <ProductCartList
          toast={toast}
          cartProducts={cartProducts}
          fetchUserCart={fetchUserCart}
        />
      </div>
      <div className="flex gap-[5vh] md:gap-0 flex-col md:flex-row justify-evenly border-[2px] rounded-[5px]  py-[5vh] md:px-[5%]">
        <CartCoupon
          title="DISCOUNT"
          coupon={dcCoupon}
          setCoupon={setDcCoupon}
          handleEnterCounpon={handleEnterCounpon}
        />
        <CartSummary
          subtotal={subTotal}
          total={totalPrice}
          coupon={coupon}
          toast={toast}
        />
      </div>
    </div>
  );
};
export default Cart;
