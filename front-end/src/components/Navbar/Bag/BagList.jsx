
import ProductCartCard from "./ProductCartCard";


const BagList = ({cartProducts}) => {

  

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll customScroll pt-[10px] ">
      {cartProducts?.map((product) => (
        <ProductCartCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default BagList;
