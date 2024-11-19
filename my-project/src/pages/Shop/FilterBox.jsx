import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownArrow } from "../../assets/Icon";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
import { getData } from "../../apiService/shopService";
import { useNavigate } from "react-router-dom";

const boxVars = {
  hidden: {
    height: 0,
  },
  visible: {
    height: "206px",
    transition: {
      type: "tween",
    },
  },
  exit: {
    height: "0 ",
    transition: {
      type: "tween",
    },
  },
};

const minPrice = 0;
const maxPrice = 1000;
const minGap = 100;

const FilterBox = ({
  setOpened,
  opened,
  setPrice,
  setSort,
  setCate,
  searchText,
  categorySlug,
}) => {
  const [openedPrice, setOpenedPrice] = useState(false);

  const [openedCategory, setOpenedCategory] = useState(true);

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(Infinity);

  const [priceChange, setPriceChange] = useState(false);

  const [checkedValues, setCheckedValues] = useState([]);

  const [categories, setCategories] = useState([]);

  const { data, isLoading } = getData("categories", {
    populate: "*",
  });

  useEffect(() => {
    setCategories(
      Array.from(isLoading ? [] : data.data, (item) => {
        return {
          title: item.attributes.Title,
          slug: item.attributes.Slug,
          quantity: item.attributes.Products?.data.length,
        };
      })
    );
  }, [data]);

  useEffect(() => {
    if (categorySlug) {
      setCheckedValues([...checkedValues, categorySlug]);
    }
  }, []);

  const navigate = useNavigate();

  const handleDone = (e) => {
    setOpened(false);
    if (priceChange) {
      setPrice({ title: "Default", from: fromPrice, to: toPrice });
    } else {
      setPrice({
        title: "Default",
        from: 0,
        to: Infinity,
      });
    }
    setSort({ title: "Default", value: "" });
    setCate(
      checkedValues.reduce((acc, val, key) => {
        acc[`filters[$and][${key}][Categories][Slug][$eqi]`] = val;
        return acc;
      }, {})
    );

    if (checkedValues.length !== 0) {
      navigate("/shop/page/1");
    } else if (searchText) {
      navigate(`/shop/search/${searchText}/page/1`);
    }
  };

  useEffect(() => {
    if (searchText) {
      setCheckedValues([]);
      setPrice({});
    }
  }, [searchText]);

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          className="bg-[rgba(0,0,0,0.5)] backdrop-blur-[2px] w-[100vw] h-[100vh] inset-0 fixed z-[20] text-[18px]"
          onClick={() => setOpened(false)}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.2,
          }}
        >
          <motion.div
            className="absolute bg-[rgba(255,255,255,0.7)] top-0 right-0 w-[100vw] sm:min-w-[400px] sm:w-[25%] h-full overflow-y-auto px-[20px]"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className=" flex justify-between items-center  pt-[20px] pb-[15px] border-b-[2px]">
              <div className="font-bold text-[24px]">Filters</div>
              <div onClick={() => setOpened(false)} className="cursor-pointer">
                x
              </div>
            </div>
            <div className="my-[20px] text-[#111827] ">
              <div className="flex items-center justify-between px-[15px] text-[20px]">
                <div>Price</div>
                <div
                  className={`cursor-pointer ${openedPrice && "rotate-180"}`}
                  onClick={() => setOpenedPrice((prev) => !prev)}
                >
                  <DownArrow />
                </div>
              </div>
              <PriceFilter
                openedPrice={openedPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minGap={minGap}
                setFromPrice={setFromPrice}
                setToPrice={setToPrice}
                setPriceChange={setPriceChange}
                boxVars={boxVars}
              />
            </div>
            <hr className="my-[20px] mx-[15px] border-[1.5px]" />
            <div className="my-[15px] text-[#111827] ">
              <div className="flex items-center justify-between px-[15px] text-[20px]">
                <div>Categories</div>
                <div
                  className={`cursor-pointer ${openedCategory && "rotate-180"}`}
                  onClick={() => setOpenedCategory((prev) => !prev)}
                >
                  <DownArrow />
                </div>
              </div>
              <CategoryFilter
                boxVars={boxVars}
                openedCategory={openedCategory}
                categories={categories}
                checkedValues={checkedValues}
                setCheckedValues={setCheckedValues}
              />
            </div>
            <hr className="my-[20px] mx-[15px] border-[1.5px]" />
            <button
              className="absolute left-[50%] bottom-[20px] translate-x-[-50%] bg-[#111827] text-white 
              w-[90%] py-[10px] rounded-[5px]"
              onClick={handleDone}
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default FilterBox;
