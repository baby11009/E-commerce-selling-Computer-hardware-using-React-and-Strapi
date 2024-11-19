import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ windowSize, isClicked, setIsClicked }) => {
  const [searchText, setSearchText] = useState("");

  const searchBar = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài dropdown hay không
      if (searchBar.current && !searchBar.current.contains(event.target)) {
        setIsClicked(false);
      }
    };
    // Thêm lắng nghe sự kiện click khi component mount
    document.addEventListener("click", handleClickOutside);

    // Loại bỏ lắng nghe khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleKeyDownEnter = (e) => {
    if (e.keyCode === 13) {
      if (searchText !== "") {
        navigate(`/shop/search/${searchText}/page/1`);
        setSearchText("");
        setIsClicked(false);
      }
    }
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
    if (searchText !== "") {
      navigate(`/shop/search/${searchText}/page/1`);
      setSearchText("");
      setIsClicked(false);
    }
  };

  return (
    <div
      className={`lg:w-[55%] w-[100%] h-[36px] ${
        (isClicked || windowSize < 1024) && " bg-white"
      } flex items-center justify-center lg:justify-end rounded-[20px] px-[10px] mr-[-25px] `}
      ref={searchBar}
    >
      {/* Search box */}
      {(isClicked || windowSize < 1024) && (
        <input
          spellCheck={false}
          autoFocus
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDownEnter}
          type="text"
          className="text-black h-[24px] mx-[10px] w-[85%] outline-none focus:ring-0 text-[16px]"
        />
      )}
      {windowSize > 1024 && (
        <motion.div
          className={`w-[36px] h-[36px] rounded-full  flex items-center justify-center ml-[5px] cursor-pointer ${
            isClicked && "hidden"
          }`}
          whileHover={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </motion.div>
      )}
      <div
        className={`w-[36px] h-[36px] rounded-full   flex items-center justify-center ml-[5px]  ${
          !isClicked && windowSize > 1023 && "hidden"
        }`}
        onClick={handleSearchClick}
      >
        <svg
          className="cursor-pointer "
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </div>
    </div>
  );
};
export default SearchBar;
