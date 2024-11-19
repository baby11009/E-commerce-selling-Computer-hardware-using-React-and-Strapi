import { useAuthContext } from "../../apiService/Login/context/AuthContext";
import CheckoutSummary from "./CheckoutRight/CheckoutSummary";
import CheckoutForm from "./CheckoutLeft/CheckoutForm";
import CheckoutStepProgress from "./CheckoutStepProgress/CheckoutStepProgress";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CheckoutSucc from "./CheckoutSucces/CheckoutSucc";
import VNPayState from "./CheckoutLeft/Payment Method/Online Payment/VNpay/VNPayState";

const Checkout = () => {
  const { toast } = useAuthContext();
  const { checkoutStep } = useParams();

  return (
    <div className="md:min-h-[85vh] md:px-[6%] lg:px-[9%] w-full pt-[5%] sm:pt-[1.5%] z-[1] py-[10%] sm:py-[1.5%]">
      {checkoutStep === "success" ? (
        <CheckoutSucc />
      ) : checkoutStep === "checking" ? (
        <VNPayState />
      ) : (
        <div className="h-full flex flex-col md:flex-row gap-[5vh] md:gap-0 justify-between">
          <div className="basis-[55%] md:h-full flex flex-col gap-[50px] md:gap-[6vh]">
            <CheckoutStepProgress currStep={Number(checkoutStep)} />
            <CheckoutForm currStep={Number(checkoutStep)} toast={toast} />
          </div>
          <CheckoutSummary currStep={Number(checkoutStep)} />
        </div>
      )}
    </div>
  );
};
export default Checkout;
