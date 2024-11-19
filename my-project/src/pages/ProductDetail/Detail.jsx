import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { CartIcon } from "../../assets/Icon";
import { dollarUS } from "../../components/MoneyConvert";

import Rating from "../../components/SomeThingElse/Rating";

import request from "../../utils/request";

import { motion, AnimatePresence } from "framer-motion";

import { getToken } from "../../apiService/Login/tokenHelper";

// Icon
import { PlusIcon, SubstractIcon } from "../../assets/Icon";

import { useAuthContext } from "../../apiService/Login/context/AuthContext";

const imgVars = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Detail = ({ data, isLoading, toast, user }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [gifts, setGifts] = useState([]);

  const [newPrice, setNewPrice] = useState(0);

  const [totalReview, setTotalReview] = useState(0);

  const [isHovered, setIsHovered] = useState(null);

  const authToken = getToken(import.meta.env.VITE_AUTH_TOKEN);

  const [productQtt, setProductQtt] = useState(1);

  const [isInCart, setIsInCart] = useState([]);

  const { fetchUserCart,cart } = useAuthContext();

  

  useEffect(() => {
    if (data?.attributes?.sale?.data) {
      let price = data?.attributes?.Price;
      let saleP = data?.attributes?.sale?.data?.attributes?.Percent;
      setNewPrice(Math.ceil(price - (price * saleP) / 100));
    }

    setTotalReview(
      data?.attributes?.Review_1 +
        data?.attributes?.Review_2 +
        data?.attributes?.Review_3 +
        data?.attributes?.Review_4 +
        data?.attributes?.Review_5
    );

    if (data?.attributes?.gifts?.data.length > 0) {
      setGifts(data?.attributes?.gifts?.data);
    }

    // Check if the product is already in cart
    request
      .get(`product-carts?populate=*&filters[$and][0][product][id]=${data?.id}&filters[$and][1][cart][id]=${cart?.id}`, {
        headers: {
          Authorization: `${import.meta.env.VITE_BEARER} ${authToken}`,
        },
      })
      .then((rsp) => {
        setIsInCart(rsp.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [data,cart]);

  const handleATC = () => {
    if (!user) {
      toast.error(() => <div>You have to sign in to buy the product</div>);

      return null;
    }

    if (productQtt <= 0) {
      toast.error(() => (
        <div className="text-center">
          The quantity must greater than or equal 1
        </div>
      ));
      return null;
    }

    if (productQtt > data?.attributes?.Quantity) {
      toast.error(() => (
        <div className="text-center">
          The quantity must less than or equal the available{" "}
        </div>
      ));

      return null;
    }

    if (isInCart[0]?.attributes?.quantity === data?.attributes?.Quantity) {
      toast.error(() => (
        <div className="text-center">Product quantity has reach the limit </div>
      ));

      return null;
    }

    if (isInCart.length) {
      let totalQty =
        Number(isInCart[0]?.attributes?.quantity) + Number(productQtt);

      toast.promise(
        request.put(
          `/product-carts/${isInCart[0]?.id}`,
          {
            data: {
              quantity: totalQty,
              Price:
                newPrice === 0
                  ? totalQty * data?.attributes?.Price
                  : totalQty * newPrice,
            },
          },
          {
            headers: {
              Authorization: `${import.meta.env.VITE_BEARER} ${authToken}`,
            },
          }
        ),
        {
          loading: "Adding...",
          success: () => {
            fetchUserCart(user?.cart?.id);
            request
              .get(
                `product-carts?populate=*&filters[product][id]=${data?.id}`,
                {
                  headers: {
                    Authorization: `${
                      import.meta.env.VITE_BEARER
                    } ${authToken}`,
                  },
                }
              )
              .then((rsp) => {
                setIsInCart(rsp.data?.data);
              })
              .catch((err) => {
                throw err;
              });
            return `Quantity increased ${productQtt}`;
          },
          error: (err) => {
            console.error(err, "put");
            return "There was an error while adding the product";
          },
        }
      );
    } else {
      toast.promise(
        request.post(
          "/product-carts",
          {
            data: {
              cart: user?.cart?.id,
              product: data?.id,
              quantity: productQtt,
              Price:
                newPrice === 0
                  ? productQtt * data?.attributes?.Price
                  : productQtt * newPrice,
            },
          },
          {
            headers: {
              Authorization: `${import.meta.env.VITE_BEARER} ${authToken}`,
            },
          }
        ),
        {
          loading: "Adding...",
          success: () => {
            fetchUserCart(user?.cart?.id);

            request
              .get(
                `product-carts?populate=*&filters[product][id]=${data?.id}`,
                {
                  headers: {
                    Authorization: `${
                      import.meta.env.VITE_BEARER
                    } ${authToken}`,
                  },
                }
              )
              .then((rsp) => {
                setIsInCart(rsp.data?.data);
              })
              .catch((err) => {
                throw err;
              });
            return "The product has been added";
          },
          error: (err) => {
            console.error(err, "post");
            return "There was an error while adding the product";
          },
        }
      );
    }
  };

  // Handle when user type text in input field
  const handleInput = (e) => {
    e.target.value =e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  }
  
  // Handle when user forgot to enter number in input field
  const handleBlur = (e) => {
    if(!e.target.value){
      setProductQtt(1)
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full mb-[5%] gap-[30px]">
      {/* Image show */}
      <div className="flex flex-col basis-[50%] xl:basis-[40%] gap-[20px]">
        {/* Image Big slider */}
        <div>
          {isLoading ? (
            "Loading..."
          ) : (
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={10}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className=""
            >
              {data?.attributes?.Images?.data.map((item, index) => (
                <SwiperSlide
                  key={`${index}`}
                  className=" cursor-grab w-full flex items-center justify-center border-[5px] border-yellow rounded-[10px] overflow-hidden"
                >
                  <img
                    src={`http://localhost:1337${item.attributes.url}`}
                    className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] 2xl:w-[450px] 2xl:h-[450px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        {/* Image Small slider */}
        <div>
          {!isLoading && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={"auto"}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper"
            >
              {data?.attributes?.Images?.data.map((item, index) => (
                <SwiperSlide
                  key={`${index}`}
                  className={` w-[25%] md:w-[30%] lg:w-[25%] h-[85px] sm:h-[100px]  object-cover border-[3px] border-[transparent] cursor-pointer opacity-[0.5] rounded-[10px] overflow-hidden
                    `}
                >
                  <img
                    src={`http://localhost:1337${item.attributes.url}`}
                    alt="HT gaming gear thumb image"
                    className="h-full w-full bg-white"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      {/* Product detail */}
      <div className="md:basis-[60%] text-[20px] leading-[20px] 2xl:text-[24px] 2xl:leading-[24px] flex flex-col gap-[15px]">
        <div
          className="font-bold 2xl:text-[44px] 2xl:leading-[44px] xl:text-[38px] xl:leading-[38px] 
            md:text-[34px] md:leading-[34px] text-[32px] leading-[32px]"
        >
          {data?.attributes.Title}
        </div>
        <div className="flex items-center ">
          <Rating rating={data?.attributes.Rate} width="40px" />
          <span>({totalReview})</span>
        </div>
        <div>
          <span>Available :</span>
          {data?.attributes?.Quantity}
        </div>
        <div className="flex flex-wrap items-center  gap-[3%] h-fit font-bold">
          {newPrice > 0 ? (
            <>
              <div className="text-[40px] leading-[40px] text-yellow">
                {dollarUS.format(newPrice)}
              </div>
              <div className="text-[30px] text-[#ffffffa3] line-through">
                {dollarUS.format(data?.attributes.Price)}
              </div>
              <div className="text-[18px] bg-[rgb(244,108,108)] px-[15px] py-[3px] rounded-[3px]">
                -{data?.attributes?.sale?.data?.attributes?.Percent}%
              </div>
            </>
          ) : (
            <div className="text-[40px] text-yellow">
              {dollarUS.format(data?.attributes.Price)}
            </div>
          )}
        </div>
        <div className="w-[50%] flex gap-[5%] items-center">
          <div
            className="cursor-pointer"
            onClick={() =>
              setProductQtt((prev) => {
                if (prev >= data?.attributes?.Quantity) {
                  return data?.attributes?.Quantity;
                }
                return prev + 1;
              })
            }
          >
            <PlusIcon />
          </div>
          <input
            type="text"
            maxLength={2}
            min={1}
            max={data?.attributes?.Quantity}
            value={productQtt}
            onChange={(e) => setProductQtt(e.target.value || '')}
            onInput={handleInput}
            onBlur={handleBlur}
            className="bg-transparent outline-none money border-[2px] w-[20%] p-[10px] text-center rounded-[5px] focus:border-redHover"
          />
          <div
            className="cursor-pointer"
            onClick={() =>
              setProductQtt((prev) => {
                if (prev === 1) {
                  return 1;
                }
                return prev - 1;
              })
            }
          >
            <SubstractIcon />
          </div>
        </div>
        <div className=" flex justify-end gap-[10%]">
          <button
            type="submit"
            className=" bg-purpleBtn min-w-[170px] w-[50%] lg:w-[45%] xl:w-[35%] py-[20px] px-[10px] text-[24px] font-bold rounded-[5px] mt-[20px]
                flex justify-center items-center gap-[5%]"
            onClick={handleATC}
          >
            <span>Add to Cart</span>
            <CartIcon />
          </button>
        </div>
        {gifts.length > 0 && (
          <div className="border-t-[2px] border-[rgba(255,255,255,0.5)] pt-[15px]">
            <div className=" bg-redHover w-full px-[10px] md:px-[20px] py-[10px] font-bold">
              Gifts
            </div>
            <div className="border-[1px] border-t-0 border-redHover relative px-[10px] py-[10px] md:px-[20px] flex flex-col gap-[10px]">
              {gifts.map((item) => (
                <div
                  className="relative w-fit"
                  key={item.id}
                  onMouseEnter={() => setIsHovered(item.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <motion.div
                    className="cursor-default"
                    whileHover={{
                      textDecoration: "underline solid rgb(249,1,2)",
                      color: "rgb(249,1,2)",
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    {item.attributes.title}
                  </motion.div>
                  <AnimatePresence>
                    {isHovered === item.id && (
                      <motion.div
                        className="absolute top-[0] right-[0] translate-x-[100%] sm:translate-x-[80%]
                        md:translate-x-[110%] translate-y-[-70%]"
                        variants={imgVars}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <img
                          src={`http://localhost:1337${item?.attributes?.gift_image?.data?.attributes?.url}`}
                          alt={`HT Gaming gift image ${item.id}`}
                          className="w-[110px] max-h-[110px] md:w-[120px] md:max-h-[120px] 2xl:w-[150xp] 
                            2xl:max-h-[150px] rounded-[10px]  border-[3px] border-redHover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Detail;
