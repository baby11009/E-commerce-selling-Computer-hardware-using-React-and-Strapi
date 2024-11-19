import React from 'react';

const Rating = ({ rating, width }) => {
  let stars = [1, 2, 3, 4, 5];

  let ratingInt = Math.floor(rating);
  let ratingRemain = `${Number((rating % 1).toFixed(2)) * 100}%` || 0;

  return (
    <div className="flex justify-center items-center">
      {stars.map((star) => (
        <div
          key={star}
          className={`${
            width ? `w-[${width}] h-[${width}] ` : "w-[24px] h-[24px]"
          } flex relative`}
        >
          <span
            className={`${
              width ? `text-[${width}]` : "text-[24px]"
            } text-[#cccccc] h-[${width}]  flex items-center  absolute`}
          >
            &#9733;
          </span>
          <span
            className={`${
              width ? `text-[${width}]` : "text-[24px]"
            } text-yellow absolute h-[${width}] flex items-center overflow-hidden`}
            style={{
              width:
                rating - star >= 0
                  ? "100%"
                  : ratingInt + 1 === star
                  ? ratingRemain.toString()
                  : "0",
            }}
          >
            &#9733;
          </span>
        </div>
      ))}
    </div>
  );
};

export default Rating;
