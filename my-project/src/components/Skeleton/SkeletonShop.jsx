import SkeletonItemCard from "./SkeletonItemCard";

const SkeletonShop = () => {
  return (
    <div className="mt-[15px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
        <SkeletonItemCard noUse={true} />
    </div>
  );
};
export default SkeletonShop;
