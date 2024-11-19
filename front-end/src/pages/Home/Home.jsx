import { useState, useEffect } from "react";
import Hero from "./Hero";
import BrandList from "./BrandList";
import CategoryList from "./CategoryList";
import PdList from "./PdList"
import BrandQuality from "./BrandQuality";
import UserFeedback from "./UserFeedback";
import Contact from "./Contact";

import { useAuthContext } from "../../apiService/Login/context/AuthContext";

const Home = () => {

  const [page,setPage] = useState(1)

  const [pageSize, setPageSize] = useState(10);

  const {windowSize} = useAuthContext()

  const {
    toast
  } = useAuthContext()

  let gridCols = '';

  useEffect(() => {
    if(windowSize < 769 ) {
      setPageSize(4)
    } else if(windowSize < 1024) {
      setPageSize(8)
    } else {
      setPageSize(10)
    }
  },[windowSize])


  return (
    <div className="md:px-[6%] lg:px-[9%] w-full pt-[5%] sm:pt-[1.5%] z-[1]">
        <Hero windowSize={windowSize}/>
        <BrandList/>
        <CategoryList currentPage={page} setPage={setPage} pageSize={pageSize} gridCols={gridCols}/>
        <PdList slug={'pc'} title='PC'/>
        <PdList slug={'laptop'} title='Laptop'/>
        <PdList slug={'gear'} title='Gear'/>
        <BrandQuality />
        <UserFeedback />
        <Contact toast={toast}/>
    </div>
  );
};
export default Home;