
const Badge = ({quantity}) => {

  return (
    <div className={`absolute bg-red-500 w-[20px] h-[15px] rounded-full ${quantity ? 'flex' : 'hidden'} items-center justify-center top-[3px] right-[-3px]`}>{quantity}</div>
  )
};
export default Badge;