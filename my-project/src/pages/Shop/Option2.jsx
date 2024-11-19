import { useState,useEffect} from "react";

const Option2 = ({
    setFromPrice, 
    setToPrice,
    setPriceChange
}) => {

    const [isChecked,setIsChecked] = useState('more')

    const [price,setPrice] = useState(0)

    useEffect(() =>{
        if(isChecked === 'more'){
            setFromPrice(Number(price));
            setToPrice(Infinity);
        }else {
            setFromPrice(0);
            setToPrice(Number(price))
        }

    },[isChecked,price])

  return (
    <div className="mt-[25px] flex items-center gap-[20px]">
        <div>
            <label className="container relative flex items-center cursor-pointer mx-[20px] mb-[10px]">
                More
                <input type="radio" checked={isChecked === 'more'} name="radio" className="absolute opacity-0 cursor-pointer" value='more' onChange={(e) => setIsChecked(e.target.value)}/>
                <span className="checkmark absolute top-[3px] left-[-34px] h-[20px] w-[20px] rounded-[50%] bg-[#eae8e8]">
                    {isChecked === 'more' && <div className=" border-[3.5px] bg-redHover w-full h-full rounded-[50%]"></div>}
                </span>
            </label>
            <label className="container relative flex items-center cursor-pointer mx-[20px]">
                Less
                <input type="radio" checked={isChecked === 'less'} name="radio" className="absolute opacity-0 cursor-pointer" value='less' onChange={(e) => setIsChecked(e.target.value)}/>
                <span className="checkmark absolute top-[3px] left-[-34px] h-[20px] w-[20px] rounded-[50%] bg-[#eae8e8]">
                {isChecked === 'less' && <div className=" border-[3.5px] bg-redHover w-full h-full rounded-[50%]"></div>}
                </span>
            </label>
        </div>
        <div className="flex border-[3px] w-[50%] ">
          <div className="w-[35%] flex items-center justify-center border-r-[3px]">$</div>
          <input
            type="number"
            value={price}
            className="bg-transparent w-[65%] m-[4px]"
            onChange={(e) => {
              setPrice(e.target.value),
              setPriceChange(true)
            }}

          />
        </div>
    </div>
  ) 
};
export default Option2;