
import { useEffect,useState } from "react";

const RatingBar = ({ number, count, total }) => {

    const [percent,setPercent] = useState(0)

    useEffect(() => {
        setPercent(count/total*100)
    },[count,total])

  return (
    <div className="flex  justify-center items-center gap-[10px] md:gap-[20px]">
      <div>{number}</div>
      <div className="w-[30vw] lg:w-[25vw] border-[2px] h-[20px] rounded-[30px] overflow-hidden relative">
        <div
          className="absolute inset-0 h-full bg-yellow"
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>
      <div className="text-[20px]">({count})</div>
    </div>
  );
};
export default RatingBar;
