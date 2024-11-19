import { useState, useEffect } from "react";
import {
  getLcItem,
  createLcItem,
} from "../../../../LocalStorage/LocalStorageFunc";
import axios from "axios";
import { useAuthContext } from "../../../../apiService/Login/context/AuthContext";
import { useParams } from "react-router-dom";
import PaymentMethod from "./PaymentMethod";
import OnlinePayment from "./Online Payment/OnlinePayment";
import CODPayment from "./COD Payment/CODPayment";

const Payment = ({ currStep }) => {

  const {method} = useParams()

  const [shipData, setShipData] = useState(
    getLcItem("shippingData") ? getLcItem("shippingData") : {}
  );

  const { setShipFee, totalPrice,toast } = useAuthContext();

  function convertVndToUsd(vndAmount) {
    
    const exchangeRate = 25000;
    const usdAmount = vndAmount / exchangeRate;
    return usdAmount.toFixed(2); 
  }

  useEffect(() => {
    axios
      .post(
        import.meta.env.VITE_CAL_SHIP_FEE_API,
        {
          from_district_id: Number(import.meta.env.VITE_FROM_DISTRICT),
          from_ward_code: import.meta.env.VITE_FROM_WARD,
          service_id: Number(import.meta.env.VITE_SERVICE_ID),
          service_type_id: Number(import.meta.env.VITE_SERVICE_TYPE),
          to_district_id: shipData?.toDistrict?.id,
          to_ward_code: shipData?.toWard?.id,
          height: 50,
          length: 30,
          weight: 2000,
          width: 30,
          insurance_value: 0,
          cod_failed_amount: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: import.meta.env.VITE_GHN_TOKEN,
            shopId: 191506,
          },
        }
      )
      .then((rsp) => {
        createLcItem("shipFee", convertVndToUsd(rsp.data?.data.total));
        setShipFee(getLcItem("shipFee"));
      })
      .catch((err) => {
        console.error("Ship fee Api Error: ");
        throw err;
      });
  }, []);

  return (
    <div className="h-full basis-[55%] flex flex-col gap-[25px] md:gap-[8%] text-white text-[20px]">
      <span className="text-[28px] mb-[1vh]">Payment</span>
      {
        method === '1' 
        ? <OnlinePayment/>
        : method === '2'
        ? <CODPayment/>
        : <PaymentMethod currStep={currStep} toast={toast} totalPrice={totalPrice} />
      }
    </div>
  );
};
export default Payment;
