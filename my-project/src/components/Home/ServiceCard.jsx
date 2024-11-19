import { motion } from "framer-motion";

const ServiceCard = ({service,type,quote}) => {


  return (
    <motion.div className="bg-[rgba(0,0,0,0.2)] rounded-[15px] 
      flex flex-col items-center text-white px-[10px] pt-[20px] pb-[40px] cursor-pointer border-redHover"
      whileHover={{ scale : 1.1 , borderWidth : '3px'}}
      transition={{ duration: 0.2 }}
      style={{
        perspective: 1000
      }}
    >
      <div className="mb-[5px] xl:mb-[10px]">
        {service}
      </div>
      <div className="text-[20px] font-semibold text-yellow mb-[10px] xl:mb-[15px]">
        {type}
      </div>
      <div className=" font-medium">
        {quote}
      </div>
    </motion.div>
  )
};
export default ServiceCard;