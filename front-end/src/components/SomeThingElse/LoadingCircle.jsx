import {motion, useAnimation} from 'framer-motion'
import { useEffect } from 'react';

const LoadingCircle = () => {

    const controls = useAnimation()

    useEffect(() => {
        controls.start({
            rotate: 360,
            transition: {
            duration: .8,
            ease: 'linear',
            repeat: Infinity,
            },
        })
    },[])

    
  return (
    <motion.div 
        animate={controls}

        className="w-[30px] h-[30px] rounded-[50%] border-[3px] border-l-transparent border-t-transparent border-b-transparent border-r-white"/>
  )
};
export default LoadingCircle;