import { useParams} from "react-router-dom";
import { getDataWithAuth } from "../../../apiService/ordersService";
import TableRow2 from "./TableRow2";
import { useEffect, useState } from "react";
import { DownArrow } from "../../../assets/Icon";
import { CategoryArrowIcon } from "../../../assets/Icon";
import {motion, useAnimate} from 'framer-motion'

const OrderDetails = ({
  search,
  setPages
}) => {

  const { num, orderId } = useParams();

  const [scope,animate] = useAnimate()

  const [sort,setSort] = useState('asc')

  const { data, error } = getDataWithAuth("product-carts", {
    "filters[$and][0][order][orderId]": orderId,
    "populate[product][populate]": "*",
    "pagination[page]": num,
    "pagination[pageSize]":8,
    "sort[0]" : `Price:${sort}`,
    ...search
  });

  const arrLength = 7 - (data ? data?.data.length : 0);

  useEffect(() =>{
    setPages(data?.meta?.pagination?.pageCount)
  },[data])

  const newArray = Array.from({ length: arrLength }, (_, index) => index + 1);

  const handleSorting = (sortType) => {
    setSort(sortType)

    if(sortType === 'asc') {
      animate("svg", { rotateZ: 0 }, { duration: 0 })
    } else {
      animate("svg", { rotateZ: 180 }, { duration: 0 })
    }
  }

  return (
    <div className="flex-1 shadow-myShadow rounded-[5px] text-center overflow-auto">
      <table className="w-full min-w-[1100px] h-full table-auto">
        <thead className="h-[7vh] bg-purpleBtn text-white">
          <tr>
            <th>ON</th>
            <th className="w-[30%]">NAME</th>
            <th>PRICE</th>
            <th className="w-[15%]">IMAGE</th>
            <th>SALE</th>
            <th>QUANTITY</th>
            <th>
              <div className="flex items-center justify-center gap-[5px] cursor-pointer" ref={scope} onClick={() => handleSorting(sort === 'asc' ? 'desc' : 'asc')}>

                TOTAL PRICE
                <CategoryArrowIcon motion={motion} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data?.data.map((item,index) => (
              <TableRow2 item={item} index={(Number(num) - 1) * 8 + index} key={index}/>
            ))
          }
          {newArray.map((item) => (
            <tr key={item}></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderDetails;
