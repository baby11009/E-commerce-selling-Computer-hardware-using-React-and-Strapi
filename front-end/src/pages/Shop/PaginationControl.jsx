import { useCallback } from "react";
import { Arrow, DoubleArrow } from "../../assets/Icon";
import { Link } from "react-router-dom";

const PaginationControl = ({ searhText, categorySlug, pageNum, totalPage }) => {
  // Hàm xử lý việc lấy ra số trang để Show ở thanh Pagination tương ứng với trang hiện tại
  const getPagesToShow = useCallback(() => {
    let startPage = pageNum - 2;
    let endPage = pageNum + 2;

    if (pageNum <= 3) {
      startPage = 1;
      endPage = Math.min(totalPage, 5);
    } else if (pageNum >= totalPage - 2) {
      startPage = totalPage - 4;
      endPage = totalPage;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [pageNum]);

  const pageArr = getPagesToShow();

  return (
    <div
      className='text-[20px] font-bold flex items-center gap-2'
      style={{ userSelect: "none" }}
    >
      <Link
        className='border-[2px] hover:border-redHover  w-[50px] h-[35px] rounded-[10px] flex items-center justify-center cursor-pointer'
        to={
          categorySlug
            ? `/shop/category/${categorySlug}/page/1`
            : searhText
            ? `/shop/search/${searhText}/page/1`
            : `/shop/page/1`
        }
      >
        <DoubleArrow />
      </Link>
      <Link
        className='border-[2px] hover:border-redHover  w-[35px] h-[35px] rounded-[10px] flex items-center justify-center cursor-pointer'
        to={
          categorySlug
            ? `/shop/category/${categorySlug}/page/${Math.max(1, pageNum - 1)}`
            : searhText
            ? `/shop/search/${searhText}/page/${Math.max(1, pageNum - 1)}`
            : `/shop/page/${Math.max(1, pageNum - 1)}`
        }
      >
        <Arrow />
      </Link>
      <div className='flex items-center gap-[5px]'>
        {pageArr.map((page, i) => (
          <Link
            key={i}
            className={`w-[35px] h-[35px] rounded-[10px] hover:border-redHover  border-[2px] ${
              pageNum === page && "border-redHover"
            } flex items-center justify-center cursor-pointer`}
            to={
              categorySlug
                ? `/shop/category/${categorySlug}/page/${page}`
                : searhText
                ? `/shop/search/${searhText}/page/${page}`
                : `/shop/page/${page}`
            }
          >
            {page}
          </Link>
        ))}
      </div>
      <Link
        className='rotate-180 border-[2px] hover:border-redHover w-[35px] h-[35px] rounded-[10px] flex items-center justify-center cursor-pointer'
        to={
          categorySlug
            ? `/shop/category/${categorySlug}/page/${Math.min(
                totalPage,
                pageNum + 1
              )}`
            : searhText
            ? `/shop/search/${searhText}/page/${Math.min(
                totalPage,
                pageNum + 1
              )}`
            : `/shop/page/${Math.min(totalPage, pageNum + 1)}`
        }
      >
        <Arrow />
      </Link>
      <Link
        className='rotate-180 border-[2px] hover:border-redHover w-[50px] h-[35px] rounded-[10px] flex items-center justify-center cursor-pointer'
        to={
          categorySlug
            ? `/shop/category/${categorySlug}/page/${totalPage}`
            : searhText
            ? `/shop/search/${searhText}/page/${totalPage}`
            : `/shop/page/${totalPage}`
        }
      >
        <DoubleArrow />
      </Link>
    </div>
  );
};
export default PaginationControl;
