
import { motion} from 'framer-motion';
import {Link} from "react-router-dom"

const MotionLink = motion(Link)

const CategoryBlock = ({title,img,path,setHovered}) => {
  return (
    <MotionLink className='flex justify-center items-center w-[50%] lg:w-auto h-[50%] bg-center border-[1.5px] border-yellow rounded-full cursor-pointer text-white bg-transparent text-[20px] font-bold'
        whileHover={{
            height: '70%',
            backgroundImage : `url(${img})`,
            backgroundSize : 'cover',
        }}
        transition={{
            duration: 0.4,
            ease : 'easeInOut'
        }}
        to={`/shop/category/${path}/page/1`}
        onClick={() => setHovered(false)}
    >
        {title}
    </MotionLink>
  )
};
export default CategoryBlock;