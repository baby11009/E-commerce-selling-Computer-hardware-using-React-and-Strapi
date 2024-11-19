

import ProductCartItem from "./ProductCartItem";


const ProductCartList = ({toast,cartProducts,fetchUserCart}) => {

  return (
    <div className="h-[75%] min-w-[650px] flex flex-col gap-[5%]">
      <div className="h-[12%] border-[2px] flex justify-evenly items-center text-[20px] 2xl:text-[22px] font-bold">
        <div className="basis-[45%]">PRODUCT</div>
        <div className="basis-[15%]  text-center">QUANTITY</div>
        <div className="basis-[15%]  text-center">PRICE</div>
        <div className="basis-[15%]  text-center">REMOVE</div>
      </div>
      <div className="flex flex-col gap-[10px] overflow-auto">
        {
            cartProducts?.map((item => (
                <ProductCartItem key={item.id} toast={toast} data={item} fetchUserCart={fetchUserCart}/>
            )))
        }
      </div>

    </div>
  );
};
export default ProductCartList;
