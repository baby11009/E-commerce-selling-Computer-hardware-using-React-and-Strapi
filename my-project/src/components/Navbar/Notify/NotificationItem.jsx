import { CloseIcon } from "../../../assets/Icon";
import request from "../../../utils/request";
import { getToken } from "../../../apiService/Login/tokenHelper";

const NotificationItem = ({fetchUserNotis,notiId, message, type }) => {
  const imgLink =
    "https://th.bing.com/th/id/OIP.JfQafINOcxnGHn5D34lKFQHaHa?rs=1&pid=ImgDetMain";

    const handleDeleteNoti = () => {
      try {
        request.delete(
          `notificantions/${notiId}`,
          {
            headers: {
              Authorization : `${import.meta.env.VITE_BEARER} ${getToken(import.meta.env.VITE_AUTH_TOKEN)}`
            }
          }
        ).then(() =>{
          fetchUserNotis()
        })
      }catch (e) {
        throw new Error
      }
    }

  return (
    <div
      className={`min-h-[80px] py-[5px] px-[10px]  mr-[7px] flex items-center bg-transparent border-[2px] ${
        type === "Success" ? "border-Success" : ""
      } 
    hover:shadow-[0_0_10px_0] ${
      type === "Success" ? "hover:shadow-Success" : ""
    } rounded-[10px] cursor-pointer`}
    >
      <div
        className="w-[50px] h-[50px] rounded-[100%] mr-[15px] bg-center bg-contain"
        style={{ backgroundImage: `url(${imgLink})` }}
      />
      <div className="flex-1 mr-[5px]">
        <div className="text-[18px] font-bold  flex justify-between">
          {type} notification
          <div onClick={handleDeleteNoti}>
            <CloseIcon size={"20px"} />
          </div>
        </div>
        <span className="text-[14px] leading-[14px line-clamp-2 mr-[15px]">
          {message}
        </span>
      </div>
    </div>
  );
};
export default NotificationItem;
