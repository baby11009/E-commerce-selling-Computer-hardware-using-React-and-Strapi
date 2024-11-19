import { motion } from "framer-motion";
import { CloseIcon, SlashBellIcon } from "../../../assets/Icon";
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";
import NotificationsList from "./NotificationsList";

const Notify = ({ setOpened,fetchUserNotis, userNotifications }) => {

  return (
    <>
      <h3
        className={`text-[18px] md:text-[24px] font-bold flex items-center justify-between ${
          !userNotifications?.data.length ? "mb-[30px]" : "mb-[20px]"
        }`}
      >
        Notifications
        <div className="cursor-pointer" onClick={() => setOpened("")}>
          <CloseIcon size={"24px"} />
        </div>
      </h3>
      <div className="flex flex-col items-center justify-center">
        {userNotifications?.data.length ? (
          <NotificationsList data={userNotifications?.data} fetchUserNotis={fetchUserNotis}  />
        ) : (
          <>
            <SlashBellIcon />
            <span className="text-[14px] text-[#cccccc] md:text-[20px] mt-[20px]">
              You don't have any notification
            </span>
          </>
        )}
      </div>
    </>
  );
};
export default Notify;

// <div className="w-full max-h-[230px] overflow-y-auto customScroll flex flex-col gap-[10px] px-[3px] py-[7px]">
//   <div
//     className="min-h-[80px] py-[5px] px-[10px]  mr-[7px] flex items-center bg-transparent border-[2px] border-succ hover:shadow-[0_0_10px_0] hover:shadow-succ rounded-[10px] cursor-pointer"
//   >
//     <div
//       className="w-[50px] h-[50px] rounded-[100%] mr-[15px] bg-center bg-contain"
//       style={{ backgroundImage: `url(${imgLink})` }}
//     />
//     <div className="flex-1 mr-[5px]">
//       <div className="text-[18px] font-bold leading-[18px  flex justify-between">
//         Thông báo thành công
//         <CloseIcon size={"20px"} />
//       </div>
//       <span className="text-[14px] leading-[14px line-clamp-2 mr-[15px]">
//         ththông thông hnn của thông báo
//       </span>
//     </div>
//   </div>
//   <motion.div
//     className="min-h-[80px] py-[5px] px-[10px] mr-[7px] flex items-center bg-transparent border-[2px] border-err  rounded-[10px] cursor-pointer"
//     whileHover={{
//       boxShadow: "0px 0px 12px 0px rgba(255,0,0,1)",
//     }}
//   >
//     <div
//       className="w-[50px] h-[50px] rounded-[100%] mr-[15px] bg-center bg-contain"
//       style={{ backgroundImage: `url(${imgLink})` }}
//     />
//     <div className="flex-1 mr-[5px]">
//       <div className="text-[18px] font-bold leading-[18px] flex justify-between">
//         Thông báo thất bại
//         <CloseIcon size={"20px"} />
//       </div>
//       <span className="text-[14px] leading-[14px line-clamp-2 mr-[15px]">
//         thông hnn của thông báo thông hnn của thông báo thông hnn của
//         thông báo thông hnn của thông báo thông hnn của thông báo
//         thông hnn của thông báo thông hnn của thông báo thông hnn của
//         thông báo
//       </span>
//     </div>
//   </motion.div>
//   <motion.div
//     className="min-h-[80px] py-[5px] px-[10px] mr-[7px] flex items-center bg-transparent border-[2px] border-warn  rounded-[10px] cursor-pointer"
//     whileHover={{
//       boxShadow: "0px 0px 12px 0px rgba(255, 238, 0,1)",
//     }}
//   >
//     <div
//       className="w-[50px] h-[50px] rounded-[100%] mr-[15px] bg-center bg-contain"
//       style={{ backgroundImage: `url(${imgLink})` }}
//     />
//     <div className="flex-1 mr-[5px]">
//       <div className="text-[18px] font-bold leading-[18px] flex justify-between">
//         Thông báo cảnh báo
//         <CloseIcon size={"20px"} />
//       </div>
//       <span className="text-[14px] leading-[14px line-clamp-2 mr-[15px]">
//         thông hnn của thông báo thông hnn của thông báo thông hnn của
//         thông báo thông hnn của thông báo thông hnn của thông báo
//         thông hnn của thông báo thông hnn của thông báo thông hnn của
//         thông báo
//       </span>
//     </div>
//   </motion.div>
//   <motion.div
//     className="min-h-[80px] py-[5px] px-[10px] mr-[7px] flex items-center bg-transparent border-[2px] border-myth rounded-[10px] cursor-pointer"
//     whileHover={{
//       boxShadow: "0px 0px 12px 0px rgba(0, 25, 255,1)",
//     }}
//   >
//     <div
//       className="w-[50px] h-[50px] rounded-[100%] mr-[15px] bg-center bg-contain"
//       style={{ backgroundImage: `url(${imgLink})` }}
//     />
//     <div className="flex-1 mr-[5px]">
//       <div className="text-[18px] font-bold leading-[18px] flex justify-between">
//         Thông báo khác
//         <CloseIcon size={"20px"} />
//       </div>
//       <span className="text-[14px] leading-[14px line-clamp-2 mr-[15px]">
//         thông hnn của thông báo thông hnn của thông báo thông hnn của
//         thông báo thông hnn của thông báo thông hnn của thông báo
//         thông hnn của thông báo thông hnn của thông báo thông hnn của
//         thông báo
//       </span>
//     </div>
//   </motion.div>
// </div>
