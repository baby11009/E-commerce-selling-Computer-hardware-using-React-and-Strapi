import { Link } from "react-router-dom";
import { Arrow } from "../../../assets/Icon";

const PageControl = ({ link, num, totalPage }) => {
  return (
    <div className="w-full flex gap-[20px] justify-end items-center">
      {num === "1" ? (
        <div className="cursor-pointer">
          <Arrow status={true} />
        </div>
      ) : (
        <Link className="cursor-pointer" to={`${link}/${Number(num) - 1}`}>
          <Arrow status={true} />
        </Link>
      )}
      <div className="border-[2px] border-black w-[30px] rounded-[3px] py-[3px] text-center">
        {num}
      </div>
      {Number(num) === totalPage ? (
        <div className="cursor-pointer rotate-180">
          <Arrow status={true} />
        </div>
      ) : (
        <Link
          className="cursor-pointer rotate-180"
          to={`${link}/${Number(num) + 1}`}
        >
          <Arrow status={true} />
        </Link>
      )}
    </div>
  );
};
export default PageControl;
