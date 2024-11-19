import { useAuthContext } from "../../../apiService/Login/context/AuthContext";
import dollarUs from "../../../components/Money";

const CheckoutSummary = ({ currStep }) => {

  const { cartProducts, totalPrice, subTotal, coupon,shipFee } = useAuthContext();

  return (
    <div className="h-full basis-[40%] flex flex-col gap-[15px] md:gap-[4%] text-white text-[20px]">
      <span className="text-[28px]">Summary ({cartProducts?.length})</span>
      <div className="w-full h-[35vh] flex flex-col gap-[7%] customScroll overflow-y-auto">
        {cartProducts?.map((item, index) => (
          <div className="h-[42%] flex gap-[15px]" key={index}>
            <div
              className="w-[95px] h-[95px]  rounded-[5px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_BE_IMG}${
                  item.attributes.product.data.attributes.MainImage.data
                    .attributes.formats.thumbnail.url
                })`,
              }}
            />
            <div className="flex flex-col flex-1 justify-between pr-[15px]">
              <div className="leading-[24px] basis-[48%] ellipsis">
                {item.attributes.product.data.attributes.Title}
              </div>
              <div className="w-full flex justify-between">
                <div>Qty : {item.attributes.quantity}</div>
                <div>{dollarUs.format(item.attributes.Price)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[24px] flex flex-col gap-[5px]">
        <div className="flex justify-between">
          <div>Order subtotal</div>
          <div>{dollarUs.format(subTotal)}</div>
        </div>
        <hr className="border-[1.5px]" />
        <div className="flex justify-between">
          <div>Tax (5%)</div>
          <div>
            {dollarUs.format(
              Math.ceil((subTotal * 5) / 100)
            )}
          </div>
        </div>
        <hr className="border-[1.5px]" />
        <div className="flex justify-between">
          <div>Coupon ({coupon}%)</div>
          <div>
            {dollarUs.format(
              Math.ceil((subTotal * coupon) / 100)
            )}
          </div>
        </div>
        <hr className="border-[1.5px]" />
        <div className="flex justify-between">
          <div>Shipping Fee</div>
          <div>
            {currStep === 1 ? "Not inclueded" : dollarUs.format(shipFee)}
          </div>
        </div>
        <hr className="border-[1.5px]" />
        <div className="flex justify-between">
          <div>Total</div>
          <div>{currStep === 1 ? dollarUs.format(totalPrice) : dollarUs.format(totalPrice + Number( shipFee))}</div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutSummary;
