import { useState } from "react";

const SquareStar = ({
  setCurrStar,
  value,
  currStar,
  setStarClicked,
  starClicked,
}) => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 -0.5 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="si-glyph si-glyph-square-star cursor-pointer"
      fill="#ffffff"
      onClick={() => {
        setStarClicked(value);
      }}
      onMouseEnter={() => {
        if(starClicked === value) {
            return null
        }

        setStarClicked(0)
        setCurrStar(value);
      }}
      onMouseLeave={() => {
        if (starClicked === value) {
          return null;
        }
        setCurrStar(0);
      }}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>Star</title> <defs> </defs>{" "}
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          {" "}
          <path
            d="M15.628,0.021 L2.352,0.021 C1.618,0.021 1.022,0.616 1.022,1.352 L1.022,14.627 C1.022,15.361 1.618,15.958 2.352,15.958 L15.628,15.958 C16.362,15.958 16.958,15.361 16.958,14.627 L16.958,1.352 C16.958,0.615 16.362,0.021 15.628,0.021 L15.628,0.021 Z M12.398,13.505 L9.013,11.622 L5.628,13.505 L6.274,9.518 L3.537,6.694 L7.32,6.114 L9.013,2.486 L10.705,6.114 L14.489,6.694 L11.751,9.518 L12.398,13.505 L12.398,13.505 Z"
            fill={`${currStar >= value ? "#FFF34A" : "#ffffff"} `}
            className="si-glyph-fill"
          >
            {" "}
          </path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
export default SquareStar;
