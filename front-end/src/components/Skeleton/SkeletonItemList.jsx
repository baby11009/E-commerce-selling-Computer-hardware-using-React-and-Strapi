
import SkeletonItemCard from "./SkeletonItemCard";

const SkeletonItemList = ({slug}) => {
  return (
    <div className="w-full flex gap-4 overflow-hidden">
        <SkeletonItemCard key={`${slug}-1`} />
        <SkeletonItemCard key={`${slug}-2`} />
        <SkeletonItemCard key={`${slug}-3`} />
        <SkeletonItemCard key={`${slug}-4`} />
        <SkeletonItemCard key={`${slug}-5`} />
    </div>
  )
};
export default SkeletonItemList;