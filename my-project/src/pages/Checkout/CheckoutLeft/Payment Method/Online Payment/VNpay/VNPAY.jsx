import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsSHA from "jssha";
import axios from "axios";
import request from "../../../../../../utils/request";
import { Buffer } from "buffer";
import {
  getLcItem,
  deleteLcItem,
} from "../../../../../../LocalStorage/LocalStorageFunc";
import { getToken } from "../../../../../../apiService/Login/tokenHelper";

const VNPAY = ({
  subTotal,
  priceWFee,
  toast,
  userId,
  cart,
  fetchLoggedInUser,
  setZIndex,
}) => {
  const [currDate, setCurrDate] = useState(null);

  const [vndPrice, setVndPrice] = useState(0);

  const [productsCart, setProductsCart] = useState([]);

  const [transStatus, setTransStatus] = useState(false);

  const [shipInfo, setShipInfo] = useState(false);

  const [txnRef, setTxnRef] = useState("");

  const [transNo, setTransNo] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  const { pathname, search } = useLocation();

  const navigate = useNavigate();

  const sortObjectKeys = useCallback((obj) => {
    const sorted = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = obj[key];
      });
    return sorted;
  }, []);

  const getCurrentDate = useCallback(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }, []);

  const convertUsdToVnd = useCallback((usdAmount) => {
    const exchangeRate = 25000;
    const vndAmount = usdAmount * exchangeRate;
    return Number(vndAmount.toFixed(0));
  }, []);

  const handleRefundGHN = async (orderCode) => {
    try {
      const response = await axios
        .post(
          import.meta.env.VITE_GHN_CANCEL_ORDER_API,
          {
            order_codes: [orderCode],
          },
          {
            headers: {
              Token: import.meta.env.VITE_GHN_TOKEN,
              ShopId: import.meta.env.VITE_GHN_SHOP_ID,
              "Content-Type": "application/json",
            },
          }
        )
        .then((rsp) => {
          toast.success(() => <div>Cancel success</div>);
          console.log(rsp);
        });
    } catch (err) {
      toast.error(() => (
        <div>
          There is somethings wrong while cancel order. Please contact to us to
          get help.
        </div>
      ));
      throw err;
    }
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setCurrDate(currentDate);
    setVndPrice(convertUsdToVnd(priceWFee));
    setShipInfo(getLcItem(import.meta.env.VITE_SHIP_DATA));
    cart?.attributes?.product_carts?.data?.map((item) => {
      setProductsCart((prev) => [...prev, item?.id]);
    });

    if (search !== "") {
      const urlParams = new URLSearchParams(search);

      setTransStatus(urlParams.get("vnp_TransactionStatus"));

      setTxnRef(urlParams.get("vnp_TxnRef"));

      setTransNo(urlParams.get("vnp_TransactionNo"));
      if (urlParams.get("vnp_TransactionStatus") === "00") {
        setZIndex(1);
      }
    }
  }, [cart]);

  const createBEOrder = async (orderCode) => {
    return await request
      .post(
        `orders`,
        {
          data: {
            user: userId,
            orderId: txnRef,
            orderPrice: subTotal,
            product_carts: productsCart,
            orderCode: orderCode,
            order_type: 2,
            orderDiscount: `${getLcItem("Coupon") || 0}`,
            shipFee: Number(getLcItem("shipFee")),
            note: transNo,
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
        setTxnRef("");
        setZIndex(2);
        fetchLoggedInUser();
        deleteLcItem("shipFee");
        deleteLcItem("Coupon");
        deleteLcItem("shippingData");
        navigate("/check-out/success", { replace: true });
      })
      .catch((err) => {
        toast.error(() => (
          <div>
            There are somethings wrong with the transaction. please contact us
            to get back your money
          </div>
        ));
        handleRefundGHN(orderCode);
        throw err;
      });
  };

  const createGHNOrder = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_GHN_CREATE_API,
        {
          payment_type_id: 1,
          note: `${shipInfo?.clientName}'s order`,
          required_note: "KHONGCHOXEMHANG",
          client_order_code: txnRef,
          to_name: `${shipInfo?.clientName}`,
          to_phone: `${shipInfo?.clientPNb}`,
          to_address: `${shipInfo?.address}`,
          to_ward_code: `${shipInfo?.toWard.id}`,
          to_district_id: `${shipInfo?.toDistrict.id}`,
          cod_amount: 0,
          content: "Theo UTC+7 times",
          weight: 2000,
          length: 30,
          width: 30,
          height: 50,
          insurance_value: 0,
          service_id: 53322,
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
          There are somethings wrong with the transaction. We will refund your
          money.
        </div>
      ));
      throw error;
    }
  };

  useEffect(() => {
    if (!isCreating) {
      setIsCreating(true);
    } else {
      if (transStatus === "00" && subTotal && productsCart.length > 0) {
        createGHNOrder();
      }
    }
  }, [shipInfo, transStatus, isCreating, subTotal, productsCart]);

  const handleVNPAY = () => {
    const data = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: "GTJMOZNI",
      vnp_Amount: vndPrice * 100,
      vnp_BankCode: "VNBANK",
      vnp_CreateDate: currDate,
      vnp_CurrCode: "VND",
      vnp_IpAddr: "13.160.92.202",
      vnp_Locale: "vn",
      vnp_OrderInfo: `Thanh toan hoa don cua HT SHOP `,
      vnp_OrderType: "other",
      vnp_ReturnUrl: `http://localhost:5173${pathname}`,
      vnp_TxnRef: currDate,
    };
    console.log("🚀 ~ data:", data);

    const sortData = sortObjectKeys(data);

    const urlConfig = new URLSearchParams(sortData);

    const secureHash = new jsSHA("SHA-512", "TEXT", {
      hmacKey: {
        value: "ANYGNKPOWUSGOBXLWVGKZFWQPAGWVVGO",
        format: "TEXT",
      },
    });

    const vnpSecure = secureHash
      .update(Buffer.from(urlConfig.toString(), "utf-8").toString())
      .getHash("HEX");

    const dataWSecure = {
      ...sortData,
      vnp_SecureHash: vnpSecure,
    };

    const newUrlConfig = new URLSearchParams(dataWSecure);

    const paymentUrl =
      "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?" + newUrlConfig;

    window.open(paymentUrl, "_blank");
  };

  return (
    <>
      {transStatus === "00" && (
        <div className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50'>
          <div
            className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
          flex flex-col items-center justify-center'
          >
            <div
              className='animate-spin w-[75px] h-[75px] rounded-[50%]  
          border-[5px] border-l-transparent border-t-transparent border-b-transparent mb-[50px]'
            ></div>
            <div>We are currently verifying your payment</div>
            <div>Please wait a moment</div>
          </div>
        </div>
      )}
      <button
        className='border-[2px] h-[8vh] text-[24px] font-bold rounded-[5px] my-[20px] flex items-center justify-center'
        onClick={handleVNPAY}
      >
        Paying with
        <img
          src='https://www.vietnamairlines.com/Themes/VNANew/Portal/images/icon/icon-payment-vnpay.png'
          alt='VNPAY'
          width='75px'
        />
      </button>
    </>
  );
};
export default VNPAY;
