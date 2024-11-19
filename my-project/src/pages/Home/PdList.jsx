import { getData } from "../../apiService/shopService";
import { Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ItemCard,SkeletonItemList, Intersection } from "../../components";
import {  } from "../../components";
import "swiper/css";
import { useEffect, useRef } from "react";


const PdList = ({ slug, title }) => {
  const pdRef = useRef(null);

  const { data, isLoading, error, isError, refetch } = getData(
    "products",
    {
      populate: "*",
      "filters[$and][0][Categories][Slug]": slug,
      "pagination[page]": 1,
      "pagination[pageSize]": 8,
      "sort[0]": "createdAt:desc",
    },
    false
  );

  if (isError) {
    console.error(error.message);
    return <Navigate to={`/error/${error.message}`} />;
  }

  Intersection(pdRef,refetch)

  return (
    <div className="flex flex-col py-[20px] overflow-hidden" ref={pdRef}>
      <span className="text-yellow text-[28px] font-bold leading-[24px] mb-[20px]">
        {title} product list
      </span>
      {isLoading ? (
        <SkeletonItemList slug={slug} />
      ) : (
        <Swiper
          spaceBetween={10}
          slidesPerView={"auto"}
          className="w-full flex justify-center items-center"
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {data?.data.map((product) => (
            <SwiperSlide
              className="!w-[24.3%] !min-w-[290px] cursor-pointer"
              key={product.id}
            >
              <ItemCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
export default PdList;
