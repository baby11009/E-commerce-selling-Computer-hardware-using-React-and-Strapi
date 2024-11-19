import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Increase } from "../../assets/Icon";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const DownMenu = ({ 
  OptionArr, 
  set, 
  setValue, 
  isPrice, 
  searchText,
  categorySlug }) => {
  const dropdownRef = useRef();

  // useState để kiểm soát đóng mở của open và close của DownMenu
  const [isOpended, setIsOpended] = useState("");

  // Xử lý cho việc khi người dùng click ra khỏi DownMenu thì sẽ close DownMenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài dropdown hay không
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpended("");
      }
    };

    // Thêm lắng nghe sự kiện click khi component mount
    document.addEventListener("click", handleClickOutside);

    // Loại bỏ lắng nghe khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-transparent border-[2px] ${
        isOpended === "sort" && "border-redHover text-redHover"
      } md:w-[30%] lg:w-[22%] h-[60%] cursor-pointer py-[3px] px-[15px] rounded-[5px] font-[500] relative`}
      ref={dropdownRef}
    >
      <div
        onClick={() => setIsOpended((prev) => (prev === "sort" ? "" : "sort"))}
        className="text-[18px] flex gap-[5px] justify-between items-center"
      >
        {setValue.title}
        <div className={`${isOpended === "sort" ? "rotate-0" : "rotate-180"}`}>
          <Increase color={isOpended === "sort" && "#ff006e"} />
        </div>
      </div>
      {isOpended === "sort" && (
        <div className="absolute w-full left-0 mt-[10px] z-[100] rounded-[5px] bg-white overflow-hidden">
          {OptionArr.map((sort, i) => (
            <MotionLink
              key={i}
              className={`text-black py-[5px] px-[15px] block  ${
                i < OptionArr.length - 1 && "border-b-[1px] border-[#ccc]"
              }`}
              onClick={() => (
                setIsOpended(""),
                !isPrice
                  ? set({ title: sort.title, value: sort.value })
                  : set({ title: sort.title, from: sort.from, to: sort.to })
              )}
              to={
                categorySlug
                  ? `/shop/category/${categorySlug}/page/1`
                  : searchText 
                  ? `/shop/search/${searchText}/page/1`
                  : `/shop/page/1`
              }
              whileHover={{
                backgroundColor: "#ff006e",
                color: "#ffffff",
              }}
              transition={{
                duration: 0.1,
              }}
            >
              {sort.title}
            </MotionLink>
          ))}
        </div>
      )}
    </div>
  );
};
export default DownMenu;
