
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getData } from "../../apiService/shopService";
import Detail from "./Detail";
import ProductDescription from "./ProductDescription";
import ProductTS from "./ProductTS";
import ReviewCmt from "./Reviews/ReviewCmt";

import { useAuthContext } from "../../apiService/Login/context/AuthContext";

const ProductDetail = () => {

  const { productSlug } = useParams();

  const [totalSize,setTotalSize] = useState(4)

  const [cmtFilter,setCmtFilter] = useState("desc")

  const { toast, user, cartProducts, fetchUserCart } = useAuthContext();
  const { data, isLoading, refetch } = getData("products", {
    "populate[Images]": "*",
    "populate[gifts][populate][gift_image]": "*",
    "populate[sale]": "*",
    "filters[Slug]": productSlug,
  });

  const {
    data: data2,
    isLoading: isLoading2,
    refetch: refetch2,
  } = getData("comments", {
    "populate[user][populate][avatar_url]": "*",
    "filters[product]": data?.data[0].id,
    "sort[0]": `createdAt:${cmtFilter}`,
    "pagination[page]": 1,
    "pagination[pageSize]": totalSize,
  });


  return (
    <div
      className="md:px-[6%] lg:px-[9%] w-full h-full  pt-[5%] sm:!pt-[1.5%]
     z-[0.5] flex flex-col text-white px-[10px] gap-[30px] lg:p-0 lg:gap-[40px]"
    >
      <Detail
        data={data?.data[0]}
        isLoading={isLoading}
        toast={toast}
        user={user}
        cartProducts={cartProducts}
        fetchUserCart={fetchUserCart}
      />

      <ProductDescription data={data?.data[0]} isLoading={isLoading} />
      <ProductTS data={data?.data[0]} isLoading={isLoading} />

      <ReviewCmt
        cmtData={data2}
        productData={data?.data[0]}
        isLoading={isLoading}
        user={user}
        toast={toast}
        refetchPd={refetch}
        refetchCmt={refetch2}
        setTotalSize={setTotalSize}
        setCmtFilter={setCmtFilter}
      />
    </div>
  );
};
export default ProductDetail;
