import { Customer,Original, Refund, Reputation } from "../../assets/Icon";
import { ServiceCard } from "../../components";
import quotes from '../../assets/Quote'
import { motion } from "framer-motion";

const BrandQuality = () => {
  return (
    <div className="text-center my-[40px]">
        <div className="text-yellow text-[36px] font-bold leading-[36px] mb-[30px] lg:mb-[40px] text-center">Service Quality</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[30px] md:gap-[20px] text-[14px] leading-[18px] md:text-[16px] md:leading-[20px]">
            <ServiceCard service={<Reputation/>} type='Reputation' quote={quotes.Repu}/>
            <ServiceCard service={<Original/>} type='Authentic' quote={quotes.Authen}/>
            <ServiceCard service={<Customer/>} type='Customer Service' quote={quotes.Cs}/>
            <ServiceCard service={<Refund/>} type='Refund' quote={quotes.Refund}/>
        </div>
    </div>
  )
};
export default BrandQuality;