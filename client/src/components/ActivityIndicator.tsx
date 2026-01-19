import { useEffect, useState } from "react";

interface ActivityIndicatorProps {
  userId: string | null;
}

export const ActivityIndicator = ({ userId }: ActivityIndicatorProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!userId) {
      setSeconds(0);
      return;
    }

    setSeconds(0);
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
      ⭐ Viewing profile for <span className="font-medium">{seconds}</span>{" "}
      seconds
    </div>
  );
};
