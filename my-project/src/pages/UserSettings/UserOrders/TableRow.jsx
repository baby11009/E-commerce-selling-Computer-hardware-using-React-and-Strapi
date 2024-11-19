import dollarUs from "../../../components/Money";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import request from "../../../utils/request"
import { DetailIcon, TrashBinIcon, RefundIcon } from "../../../assets/Icon";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../apiService/Login/tokenHelper";

const TableRow = ({ item, index, toast, refetch }) => {
  const [orderStatus, setOrderStatus] = useState("");

  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate("");

  useEffect(() => {
    const getOrdersStatus = async (orderId) => {
      await axios
        .post(
          import.meta.env.VITE_GHN_GET_ORDER_API,
          {
            client_order_code: orderId,
          },
          {
            headers: {
              Token: import.meta.env.VITE_GHN_TOKEN,
              "Content-Type": "application/json",
            },
          }
        )
        .then((rsp) => {
          setOrderStatus(convertedText(rsp.data?.data.status));
        })
        .catch((err) => {
          throw err;
        });
    };

    if (item) {
      getOrdersStatus(item?.attributes?.orderId);
    }
  }, [item]);

  useEffect(() => {
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

  const convertDateFormat = useCallback((inputDate) => {
    let parts = inputDate.split("T");
    let datePart = parts[0].split("-");
    let year = datePart[0];
    let month = datePart[1];
    let day = datePart[2];
    return day + "/" + month + "/" + year;
  }, []);

  const convertedText = useCallback((text) => {
    let words = text.split("_");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    return words.join(" ");
  }, []);

  const handleDetails = () => {
    navigate(`/account/orders/details/${item?.attributes?.orderId}/page/1`);
  };


  const handleDelete = async () => {
    try {
      await request
        .delete(`orders/${item?.id}`, {
          headers: {
            Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
              import.meta.env.VITE_AUTH_TOKEN
            )}`,
          },
        })
        .then(() => {
          refetch();
          toast.success(() => <div>Delete successed</div>);
        });
    } catch (err) {
      toast.error(() => <div>Delete failed! Please try again</div>);
      throw err;
    }
  };

  const handleRefundGHN = async () => {
    try {
      const response = await axios
        .post(
          import.meta.env.VITE_GHN_CANCEL_ORDER_API,
          {
            order_codes: [item?.attributes?.orderCode],
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

  const handleCancelOrder = async () => {
    await request
      .delete(`order/refund/${item?.id}`, {
        headers: {
          Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
            import.meta.env.VITE_AUTH_TOKEN
          )}`,
        },
      })
      .then(() => {
        toast.success(() => <div>Order cancellation successful</div>);
        handleRefundGHN();
        refetch();
      });
  };

  const handleRefundPaypal = async () => {
    try {
      if (item?.attributes?.order_type?.data.attributes.title === "Paypal") {
        await axios
          .post(
            `${import.meta.env.VITE_PAYPAL_REFUND_API}/${
              item?.attributes?.orderId
            }/refund`,
            {
              amount: {
                value: item?.attributes?.orderPrice + item?.attributes?.shipFee,
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
            handleCancelOrder();
          });
      } else {
        handleCancelOrder();
      }
    } catch (err) {
      toast.error(() => (
        <div>
          Order cancellation failed. Please try again or contact the store
        </div>
      ));

      throw err;
    }
  };

  return (
    <tr>
      <td className="h-[9.8vh]">{index + 1}</td>
      <td className="h-[9.8vh]">{item?.attributes?.orderId}</td>
      <td className="h-[9.8vh]">{item?.attributes?.orderCode}</td>
      <td className="h-[9.8vh]">
        {item?.attributes?.order_type?.data?.attributes?.title}
      </td>
      <td className="h-[9.8vh]">{item?.attributes?.orderDiscount || 0}%</td>
      <td className="h-[9.8vh]">
        {dollarUs.format(item?.attributes?.orderPrice)}
      </td>
      <td>{dollarUs.format(item?.attributes?.shipFee)}</td>
      <td className="h-[9.8vh]">
        {convertDateFormat(item?.attributes?.createdAt)}
      </td>
      <td className="h-[9.8vh]">{orderStatus}</td>
      <td className="flex gap-[10px] justify-center items-center h-[9.8vh]">
        <button
          className="w-[45px] h-[45px] rounded-[5px] bg-[#0289ff] flex items-center justify-center"
          onClick={handleDetails}
        >
          <DetailIcon />
        </button>
        <button
          className="w-[45px] h-[45px] rounded-[5px] bg-[#3de648] flex items-center justify-center"
          onClick={handleRefundPaypal}
        >
          <RefundIcon />
        </button>
        <button
          className="w-[45px] h-[45px] rounded-[5px] bg-[#e63d3d] flex items-center justify-center"
          onClick={handleDelete}
        >
          <TrashBinIcon />
        </button>
      </td>
    </tr>
  );
};
export default TableRow;
