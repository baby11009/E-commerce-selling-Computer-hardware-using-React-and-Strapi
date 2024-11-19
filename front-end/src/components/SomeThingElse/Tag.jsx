
const Tag = ({tag,color}) => {

  return (
    <div className={`w-fit flex z-[2] items-center justify-center rounded-[20px] text-center font-bold text-[17px] px-[15px] py-[1px]`}
        style={{
            backgroundColor: color
        }}
    >
        {tag}
    </div>
  )
};
export default Tag;