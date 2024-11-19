  import { ItemCard,NoResultFound } from "../../components";
import PaginationControl from "./PaginationControl";


const ShowProduct = ({
    data,
    searchText,
    categorySlug,
    pageNum,
    pageArr
}) => {

  return (
    <>
      {
        data?.length
        ? 
          <div className="mt-[15px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
              data?.map((product, index) => (
                  <ItemCard key={index} product={product} />))
            }
          </div>
        : <NoResultFound />
      }
      <div className="flex items-center justify-center">
        <PaginationControl
          searhText={searchText}
          categorySlug={categorySlug}
          pageNum={Number(pageNum)}
          totalPage={pageArr.length}
        />
      </div>
    </>
  );
};
export default ShowProduct;
