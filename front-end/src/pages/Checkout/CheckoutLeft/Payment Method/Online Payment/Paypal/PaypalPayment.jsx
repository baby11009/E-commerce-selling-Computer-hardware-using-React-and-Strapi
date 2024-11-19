import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import request from "../../../../../../utils/request";
import {
  getLcItem,
  deleteLcItem,
} from "../../../../../../LocalStorage/LocalStorageFunc";

import { useState, useEffect } from "react";
import { getToken } from "../../../../../../apiService/Login/tokenHelper";

import { useNavigate } from "react-router-dom";

const PaypalPayment = ({
  subTotal,
  priceWFee,
  toast,
  userId,
  cart,
  fetchLoggedInUser,
}) => {
  const [accessToken, setAccessToken] = useState("");

  const [shipInfo, setShipInfo] = useState(false);

  const [productsCart, setProductsCart] = useState([]);

  const [orderId, setOrderId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setShipInfo(getLcItem(import.meta.env.VITE_SHIP_DATA));
    cart?.attributes?.product_carts?.data?.map((item) => {
      setProductsCart((prev) => [...prev, item?.id]);
    });
    const getAccessToken = async () => {
      await axios
        .post(
          import.meta.env.VITE_PAYPAL_GERNER_TOKEN_API,
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
              username: import.meta.env.VITE_PAYPAL_CLIENT_ID,
              password: import.meta.env.VITE_PAYPAL_SECRET_KEY,
            },
          }
        )
        .then((rsp) => {
          setAccessToken(rsp.data?.access_token);
        })
        .catch((err) => {
          getAccessToken();
          throw err;
        });
    };
    getAccessToken();
  }, []);

  const handleRefundPaypal = async () => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_PAYPAL_REFUND_API}/${orderId}/refund`,
          {
            amount: {
              value: priceWFee,
              currency_code: "USD",
            },
            note_to_payer: "Refund money from HT Shop",
          },
          {
            headers: {
              Authorization: `${import.meta.env.VITE_BEARER} ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          toast.success(() => <div>Your money was refuned!</div>);
        });
    } catch (err) {
      toast.error(() => (
        <div>
          There is somethings wrong while refund the money. Please contact to us
          to get the money back.
        </div>
      ));

      throw err;
    }
  };

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
    if (orderId) {
      createGHNOrder();
    }
  }, [orderId]);

  const createBEOrder = async (orderCode) => {
    return await request
      .post(
        `orders`,
        {
          data: {
            user: userId,
            orderId: orderId,
            orderPrice: subTotal,
            product_carts: productsCart,
            orderCode: orderCode,
            order_type: 1,
            orderDiscount: `${getLcItem("Coupon") || 0}`,
            shipFee: Number(getLcItem("shipFee")),
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
        deleteLcItem("shipFee");
        deleteLcItem("Coupon");
        deleteLcItem("shippingData");

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
          client_order_code: orderId,
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
            shopId: 191506,
          },
        }
      );

      const orderCode = response.data?.data?.order_code;
      createBEOrder(orderCode);
    } catch (error) {
      // toast.error(() => (
      //   <div>
      //     There are somethings wrong with the transaction. We will refund your
      //     money.
      //   </div>
      // ));
      // handleRefundPaypal();
      // throw error;
    }
  };

  const createOrder = async (data, actions) => {
    return await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: priceWFee,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      var captureId = details?.purchase_units[0]?.payments?.captures[0].id;

      setOrderId(captureId);
    });
  };

  const onError = (error) => {
    console.error(error);
    toast.error(() => error.message);
  };

  const onCancel = (data, actions) => {
    toast.error(() => "Transaction was cancelled");
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <div className='min-h-[30vh] mt-[30px]'>
        {subTotal !== "Loading" && shipInfo && (
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            onCancel={onCancel}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
};
export default PaypalPayment;
