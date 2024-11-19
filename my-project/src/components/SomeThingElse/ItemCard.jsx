import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Rating from "./Rating";
import { dollarUS } from "../MoneyConvert";
import Tag from "./Tag";
import { GiftIcon } from "../../assets/Icon";

const MotionLink = motion(Link);

const ItemCard = ({ product }) => {

  const [tagSale, setTagSale] = useState();
  const [tagGift, setTagGift] = useState(false);

  useEffect(() => {
    let tagSale = product?.attributes?.sale?.data;
    if (tagSale) {
      setTagSale(tagSale?.attributes.Percent);
    }
    if (product?.attributes?.gifts?.data.length) {
      setTagGift(true);
    }
  }, [product]);

  return (
    <MotionLink
      className="border-[2.5px] border-yellow rounded-[10px] p-[15px] mb-[7%] block text-white "
      to={`/shop/product/${product.attributes.Slug}`}
      whileHover={{
        borderColor: "#ff006e",
      }}
    >
      <div className="flex gap-[5%] mb-[5%] w-full relative">
        {tagSale ? (
          <Tag tag={`Sale ${tagSale}%`} color={"#FC2307"} />
        ) : (
          <div className="mb-[10%]"></div>
        )}
        {tagGift && (
          <div className="absolute right-0">
            <GiftIcon />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <img
          src={`http://localhost:1337${product.attributes.MainImage.data.attributes.url}`}
          alt="Image"
          className="w-full h-[250px]  rounded-[5px]"
        />
      </div>
      <div
        className="text-[18px] leading-[20px] font-bold h-[40px] my-[10px] overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        <span className="">{product.attributes.Title}</span>
      </div>
      <div className="flex justify-between font-bold">
        <Rating rating={product.attributes.Rate} />
        <span>{dollarUS.format(product.attributes.Price)}</span>
      </div>
    </MotionLink>
  );
};
export default ItemCard;
