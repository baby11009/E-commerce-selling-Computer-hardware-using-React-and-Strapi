const ProductTS = ({ data }) => {
  const techinicals = Object.entries(data?.attributes?.technical || {});

  if(techinicals.length <=0) {
    return null
  }

  return (
    <div
      className="border-[2px] border-redHover p-[10px] md:p-[20px] text-[20px] leading-[26px] flex flex-col gap-[5%] 
    relative rounded-[5px] !pt-[8vh] overflow-hidden"
    >
      <div className="absolute top-0 left-0 bg-redHover w-full h-[40px] flex items-center p-[10px] md:p-[20px] text-[24px] font-bold">
        Product technicals
      </div>
      <table className="md:w-[70%] ">
        <tbody>
          {techinicals.map((item, index) => (
            <tr className="border-[3px] border-yellow" key={`technical-${index}`}>
              <td className="border-[3px] border-yellow w-[30%] px-[20px] font-bold">{item[0]}</td>
              <td className="px-[20px]">{item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductTS;
