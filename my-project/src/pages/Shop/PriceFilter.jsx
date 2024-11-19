import {useState,useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Option1 from "./Option1";
import Option2 from "./Option2";

const PriceFilter = ({
  openedPrice,
  minPrice,
  maxPrice,
  minGap,
  setFromPrice,
  setToPrice,
  setPriceChange,
  boxVars
}) => {

  const [option,setOption] = useState(1)


  return (
      <div className="overflow-x-hidden overflow-y-hidden px-[30px]">
        <AnimatePresence>
          {openedPrice && (
            <motion.div
              variants={boxVars}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <div className="flex items-center mx-[-15px] mt-[10px]">
                <div onClick={()=> setOption(1)} className={`cursor-pointer rounded-[8px] border-[2px] ${option === 1 && 'border-redHover'} px-[10px] py-[2px]`}>Option 1</div>
                <div onClick={()=> setOption(2)}  className={`cursor-pointer rounded-[8px] border-[2px] ${option === 2 && 'border-redHover'} px-[10px] py-[2px]`}>Option 2</div>
              </div>
              {
                option === 1 
                ? <Option1 minPrice={minPrice} maxPrice={maxPrice} minGap={minGap} setFromPrice={setFromPrice} setToPrice={setToPrice} setPriceChange={setPriceChange}/>
                : <Option2 setFromPrice={setFromPrice} setToPrice={setToPrice} setPriceChange={setPriceChange}/>
                            }
            </motion.div>
          )}
        </AnimatePresence>

      </div>
  );
};
export default PriceFilter;
