
import Billing from "./Billing/Billing";
import Payment from "./Payment Method/Payment";

const CheckoutForm = ({ currStep,toast }) => {

  return (
    <>
      {
        currStep === 2 
        ? <Payment currStep={currStep}/>
        : <Billing currStep={currStep} toast={toast}/>
      }
    </>
  );
};
export default CheckoutForm;
