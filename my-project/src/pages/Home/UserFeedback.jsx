import { useState } from "react";
import { getData } from "../../apiService/shopService";
import { Navigate } from "react-router-dom";
import { FeedbackCard, Intersection } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useEffect, useRef } from "react";

const UserFeedback = () => {
  const fbRef = useRef(null);

  const { data, isLoading, isError, error, refetch } = getData(
    "feedbacks",
    {
      populate: "*",
      "sort[0]": "createdAt:desc",
    },
    false
  );

  Intersection(fbRef, refetch);

  const [centerIndex, setCenterIndex] = useState();

  if (isError) {
    console.error(error.message);
    return <Navigate to={`/error/${error.message}`} />;
  }

  return (
    <div className="text-center my-[40px]" ref={fbRef}>
      <div className="text-yellow text-[36px] font-bold leading-[36px] mb-[20px] lg:mb-[10px] text-center">
        User Feedbacks
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifiers: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setCenterIndex(swiper.realIndex)}
          className="h-[450px] md:h-[500px]"
        >
          {data?.data.map((fb, index) => (
            <SwiperSlide
              className="!w-[65%] md:!w-[35%] md:!min-w-[350px]"
              key={index}
            >
              <FeedbackCard
                feedback={fb}
                itemIndex={index}
                currIndex={centerIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
export default UserFeedback;
