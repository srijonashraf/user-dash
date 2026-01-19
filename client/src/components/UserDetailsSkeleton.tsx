import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const UserDetailsSkeleton = () => {
  return (
    <Card className="glass-elevated overflow-hidden">
      {/* Header skeleton */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-start gap-4">
          <Skeleton className="w-16 h-16 rounded-2xl" />
          <div className="flex-1">
            <Skeleton className="h-6 w-40 mb-3" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <CardContent className="p-6 space-y-6">
        {/* Status toggle skeleton */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>

        {/* Info fields skeleton */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-4 w-full max-w-[200px]" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Activity skeleton */}
        <div className="pt-4 border-t border-border/50">
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};
