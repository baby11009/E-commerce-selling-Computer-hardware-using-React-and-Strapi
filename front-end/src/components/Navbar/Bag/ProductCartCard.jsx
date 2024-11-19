import dollarUs from "../../Money";
import request from "../../../utils/request";
import { getToken } from "../../../apiService/Login/tokenHelper";
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";

import { CloseIcon } from "../../../assets/Icon";

const ProductCartCard = ({ product }) => {

    const {
        cart,
        fetchUserCart
    } = useAuthContext()

  const handleDltPc = () => {
      try {
        request.delete(`/product-carts/${product?.id}`,{
            headers : {
                Authorization : `${import.meta.env.VITE_BEARER} ${getToken(import.meta.env.VITE_AUTH_TOKEN)}`
            }
        })
        .then(() => {
            fetchUserCart(cart?.id)
        })
      }catch(err) {
        throw err
      }
    }

  return (
    <div className="cursor-pointer">
      <div className="flex mr-[5px]">
        <img
          src={`http://localhost:1337${product?.attributes?.product.data.attributes.MainImage.data.attributes.formats.thumbnail.url}`}
          className="w-[80px] h-[80px] mr-[10px] border-[1px] border-black"
        />
        <div className="basis-[72%] flex flex-col justify-between">
          <h3 className="text-[17px] leading-[18px] font-bold">
            {product?.attributes?.product.data.attributes.Title}
          </h3>
          <div className="flex justify-between text-[14px]">
            <div>QTY : {product?.attributes?.quantity}</div>
            <div>{dollarUs.format(product?.attributes?.Price)}</div>
          </div>
        </div>
        <div className="cursor-pointer ml-[10px]"
            onClick={handleDltPc}
        >
          <CloseIcon size={'18px'}/>
        </div>
      </div>
      <hr className="my-[10px] border-[#c5c5c5]" />
    </div>
  );
};
export default ProductCartCard;
