import { Rating } from "../../../components";
import { useCallback, useEffect, useState, useRef } from "react";
import { SettingDotsIcon, TrashBinIcon, PenIcon } from "../../../assets/Icon";
import request from "../../../utils/request";
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";
import { getToken } from "../../../apiService/Login/tokenHelper";
const CommentCard = ({ data, userId, refetchPd, refetchCmt }) => {

  const { toast } = useAuthContext();

  const [postedDate, setPostedDate] = useState("dd-mm-yyyy");

  const [comment, setComment] = useState(data?.attributes.cmtText);

  const [isClicked, setIsClicked] = useState(false);

  const [isEdited, setIsEdited] = useState(false);

  const settingsRef = useRef(null);

  const formatDate = useCallback((date) => {
    const parts = date.split("T");

    const datePart = parts[0].split("-");
    const year = datePart[0];
    const month = datePart[1];
    const day = datePart[2];

    return `${day}-${month}-${year}`;
  }, []);

  useEffect(() => {
    setPostedDate(formatDate(data?.attributes.createdAt));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài dropdown hay không
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
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

  const handleDelete = () => {
    setIsClicked(false);
    const dltCmt = async () => {
      await request.delete(`comments/${data?.id}`, {
        headers: {
          Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
            import.meta.env.VITE_AUTH_TOKEN
          )}`,
        },
      });
    };
    toast.promise(dltCmt(), {
      loading: "Deleting...",
      success: () => {
        refetchPd();
        refetchCmt();
        return <div>Success in deleting your comment</div>;
      },
      error: (err) => {
        console.error(err);
        return <div>Failed in deleting your comment</div>;
      },
    });
  };

  const handleEdit = () => {
    setIsEdited(false);
    const editCmt = async () => {
      await request.put(
        `comments/${data?.id}`,
        {
          "data" : {
            "cmtText" : comment
          }
        },
        {
          headers: {
            Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
              import.meta.env.VITE_AUTH_TOKEN
            )}`,
            "Content-Type": "application/json",
          },
        }
      );
    };
    toast.promise(editCmt(), {
      loading: "Updating...",
      success: () => {
        refetchPd();
        refetchCmt();
        return <div>Success in updating your comment</div>;
      },
      error: (err) => {
        console.error(err);
        return <div>Failed in updating your comment</div>;
      },
    });
  };

  return (
    <div>
      <div className="flex justify-start gap-[10px]">
        <div
          className=" w-[50px] h-[50px] rounded-[50%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_BE_IMG}${
              data?.attributes.user.data.attributes.avatar_url.data.attributes
                .formats.thumbnail.url
            })`,
          }}
        />
        <div className="flex flex-col flex-1 ">
          <div className="flex justify-between items-center flex-1">
            <div className="flex items-center justify-center gap-[5px]">
              <div className="text-[22px]  leading-[22px]">ngocfuoc</div>
              <div>·</div>
              <div className="text-[16px] text-[#dfdede]">
                Posted on {postedDate}
              </div>
            </div>
            {data?.attributes.user.data.id === userId && (
              <div className="relative">
                <div
                  className="w-[30px] h-[30px] rounded-[50%] hover:bg-[rgba(0,0,0,0.2)] 
                  flex justify-center items-center cursor-pointer"
                  onClick={(e) => {
                    setIsClicked((prev) => !prev);
                    e.stopPropagation();
                  }}
                >
                  <SettingDotsIcon />
                </div>
                {isClicked && (
                  <ul
                    className="absolute top-[80%] right-[50%] border-[2px] rounded-[4px] text-[18px] font-bold p-[5px]"
                    ref={settingsRef}
                  >
                    <li
                      className="flex gap-[8px] items-center mb-[5px] px-[10px] rounded-[3px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
                      onClick={() => {
                        setIsEdited(prev => !prev);
                        setIsClicked(false);
                      }}
                    >
                      <PenIcon size={"20px"} />
                      Edit
                    </li>
                    <li
                      className="flex gap-[5px] items-center cursor-pointer px-[10px] rounded-[3px] hover:bg-[rgba(0,0,0,0.2)]"
                      onClick={handleDelete}
                    >
                      <TrashBinIcon size={"24px"} />
                      Delete
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="w-fit mb-[5px]">
            <Rating rating={data?.attributes?.rate}/>
          </div>
          {!isEdited ? (
            <div>{comment}</div>
          ) : (
            <div>
              <input
                type="text"
                className="border-b-[2px] bg-transparent outline-none w-[90%] pb-[5px]"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                autoFocus
                spellCheck={false}
              />
              <div className="w-[90%] flex items-center justify-end gap-[10px] mt-[10px] font-bold">
                <button
                  className="border-[2px] px-[10px] py-[2px] w-[50%] md:w-[15%] rounded-[3px] hover:text-redHover hover:border-redHover"
                  onClick={() => {
                    setIsEdited(false);
                    setComment(data?.attributes.cmtText);
                  }}
                >
                  Cancel
                </button>
                <button className="border-[2px] px-[10px] py-[2px]  w-[50%] md:w-[15%] rounded-[3px] hover:text-Success hover:border-Success"
                  onClick={handleEdit}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="my-[20px]" />
    </div>
  );
};
export default CommentCard;
