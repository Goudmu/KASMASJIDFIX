import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTableComponent = ({ count }: any) => {
  return (
    <div className=" flex flex-col gap-3 py-2 px-3 bg-white rounded-lg">
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <div
            className={`flex rounded gap-5 ${index == 0 ? "border-b" : ""}`}
            key={index}
          >
            {count &&
              count.map((data: any, index: number) => {
                return (
                  <div key={index} className={`${data.cellWidth} mb-4`}>
                    <Skeleton className="h-7 w-full" />
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonTableComponent;
