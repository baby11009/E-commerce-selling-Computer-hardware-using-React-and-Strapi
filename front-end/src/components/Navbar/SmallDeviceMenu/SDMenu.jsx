import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";
import { CloseIcon } from "../../../assets/Icon";
import { useAuthContext} from "../../../apiService/Login/context/AuthContext";
import { useLayoutEffect,useState  } from "react";

const navLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Shop",
    href: "/shop/page/1",
  },
  {
    id: 3,
    title: "Cart",
    href: "/cart",
  },
  {
    id: 4,
    title: "Sign in",
    href: "/signin",
  },
  {
    id: 5,
    title: "Sign up",
    href: "/signup",
  },
  {
    id: 6,
    title: "Settings",
    href: "/account-settings",
  },
  {
    id: 7,
    title: "Sign out",
  },
];

const containerVars = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  animate: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const SDMenu = ({ opened, setOpened, isChosed, setIsChosed }) => {

  const {
    user
  } = useAuthContext();

  const [links,setLinks] = useState()
  
  useLayoutEffect(() => {
    if(user) {
      setLinks(navLinks.filter(item => {
        return (item.title !== 'Sign in' && item.title !== 'Sign up')
      }))
    } else {
      setLinks(navLinks.filter(item => {
        return (item.title !== 'Settings' && item.title !== 'Sign out')
      }))
    }
  },[user])

  return (
    <AnimatePresence>
      {opened === "menu" && (
        <motion.div
          className="fixed z-[20] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm py-[20px] pl-[25px] pr-[10px] sm:p-[20px] top-0 right-0 w-[100vw] sm:min-w-[400px] sm:w-[25%] h-full "
          onClick={(e) => e.stopPropagation()}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center justify-between mb-[100px]">
            <h3 className="text-[40px] font-bold cursor-default">
              <span className=" text-yellow">HT&nbsp;</span>
              Shop
            </h3>
            <motion.li
              className="cursor-pointer w-[36px] h-[36px] rounded-full flex items-center justify-center"
              whileHover={{
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
              onClick={() => setOpened("")}
            >
              <CloseIcon noHover={true} />
            </motion.li>
          </div>
          <div className="flex basis-[40%] w-full gap-[20px] flex-col justify-center">
            {links?.map((navLink) => (
              <motion.div
                className="overflow-hidden flex cursor-pointer items-center justify-center"
                variants={containerVars}
                key={navLink.id}
                onClick={() => {
                  setIsChosed(navLink.title)
                  setOpened('')
                }}

              >
                <NavLink
                  title={navLink.title}
                  isChosed={isChosed}
                  href={navLink.href}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SDMenu;
