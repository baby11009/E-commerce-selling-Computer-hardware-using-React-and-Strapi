import { useState, useRef, useEffect } from "react";
import request from "../../../utils/request";
import { SendIcon, SquareStarIcon } from "../../../assets/Icon";
import { getToken } from "../../../apiService/Login/tokenHelper";

const starArray = [1, 2, 3, 4, 5];

const ReviewInput = ({ user, productId, toast, refetchPd, refetchCmt }) => {
  const commentRef = useRef(null);

  const textareaRef = useRef(null);

  const [height, setHeight] = useState("auto");

  const [isClick, setIsClick] = useState(false);

  const [starClicked, setStarClicked] = useState(0);

  const [text, setText] = useState("");

  const [currStar, setCurrStar] = useState(0);

  useEffect(() => {
    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [textareaRef.current?.scrollHeight]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài dropdown hay không
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setIsClick(false);
        setText("");
        setHeight("auto");
        setStarClicked(0);
        setCurrStar(0);
      }
    };

    // Thêm lắng nghe sự kiện click khi component mount
    document.addEventListener("click", handleClickOutside);

    // Loại bỏ lắng nghe khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOnChange = (e) => {
    setHeight("auto");
    setHeight(`${e.target.scrollHeight}px`);
    setText(e.target.value);
  };

  const handlePost = () => {
    if (text === "") {
      toast.error(() => (
        <div className="text-center">
          You haven't written anything in the comments box
        </div>
      ));
      return null;
    }
    if (currStar === 0) {
      toast.error(() => (
        <div className="text-center">You haven't selected a rating score</div>
      ));
      return null;
    }

    const postCmt = async () => {
      await request
        .post(
          "comments",
          {
            data: {
              user: user?.id,
              cmtText: text,
              product: productId,
              rate: starClicked,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
                import.meta.env.VITE_AUTH_TOKEN
              )}`,
            },
          }
        )
    };
    toast.promise(postCmt(), {
      loading: "Posting...",
      success: () => {
        refetchPd();
        refetchCmt();
        setText("");
        setHeight("auto");
        setStarClicked(0);
        setCurrStar(0);
        return <div>Success in posting</div>;
      },
      error: (err) => {
        console.error(err);
        return <div>Failed in posting</div>;
      },
    });
  };

  return (
    <div className="flex justify-center gap-[10px]">
      <div className="">
        <div
          className="w-[40px] h-[40px] rounded-[50%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_BE_IMG}${
              user?.avatar_url.formats.thumbnail.url
            })`,
          }}
        />
      </div>
      <div
        className={`bg-transparent border-[1px] rounded-[20px] ${
          isClick ? "max-h-[220px] py-[10px]" : "max-h-[40px] pt-[8px]"
        }
        leading-[24px] w-full md:w-[80%] xl:w-[70%] px-[25px] overflow-y-hidden`}
        ref={commentRef}
      >
        <textarea
          className="resize-none outline-none bg-transparent leading-[24px]
         overflow-y-auto w-full placeholder:text-white"
          style={{ height: height }}
          placeholder="Writing comments..."
          spellCheck={false}
          maxLength={200}
          onFocus={() => setIsClick(true)}
          onChange={handleOnChange}
          value={text}
          ref={textareaRef}
        />
        <div className="flex gap-[5px] mt-[10px] mb-[15px]">
          {starArray.map((item) => (
            <SquareStarIcon
              key={item}
              setCurrStar={setCurrStar}
              currStar={currStar}
              value={item}
              setStarClicked={setStarClicked}
              starClicked={starClicked}
            />
          ))}
        </div>
        <div className="flex-1 flex justify-between">
          <div>{text.length}/200</div>
          <button onClick={handlePost} title="Send">
            <SendIcon /> 
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReviewInput;
