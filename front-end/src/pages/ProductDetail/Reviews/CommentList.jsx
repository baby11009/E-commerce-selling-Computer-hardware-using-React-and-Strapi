import CommentCard from "./CommentCard";
import { FilterIcon, LongArrowIcon } from "../../../assets/Icon";
import { useEffect, useState, useRef } from "react";

const CommentList = ({
  cmtData,
  setTotalSize,
  userId,
  refetchPd,
  refetchCmt,
  setCmtFilter,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài dropdown hay không
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpened(false);
      }
    };

    // Thêm lắng nghe sự kiện click khi component mount
    document.addEventListener("click", handleClickOutside);

    // Loại bỏ lắng nghe khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLoadMore = () => {
    if (cmtData?.meta.pagination.pageSize >= cmtData?.meta.pagination.total) {
      return null;
    }
    setTotalSize((prev) => prev + 4);
  };

  return (
    <div className="flex flex-col mt-[50px]">
      <div className="mb-[20px] flex justify-end">
        <div className="relative" ref={filterRef}>
          <div
            className=" border-[2px] px-[10px] py-[3px] hover:border-redHover flex
           justify-center items-center gap-[5px] rounded-[4px] cursor-pointer"
            onClick={() => setIsOpened((prev) => !prev)}
          >
            <FilterIcon />
            Filter
          </div>
          {isOpened && (
            <ul className="absolute bg-[rgba(0,0,0,0.2)] rounded-[4px] backdrop-blur-sm bottom-[-210%] left-0 z-[10]">
              <li
                className="px-[7px] py-[3px] flex justify-center items-center gap-[3px] cursor-pointer"
                onClick={(e) => {
                  setIsOpened(false);
                  setCmtFilter("desc");
                }}
              >
                <div>
                  <LongArrowIcon />
                </div>
                Latest
              </li>
              <li
                className="px-[7px] py-[3px] flex justify-center items-center gap-[3px] cursor-pointer"
                onClick={(e) => {
                  setIsOpened(false);
                  setCmtFilter("asc");
                }}
              >
                <div className="rotate-180">
                  <LongArrowIcon />
                </div>
                Oldest
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        {cmtData?.data.map((item) => (
          <CommentCard
            key={item.id}
            data={item}
            userId={userId}
            refetchPd={refetchPd}
            refetchCmt={refetchCmt}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {cmtData?.meta.pagination.total === 0 ? (
          ""
        ) : cmtData?.meta.pagination.pageSize <
          cmtData?.meta.pagination.total ? (
          <button
            onClick={handleLoadMore}
            className="w-fit hover:text-redHover"
          >
            Load more
          </button>
        ) : cmtData?.meta.pagination.total < 4 ? (
          ""
        ) : (
          <button
            onClick={() => setTotalSize(4)}
            className="w-fit hover:text-redHover"
          >
            Hide
          </button>
        )}
      </div>
    </div>
  );
};
export default CommentList;
