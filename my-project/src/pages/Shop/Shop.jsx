import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getData } from "../../apiService/shopService";
import DownMenu from "./DownMenu";
import { pageCount } from "../../components/PageCount";
import SmallPaginationControl from "./SmallPaginationControl";
import FilterBox from "./FilterBox";
import ShowProduct from "./ShowProduct";
import { SkeletonShop } from "../../components";

const Shop = () => {
  // Lấy các vars từ path
  const { pageNum, categorySlug, searchText } = useParams();

  // useState cho việc lấy ra các option category đã chọn để filter data trong FilterBox
  const [cate, setCate] = useState({});

  // useState cho việc lấy ra các option sort dữ liệu từ DownMenu
  const [sort, setSort] = useState({ title: "Default", value: "" });

  // useState cho việc lấy ra các option về price (min và max) đã chọn để filter data trong FilterBox
  const [price, setPrice] = useState({
    title: "Default",
    from: 0,
    to: Infinity,
  });

  // useState để theo dõi việc open và close của FilterBox
  const [opened, setOpened] = useState(false);

  // Crawl data
  const { data, isLoading, error, isError } = getData("products", {
    populate: "*",
    "pagination[page]": pageNum,
    "pagination[pageSize]": 12,
    "filters[$and][0][Categories][Slug][$eqi]": categorySlug,
    "filters[$and][1][Title][$contains]": searchText,
    ...cate,
    "filters[Price][$gte]": price.from,
    "filters[Price][$lte]": price.to,
    "sort[0]": sort.value,
  });

  const sortArr = useRef();

  const priceArr = useRef();

  const pageArr = useRef();

  let isMin = useRef();

  let isMax = useRef();

  // Các sort Option cho DownMenu
  sortArr.current = [
    {
      title: "Default",
      value: "",
    },
    {
      title: "Price increase",
      value: "Price:asc",
    },
    {
      title: "Price decrease",
      value: "Price:desc",
    },
  ];

  // Các price Option cho DownMenu
  priceArr.current = [
    {
      title: "Default",
      from: 0,
      to: Infinity,
    },
    {
      title: "$10 - $100",
      from: 10,
      to: 100,
    },
    {
      title: "$110 - $200",
      from: 110,
      to: 200,
    },
    {
      title: "Above $210",
      from: 210,
      to: Infinity,
    },
  ];

  // Lấy ra mảng chứa các từng số trang dựa theo data đã crawl
  // pageCount là 1 hàm viết bên ngoài để trả về mảng chứa số trang dựa theo các biến số truyền vào
  pageArr.current = pageCount(data?.meta?.pagination?.total || 1, 12);

  // Xác định xem trang đang ở là min (1) hay chưa
  isMin.current = Number(pageNum) === 1;

  // Xác định xem trang đang ở là max hay chưa
  isMax.current = Number(pageNum) === pageArr.current.length;

  // Xử lý khi mở FilterBox sẽ ẩn đi thanh scroll để người dùng k thể thao tác
  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  useEffect(() => {
    if (searchText) {
      setCate({});
      setPrice({
        title: "Default",
        from: 0,
        to: Infinity,
      });
    }
  }, [searchText]);

  if (isError) {
    console.error(error.message);
    return <Navigate to={`/error/${error.message}`} />;
  }

  return (
    <>
      <div
        className={`md:px-[6%] lg:px-[9%] pt-[5%] sm:pt-[1.5%] text-white relative z-[0.5] ${
          opened && "md:!pr-[7.5%] lg:!pr-[10%]"
        }`}
      >
        <div>
          <div className="border-[2px] rounded-[5px] h-[60px] flex px-[15px]">
            <div className="flex items-center gap-5 h-full w-full mr-[20px] ">
              <DownMenu
                OptionArr={sortArr.current}
                set={setSort}
                setValue={sort}
                searchText={searchText}
                categorySlug={categorySlug}
              />
              <DownMenu
                OptionArr={priceArr.current}
                set={setPrice}
                setValue={price}
                isPrice={true}
                searchText={searchText}
                categorySlug={categorySlug}
              />
            </div>
            <div className="flex items-center gap-7 justify-end">
              <div
                className="border-[2px] h-[60%] px-[10px] flex items-center cursor-pointer rounded-[5px] font-bold"
                onClick={() => setOpened((prev) => !prev)}
              >
                Filter
              </div>
              <SmallPaginationControl
                pageNum={pageNum}
                categorySlug={categorySlug}
                pageArr={pageArr.current}
                isMin={isMin.current}
                isMax={isMax.current}
              />
            </div>
          </div>
          {isLoading ? (
            <SkeletonShop />
          ) : (
            <ShowProduct
              data={data?.data}
              searchText={searchText}
              categorySlug={categorySlug}
              pageNum={pageNum}
              pageArr={pageArr.current}
            />
          )}
        </div>
      </div>
      <FilterBox
        setOpened={setOpened}
        opened={opened}
        setPrice={setPrice}
        setSort={setSort}
        setCate={setCate}
        searchText={searchText}
        categorySlug={categorySlug}
      />
    </>
  );
};
export default Shop;
