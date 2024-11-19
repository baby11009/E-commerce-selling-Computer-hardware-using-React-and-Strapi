
const FeedbackCard = ({feedback,itemIndex,currIndex}) => {

    console.log()

  return (
    <div className="h-full flex flex-col justify-center text-white ">
        <div className={`h-[70%] md:h-[60%] rounded-[20px]   relative px-[25px] border-[3.5px] ${currIndex === itemIndex ? ' border-[#ff006e] bg-[rgba(0,0,0,0.26)]' : 'bg-[rgba(0,0,0,0.2)]' }`}>
            <div className={`w-[100px] h-[100px] rounded-[50%] absolute left-[50%] translate-x-[-50%] translate-y-[-65%] border-[3.5px] ${currIndex === itemIndex && ' border-[#ff006e]'}`}
                style={{
                    backgroundImage : `url(http://localhost:1337${feedback?.attributes?.userImage?.data?.attributes?.formats?.thumbnail?.url})`
                }}
            />
            <div className="mt-[20%] mb-[8%] md:mt-[12%] text-[22px] font-semibold text-yellow ">
                {feedback.attributes.userName}
            </div>
            <div className={`${currIndex !== itemIndex && 'blur-[5px]'} text-[17px] leading-[24px]`}>
                {feedback.attributes.userFeedback}
            </div>
        </div>
    </div>
  )
};
export default FeedbackCard;