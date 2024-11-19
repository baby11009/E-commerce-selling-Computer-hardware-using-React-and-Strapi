const CheckoutStep = ({
    myStep,
    stepTitle,
    currStep,
    left,
}) => {
  return (
    <div
      className={`w-[25px] h-[25px] border-[2px] ${
        currStep === myStep ? "border-yellow" : "border-white"
      }  rounded-[50%] flex items-center justify-center relative`}
    >
      <div
        className={`w-[50%] h-[50%] rounded-[50%] ${
          currStep === myStep ? "bg-yellow" : "bg-white"
        }`}
      />
      <div className={`absolute bottom-[-170%] ${left ? 'left-0' : 'right-0'} text-[18px] ${ currStep === myStep ? "text-yellow" : "text-white"}`}>
        {stepTitle}
      </div>
    </div>
  );
};
export default CheckoutStep;
