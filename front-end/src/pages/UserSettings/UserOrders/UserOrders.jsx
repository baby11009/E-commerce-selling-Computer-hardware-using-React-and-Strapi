
import { useEffect, useState, useRef } from "react";
import { MenuIcon, BlankSearchIcon } from "../../../assets/Icon";
import OrdersTable from "./OrdersTable";
import { getDataWithAuth } from "../../../apiService/ordersService";
import OrderDetails from "./OrderDetails";
import PageControl from "./PageControl";

const UserOrders = ({
  toast,
  user,
  setOpenedMenu,
  setHoveredObj,
  hoveredObj,
  orderNum,
  num,
}) => {


  const [ordersData, setOrdersData] = useState(null);

  const [pages,setPages] = useState(1)


  const [search, setSearch] = useState(undefined);

  const timer = useRef();

  const { data, isError, isLoading, isErrorMessage,refetch } = getDataWithAuth(
    "orders",
    {
      populate: "*",
      "filters[user][id]": user?.id,
      "pagination[page]": num,
      "pagination[pageSize]": 7,
      "sort[0]": "createdAt:desc",
    }
  );

  const handleOnChange = (e) => {
    window.clearTimeout(timer.current); // prevent errant multiple timeouts from being generated
    timer.current = window.setTimeout(() => {
      if (e.target.value === "") {
        setSearch(undefined);
        return null;
      }
      setSearch({
        "filters[$and][1][product][Title][$contains]": e.target.value,
      });
    }, 500);
  };

  return (
    <div
      className="w-full sm:flex-1 py-[30px] px-[10px] sm:px-[15px] lg:px-[30px] flex flex-col 
      gap-[15px] text-[16px] leading-[16px] md:text-[18px] md:leading-[18px] text-blackColor relative overflow-hidden"
    >
      <div className="text-[32px] sm:text-[40px] leading-[40px] font-bold flex items-center justify-between">
        <span className="w-[60%]">{orderNum ? `${orderNum}'s details` : "Orders information"}</span>
        <div
          className="sm:hidden w-[50px] h-[50px] rounded-[50%] flex items-center justify-center 
          border-[2px] border-black cursor-pointer hover:border-none hover:bg-purpleBtn"
          onClick={() => setOpenedMenu(true)}
          onMouseOver={() => setHoveredObj("menu")}
          onMouseOut={() => setHoveredObj("")}
        >
          <MenuIcon hoveredObj={hoveredObj} />
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col gap-[15px] ${
          !orderNum && "mt-[10px]"
        } `}
      >
        {orderNum ? (
          <>
            <div className="w-[70%] sm:w-[60%] md:w-[35%] xl:w-[25%] h-[7%] border-[2px] border-black rounded-[20px] flex pl-[20px] pr-[10px]">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none w-[85%]"
                onChange={handleOnChange}
              />
              <div className="flex-1 flex justify-center items-center cursor-pointer">
                <BlankSearchIcon />
              </div>
            </div>
            <PageControl
              link={`/account/orders/details/${orderNum}/page`}
              num={num}
              totalPage={pages}
            />
            <OrderDetails search={search} setPages={setPages} />
          </>
        ) : (
          <>
            <PageControl
              link={'/account/orders/page'}
              num={num}
              totalPage={data?.meta?.pagination?.pageCount}
            />
            <OrdersTable data={data?.data} refetch={refetch} num={num} toast={toast} />
          </>
        )}
      </div>
    </div>
  );
};
export default UserOrders;
