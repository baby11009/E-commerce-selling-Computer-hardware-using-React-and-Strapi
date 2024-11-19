const ProductDescription = ({ data, isLoading }) => {
  return (
    <div
      className="border-[2px] border-redHover p-[10px] md:p-[20px] text-[20px] flex flex-col gap-[5%] 
    relative  rounded-[5px] overflow-hidden !pt-[8vh]"
    >
      <div className="absolute top-0 left-0 bg-redHover w-full h-[40px] flex items-center p-[10px] md:p-[20px] text-[24px] font-bold">
        Product description
      </div>
      <ul className="list-disc pl-4">
        {isLoading
          ? "Loading..."
          : data.attributes.Description.map((desc, index) => (
              <li key={`desc-${index}`}>{desc.children[0].text}</li>
            ))}
      </ul>
    </div>
  );
};
export default ProductDescription;
