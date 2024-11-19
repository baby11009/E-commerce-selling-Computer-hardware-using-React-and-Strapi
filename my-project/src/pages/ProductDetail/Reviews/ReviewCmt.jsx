import RatingBar from "./RatingBar";
import ReviewInput from "./ReviewInput";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import { Rating } from "../../../components";

const RatingList = [5, 4, 3, 2, 1];

const ReviewCmt = ({
  cmtData,
  user,
  toast,
  productData,
  refetchPd,
  refetchCmt,
  setTotalSize,
  setCmtFilter
}) => {
  return (
    <div
      className="border-[2px] border-redHover p-[10px] md:p-[20px] text-[18px] md:text-[20px] flex flex-col gap-[5%] 
    relative rounded-[5px] overflow-hidden !pt-[8vh]"
    >
      <div className="absolute top-0 left-0 bg-redHover w-full h-[40px] flex items-center p-[10px] md:p-[20px] text-[24px] font-bold">
        Reviews & commments
      </div>
      <div className="flex items-center justify-center text-center mb-[30px]">
        <div className="flex flex-col pr-[10px] sm:pr-[20px]  md:pr-[30px]">
          <span className="text-[48px] md:text-[60px] leading-[68px] font-bold text-yellow">
            {productData?.attributes.Rate}
          </span>
          <span className="leading-[24px]">Out of 5</span>
          <Rating rating={productData?.attributes.Rate} width={"36px"} />
          <div className="font-bold mb-[5px]">
            Based on
            <span className="text-yellow"> {cmtData?.data.length}</span> reviews
          </div>
        </div>
        <div className="flex flex-col gap-[4px] pl-[10px] sm:pl-[20px]  md:pl-[30px] border-l-[2px] text-[24px] leading-[30px]">
          {RatingList.map((item) => (
            <RatingBar
              key={item}
              number={item}
              count={productData?.attributes[`Review_${item}`]}
              total={cmtData?.data.length}
            />
          ))}
        </div>
      </div>
      {user ? (
        <ReviewInput
          user={user}
          productId={productData?.id}
          toast={toast}
          refetchPd={refetchPd}
          refetchCmt={refetchCmt}
        />
      ) : (
        <div className="flex items-center justify-center">
          <Link
            className="w-fit p-[10px] bg-purpleBtn rounded-[5px] font-bold flex gap-[10px] items-center justify-center"
            to="/signin"
          >
            Signin to post your reviews
          </Link>
        </div>
      )}
      <CommentList
        cmtData={cmtData}
        setTotalSize={setTotalSize}
        userId={user?.id}
        refetchPd={refetchPd}
        refetchCmt={refetchCmt}
        setCmtFilter={setCmtFilter}
      />
    </div>
  );
};
export default ReviewCmt;
