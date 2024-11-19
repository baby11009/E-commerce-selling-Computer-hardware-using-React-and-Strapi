import dollarUs from "../../../components/Money";
import React from "react";

const TableRow2 = ({ item, index }) => {

  return (
    <tr className="text-[20px]">
      <td className="h-[9.8vh] ">{index}</td>
      <td className="h-[9.8vh] overflow-hidden">
        {item?.attributes.product.data.attributes.Title}
      </td>

      <td className="h-[9.8vh] ">
        {dollarUs.format(item?.attributes.product.data.attributes.Price)}
      </td>
      <td className="h-[9.8vh] flex items-center ">
        {item?.attributes.product.data.attributes.Images.data
          .slice(0, 3)
          ?.map((image, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-[55px] h-[55px] rounded-[50%] bg-contain bg-center shadow-xl`}
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_BE_IMG}${
                    image?.attributes?.formats?.thumbnail?.url
                  })`,
                  transform: `translateX(${index * -22}px)`,
                }}
              ></div>
              {index === 2 &&
                item?.attributes.product.data.attributes.Images.data.length -
                  3 >=
                  1 && (
                  <div
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] 
                  bg-contain bg-center bg-[rgba(0,0,0,0.6)] text-white text-[16px]"
                    style={{
                      transform: `translateX(${index * -32}px)`,
                    }}
                  >
                    +
                    {item?.attributes.product.data.attributes.Images.data
                      .length - 3}
                  </div>
                )}
            </React.Fragment>
          ))}
      </td>
      <td className="h-[9.8vh] ">
        {item?.attributes?.product.data.attributes.sale.data?.attributes
          .Percent || 0}
        %
      </td>
      <td className="h-[9.8vh] ">{item?.attributes.quantity}</td>
      <td className="h-[9.8vh] ">
        {dollarUs.format(item?.attributes.Price || 0)}
      </td>
    </tr>
  );
};
export default TableRow2;
