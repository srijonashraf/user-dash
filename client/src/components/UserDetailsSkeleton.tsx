import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const UserDetailsSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="mt-6 h-10 w-32" />
      </CardContent>
    </Card>
  );
};
