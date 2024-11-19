import { motion } from "framer-motion";
import { MSI, Logitech, Asus, Akko, Acer, Corsair } from "../../assets/Icon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const brandsVars = {
  animate: {
    translateX: `${-200 * 6}px`,
    transition: {
      duration: 15,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const BrandList = () => {
  return (
    <div className="my-[50px] sm:my-[40px] lg:my-[30px] overflow-hidden flex cursor-pointer">
      <Swiper
        loop
        autoplay={{
            delay : 100
        }}
        speed={600}
        modules={[Autoplay]}
        slidesPerView={2}
        breakpoints={{
            640 : {slidesPerView : 3},
            768 : {slidesPerView : 4},
            1280 : {slidesPerView : 5}
        }}
       
      >
        <SwiperSlide  className="flex items-center">
            <MSI />
        </SwiperSlide>
        <SwiperSlide  className="flex items-center">
            <Logitech />
        </SwiperSlide>
        <SwiperSlide  className="flex items-center">
            <Asus/>
        </SwiperSlide>
        <SwiperSlide  className="flex items-center">
            <Akko />
        </SwiperSlide>
        <SwiperSlide  className="flex items-center">
            <Acer />
        </SwiperSlide>
        <SwiperSlide  className="flex items-center">
            <Corsair/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default BrandList;
