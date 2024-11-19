import { motion, AnimatePresence } from "framer-motion";
import CategoryBlock from "./CategoryBlock";
import {
  PC,
  Laptop,
  GamingGear,
  Figure,
  GamingChair,
  CaseImg
} from "../../../assets/Images";

const catList = [
  {
    id: 1,
    title: "PC",
    img: PC,
    path : 'pc'
  },
  {
    id: 2,
    title: "Laptop",
    img: Laptop,
    path : 'laptop'

  },
  {
    id: 3,
    title: "Gaming Gear",
    img: GamingGear,
    path : 'gear'

  },
  {
    id: 4,
    title: "Case",
    img: CaseImg,
    path : 'case'
  },
  {
    id: 5,
    title: "Gaming Chair",
    img: GamingChair,
    path : 'gaming-chair'

  },
];

const catListVarsLarge = {
  hidden: {
    y: "115%",
    opacity: 0,
    pointerEvents : 'none'
  },
  visible: {
    y: "100%",
    opacity: 1,
    pointerEvents : 'auto',
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeIn",
    },
  },
  exit: {
    y: "115%",
    opacity: 0,
    pointerEvents : 'none',
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const catListVarsSmall = {
  hidden: {
    left: "100vw",
    opacity: 0,
  },
  visible: {
    left: "0",
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.45,
      ease: "easeIn",
    },
  },
  exit: {
    left: "100vw",
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const CategoryMenu = ({  windowSize, hovered, setHovered}) => {

  return (
    <AnimatePresence>
      {hovered && (
        <motion.div
          className="absolute w-full h-[100%] bottom-0 left-0  px-[10%] py-0 gradient2"
          key="navList"
          variants={catListVarsLarge}
          initial="hidden"
          animate="visible"
          exit="exit"
          onHoverStart={() => {
            setHovered(true)
          }}
          onHoverEnd={() => {
            setHovered(false)
          }}
        >
          <div className="grid items-center grid-rows-1 grid-flow-col gap-4 h-full w-auto ">
            {catList.map((cart) => (
              <CategoryBlock
                key={cart.id}
                title={cart.title}
                img={cart.img}
                path={cart.path}
                setHovered={setHovered}
                isMobile={windowSize < 1024 ? "width" : "height"}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CategoryMenu;
