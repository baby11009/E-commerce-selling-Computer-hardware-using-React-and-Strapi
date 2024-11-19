
import NotificationItem from "./NotificationItem";

const NotificationsList = ({data,fetchUserNotis}) => {

    
  return (
    <div className="w-full max-h-[230px] overflow-y-auto customScroll flex flex-col gap-[10px] px-[3px] py-[7px]">
        {
            data?.map(item => (
                <NotificationItem fetchUserNotis={fetchUserNotis} notiId={item?.id}   message={item?.attributes?.Message} type={item?.attributes.notification_type.data.attributes.Title}  key={item?.id}/>
            ))
        }
    </div>
  )
};
export default NotificationsList;