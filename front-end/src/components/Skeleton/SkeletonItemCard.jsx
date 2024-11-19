import { BlankImage } from "../../assets/Icon";

const SkeletonItemCard = ({noUse}) => {
  
  return (
    <div className={` ${noUse ? '' : '!w-[24.2%] !min-w-[290px]'} h-[410px] cursor-pointer border-[2.5px] border-yellow rounded-[10px] p-[15px] mb-[1%] block`}>
      <div
        className={`h-[5%] w-[30%] mb-[5%] rounded-[20px] loading  `}
      >
      </div>
      <div className="flex justify-center items-center h-[250px] rounded-[5px] loading ">
        <BlankImage />
      </div>
      <div
        className={`h-[5%] w-full mt-[10px] rounded-[20px] loading  `}
      >
      </div>
      <div
        className={`h-[5%] w-full mt-[7px] mb-[10px] rounded-[20px] loading  `}
      >
      </div>
      <div className="flex justify-between h-full">
        <div
            className={`h-[5%] mt-[5px] w-[37%] rounded-[20px] loading  `}
        >
        </div><div
            className={`h-[5%] mt-[5px] w-[25%] rounded-[20px] loading  `}
        >
        </div>
      </div>
    </div>
  );
};
export default SkeletonItemCard;
