import { pageCount } from "../../components/PageCount";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link,Navigate } from "react-router-dom";
import { getData } from "../../apiService/shopService";

const MotionLink = motion(Link);

const CategoryList = ({currentPage,setPage,pageSize}) => {

    const { data , isLoading , isError, error} = getData('categories',{
        'populate' : '*',
        'pagination[page]' : currentPage,
        'pagination[pageSize]' : pageSize
      });

    let prevPage = useRef();

    useEffect(() =>{
        prevPage.current = currentPage
    },[currentPage])

    let pageVars = useRef();
    pageVars = {
        hidden : {
            x : `${prevPage.current > currentPage ? '100vw' : '-100vw'}`,
            opacity : 0
        },
        visible : {
            x : 0,
            opacity : 1,
            transition : {
                type : 'tween',
                duration : .5
            }
        } 
    }


    if(isError) {
        console.error(error.message);
        return (
          <Navigate to={`/error/${error.message}`}/>
        )
    }

  return (
    <div className="mt-[20px] py-[20px]">
        <span className="text-yellow text-[24px] font-bold leading-[24px]">Product Categories</span>
        {
            isLoading ? 'Content is Loading' : ( 
                <>
                    <div className={`grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-[400px]  gap-3 overflow-hidden w-full mt-[20px] text-white `}>
                        {
                            data.data.map(category => (
                                <MotionLink key={category.id} className={`flex flex-col h-[170px] ${data.data.length > 5 && 'justify-center'}  items-center cursor-pointer`}
                                    variants={pageVars}
                                    initial='hidden'
                                    animate='visible'
                                    to={`/shop/category/${category.attributes.Slug}/page/1`}
                                >
                                    <img src={`http://localhost:1337${category.attributes.image.data.attributes.formats.thumbnail.url}`} alt="" className="bg-cover h-[85%]"/>
                                    <span className="text-[20px] font-bold mt-[10px] h-[15%]">{category.attributes.Title}</span>
                                </MotionLink>
                            ))
                        }
                    </div>
                    <div className="flex justify-end mt-[20px]">
                        {pageCount(data.meta.pagination.total,pageSize).map( page => (
                            <div key={page} className={`w-[30px] h-[30px] rounded-[50%] flex items-center justify-center 
                                cursor-pointer mr-[10px] border-[1px]  ${page === currentPage ? 'text-yellow border-yellow' : 'text-white border-white'} font-bold text-[18px]`}
                                onClick={() => setPage(page)}>
                                {page}
                            </div>
                        ))}
                    </div>
                </>
            )
        }
        
    </div>
  )
};
export default CategoryList;