import TableRow from "./TableRow";

const OrdersTable = ({ data, num, toast, refetch }) => {

  const arrLength = 7 - (data ? data.length : 0);
  
  const newArray = Array.from({ length: arrLength }, (_, index) => index + 1);
  

  return (
    <div className="flex-1 shadow-myShadow  rounded-[5px] text-center overflow-auto">
      <table className="w-full min-w-[1100px] h-full table-auto">
        <thead className="h-[7vh] bg-purpleBtn text-white text-[18px]">
          <tr>
            <th>ON</th>
            <th>ID</th>
            <th>CODE</th>
            <th>TYPE</th>
            <th>DISCOUNT</th>
            <th>PRICE</th>
            <th>SHIP FEE</th>
            <th>CREATED DATE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <TableRow
              item={item}
              index={(Number(num) - 1) * 8 + index}
              key={item?.id}
              toast={toast}
              refetch={refetch}
            />
          ))}
          {newArray.map((item) => (
            <tr key={item}></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrdersTable;
