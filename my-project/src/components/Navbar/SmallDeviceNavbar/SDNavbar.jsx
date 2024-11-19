
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserIcon, MenuIcon } from "../../../assets/Icon";


const SDNavbar = ({
    user,
    setOpened
}) => {
  return (
    <div className="basis-[25%] lg:hidden flex items-center justify-evenly ">
      <motion.li
        className="cursor-pointer w-[36px] h-[36px] rounded-full flex items-center justify-center relative"
        whileHover={{
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        {user ? (
          <>
            <Link
              to="/account/settings"
              className="w-full h-full bg-cover bg-no-repeat bg-center rounded-full"
              style={{
                backgroundImage: `url("http://localhost:1337${user?.avatar_url?.formats.thumbnail.url}")`,
              }}
            />
          </>
        ) : (
          <Link to="/signin">
            <UserIcon />
          </Link>
        )}
      </motion.li>
      <motion.div
        className="cursor-pointer w-[36px] h-[36px] rounded-full flex items-center justify-center"
        whileHover={{
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
        onClick={(e) => {
          setOpened('menu')
          e.stopPropagation()
        }}
      >
        <MenuIcon hoveredObj={'menu'} size={'20px'}/>
      </motion.div>
    </div>
  );
};
export default SDNavbar;
