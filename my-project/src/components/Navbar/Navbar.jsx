import { useState } from "react";

import LeftNavbar from "./LeftNavbar/LeftNavbar";
import RightNavbar from "./RightNavbar/RightNavbar";
import SDNavbar from "./SmallDeviceNavbar/SDNavbar";
import CategoryMenu from "./CategoryBlock/CategoryMenu";
import SDMenu from "./SmallDeviceMenu/SDMenu";

import { useAuthContext } from "../../apiService/Login/context/AuthContext";

const Navbar = () => {
  const [isChosed, setIsChosed] = useState("Home");
  const [isClicked, setIsClicked] = useState(false);
  const [opened, setOpened] = useState("");
  const [hovered, setHovered] = useState(false);


  const {
    windowSize,
    zIndex,
    setZIndex,
    user,
    handleSignout,
    cart,
    userNotifications,
    fetchUserNotis,
  } = useAuthContext();

  return (
    <div className="box-container flex justify-between items-center h-[15vh]  md:px-[6%] lg:px-[9%] text-white relative gap-[10px] sm:gap-0 sm:pt-[1.5%]"
      style={{
        zIndex : zIndex
      }}
    >
      {/* Navbar Left */}
      <LeftNavbar hovered={hovered} setHovered={setHovered} />

      {/* Navbar Right */}
      <RightNavbar
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        windowSize={windowSize}
        opened={opened}
        setOpened={setOpened}
        cart={cart}
        user={user}
        handleSignout={handleSignout}
        userNotifications={userNotifications}
        fetchUserNotis={fetchUserNotis}
      />

      {/* Small Device Navbar */}
      <SDNavbar user={user} setOpened={setOpened} />

      {/* Small Device Menu */}
      <SDMenu
        opened={opened}
        setOpened={setOpened}
        isChosed={isChosed}
        setIsChosed={setIsChosed}
        setHovered={setHovered}
      />

      {/* Category Menu */}
      <CategoryMenu
        windowSize={windowSize}
        hovered={hovered}
        setHovered={setHovered}
      />
    </div>
  );
};
export default Navbar;
