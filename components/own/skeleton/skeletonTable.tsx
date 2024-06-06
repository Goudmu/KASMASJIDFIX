import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTableComponent = ({ count }: any) => {
  return (
    <div className=" flex flex-col gap-3 py-2 px-3 bg-white rounded-lg">
      <div className="flex rounded gap-5 border-b">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="w-full mb-4 flex items-center justify-center"
          >
            <Skeleton className="h-7 w-full" />
          </div>
        ))}
      </div>
      <div className="flex rounded gap-5 border-b">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-full mb-4">
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
      <div className="flex rounded gap-5 border-b">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-full mb-4">
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
      <div className="flex rounded gap-5">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-full mb-4">
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTableComponent;
