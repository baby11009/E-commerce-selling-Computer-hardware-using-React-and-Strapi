import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getLcItem } from "../../../../../LocalStorage/LocalStorageFunc";
import axios from "axios";
import request from "../../../../../utils/request"
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../../../../../apiService/Login/context/AuthContext";
import { getToken } from "../../../../../apiService/Login/tokenHelper";

const CODPayment = () => {

  const {
    totalPrice,
    subTotal,
    user,
    fetchLoggedInUser,
    cart,
    toast
  } = useAuthContext() 

  const [shipInfo, setShipInfo] = useState(false);

  const [orderId, setOrderId] = useState("");

  const [productsCart, setProductsCart] = useState([]);

  const navigate = useNavigate() 

  const convertUsdToVnd = useCallback((usdAmount) => {
    const exchangeRate = 25000;
    const vndAmount = usdAmount * exchangeRate;
    return Number(vndAmount.toFixed(0));
  }, []);

  useEffect(() => {
    cart?.attributes?.product_carts?.data?.map((item) => {
      setProductsCart([...productsCart, item.id]);
    });
  }, [cart]);

  useEffect(() => {
    setShipInfo(getLcItem(import.meta.env.VITE_SHIP_DATA));
    function generateRandomString(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    setOrderId(generateRandomString(17));
  }, []);

  const createBEOrder = async (orderCode) => {
    console.log(orderCode);
    return await request
      .post(
        `orders`,
        {
          data: {
            user: user?.id,
            orderId: orderId,
            orderPrice: totalPrice,
            product_carts: productsCart,
            orderCode: orderCode,
            order_type : 2,
            orderDiscount : `${getLcItem('Coupon') || 0}`,
            shipFee : Number(getLcItem("shipFee"))
          },
        },
        {
          headers: {
            Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
              import.meta.env.VITE_AUTH_TOKEN
            )}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setOrderId("");
        fetchLoggedInUser();
        deleteLcItem("shipFee")
        deleteLcItem("Coupon")
        deleteLcItem("shippingData")
        navigate("/check-out/success", { replace: true });
      })
      .catch((err) => {
        toast.error(() => (
          <div>
            There are somethings wrong with the transaction. We will refund your
            money.
          </div>
        ));
        handleRefundPaypal();
        console.error(err);
      });
  };

  const createGHNOrder = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_GHN_CREATE_API,
        {
          payment_type_id: 2,
          note: `${shipInfo?.clientName}'s order`,
          required_note: "KHONGCHOXEMHANG",
          client_order_code: orderId,
          to_name: `${shipInfo?.clientName}`,
          to_phone: `${shipInfo?.clientPNb}`,
          to_address: `${shipInfo?.address}`,
          to_ward_code: `${shipInfo?.toWard.id}`,
          to_district_id: `${shipInfo?.toDistrict.id}`,
          cod_amount: totalPrice ? convertUsdToVnd(totalPrice) : 0,
          content: "Theo UTC+7 times",
          weight: 2000,
          length: 30,
          width: 30,
          height: 50,
          insurance_value: 0,
          service_id: 0,
          service_type_id: 2,
          pick_shift: [2],
        },
        {
          headers: {
            Token: import.meta.env.VITE_GHN_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      const orderCode = response.data?.data?.order_code;
      createBEOrder(orderCode);
    } catch (error) {
      toast.error(() => (
        <div>
          There are somethings wrong! Please try again or contact to shop to get
          helped.
        </div>
      ));
      throw error;
    }
  };

  return (
    <>
      <button
        className="border-[2px] h-[8vh] text-[24px] font-bold rounded-[5px] hover:border-redHover hover:text-redHover"
        onClick={() => createGHNOrder()}
      >
        Paying with COD
      </button>
      <div className="mt-[5vh] flex">
        <Link
          className="bg-purpleBtn py-[5px] text-center rounded-[5px] h-fit w-[45%]"
          to={`/check-out/2`}
        >
          Prev
        </Link>
      </div>
    </>
  );
};
export default CODPayment;
