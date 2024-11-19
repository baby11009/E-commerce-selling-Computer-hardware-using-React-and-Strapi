import { Link } from "react-router-dom";
import { Arrow } from "../../assets/Icon";

const SmallPaginationControl = ({
  pageNum,
  categorySlug,
  pageArr,
  isMin,
  isMax,
}) => {
  return (
    <div className="md:flex items-center gap-5 hidden">
      <div className="flex text-[18px]">
        {pageNum}/{pageArr[pageArr.length - 1] || 1}
      </div>
      <div className="flex gap-1">
        {isMin ? (
          <div className="border-[2px] border-[#BABABA] rounded-[5px] w-[30px] h-[30px] font-bold text-[18px] flex items-center justify-center">
            <Arrow status={true} />
          </div>
        ) : (
          <Link
            className="border-[2px] rounded-[5px] w-[30px] h-[30px] font-bold text-[18px] flex items-center justify-center cursor-pointer"
            to={
              categorySlug
                ? `/shop/category/${categorySlug}/page/${Number(pageNum) - 1}`
                : `/shop/page/${Number(pageNum) - 1}`
            }
          >
            <Arrow />
          </Link>
        )}
        {isMax ? (
          <div className="border-[2px] border-[#BABABA] rounded-[5px] w-[30px] h-[30px] font-bold text-[18px] flex items-center justify-center rotate-180">
            <Arrow status={true} />
          </div>
        ) : (
          <Link
            className="border-[2px] rounded-[5px] w-[30px] h-[30px] font-bold text-[18px] flex items-center justify-center cursor-pointer rotate-180"
            to={
              categorySlug
                ? `/shop/category/${categorySlug}/page/${Number(pageNum) + 1}`
                : `/shop/page/${Number(pageNum) + 1}`
            }
          >
            <Arrow />
          </Link>
        )}
      </div>
    </div>
  );
};
export default SmallPaginationControl;
