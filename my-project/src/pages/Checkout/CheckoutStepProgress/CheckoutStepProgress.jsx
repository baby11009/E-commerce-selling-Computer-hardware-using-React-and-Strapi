
import CheckoutStep from "./CheckoutStep";

const CheckoutStepProgress = ({ currStep = 1 }) => {
  return (
    <div className="h-[5%] flex items-center w-full">
      <CheckoutStep myStep={1} stepTitle='Billing' currStep={currStep} left={true}/>
      <div className="border-t-[2px] w-[95%]" />
      <CheckoutStep myStep={2} stepTitle='Payment' currStep={currStep}/>
    </div>
  );
};
export default CheckoutStepProgress;
