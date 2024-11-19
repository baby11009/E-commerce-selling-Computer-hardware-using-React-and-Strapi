
import { PC3, Laptop3, GamingChair3, GamingGear3, Figure3} from "../../assets/Images";
import { Link } from "react-router-dom";


const Hero = ({windowSize}) => {

  return (
    <div className="w-full h-[80vh] flex flex-col sm:flex-row-reverse gap-[15px] items-center lg:block  sm:p-0">
        <div className="w-full h-[75%] lg:h-[65%] relative flex flex-col sm:flex-row justify-evenly gap-[10px] basis-[60%] sm:basis-[45%]">
            <div className={`${windowSize > 1023 && 'triangle1'} basis-[35%]  md:basis-[20%]  bg-no-repeat lLaptop:bg-[length:60%_auto] lg:bg-contain bg-[length:100%_auto] sm:bg-[length:auto_100%] bg-center lg:bg-left-bottom rounded-full lg:rounded-none cursor-pointer`} style={{backgroundImage : `url(${GamingGear3})`}}></div>
            <div className={`${windowSize > 1023 && 'quadrilateral1'} basis-[35%]  md:basis-[20%]  bg-no-repeat lLaptop:bg-[length:60%_auto] lg:bg-contain bg-[length:100%_auto] sm:bg-[length:auto_100%] bg-center lg:bg-left-top rounded-full lg:rounded-none cursor-pointer`} style={{backgroundImage : `url(${Laptop3})`}}></div>
            <div className={`${windowSize > 1023 && 'triangle2'} basis-[35%] md:basis-[20%]  bg-no-repeat lLaptop:bg-[length:60%_auto] lg:bg-contain bg-[length:100%_auto] sm:bg-[length:auto_100%] bg-center rounded-full lg:rounded-none cursor-pointer`} style={{backgroundImage : `url(${PC3})`}}></div>
            <div className={`${windowSize > 1023 && 'quadrilateral2'}  md:basis-[20%]  bg-no-repeat lLaptop:bg-[length:60%_auto] lg:bg-contain hidden sm:block sm:bg-[length:auto_100%] lg:bg-[120%]  bg-center rounded-full lg:rounded-none cursor-pointer`} style={{backgroundImage : `url(${GamingChair3})`}}></div>
            <div className={`${windowSize > 1023 && 'triangle3'}  md:basis-[20%]  bg-no-repeat lLaptop:bg-[length:60%_auto] lg:bg-[length:60%] hidden lg:block sm:bg-[length:auto_100%] lg:bg-[110%_15%] bg-center rounded-full lg:rounded-none cursor-pointer`} style={{backgroundImage : `url(${Figure3})`}}></div>
        </div>
        <div className="h-[25%] text-[15px] lg:text-[18px] mt-[15px] flex flex-col lg:items-center text-white sm:basis-[55%]">
            <div className="font-bold text-[30px] leading-[34px] lLaptop:text-[48px] lLaptop:leading-[48px] lg:text-[40px] lg:leading-[40px] sm:text-[36px] sm:leading-[40px] lg:block flex flex-col">
              <span>
                BUILD YOUR&nbsp;
              </span>
              <span className="text-yellow">
                OWN GAMING SETUP
              </span>
            </div>
            <span className="mt-[5px] ">
              The Ultimate Destination for Gaming Lovers
            </span>
            <span>Explore, Create, and Enjoy the Best Quality Products and Services</span>
            <Link to='/shop/page/1' className="mx-auto mt-[25px] lg:mt-[15px] px-[25px] py-[10px] rounded-full border-[1px] border-yellow  text-white text-[24px]" type="button">Shop Now</Link>
        </div>
    </div>

  )
};
export default Hero;