import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

interface ActivityIndicatorProps {
  userId: string | null;
}

export function ActivityIndicator({ userId }: ActivityIndicatorProps) {
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

  // Format seconds into human-readable time
  const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 60) {
      return `${totalSeconds} second${totalSeconds !== 1 ? "s" : ""}`;
    }
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    if (remainingSeconds === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[oklch(0.52_0.14_55/5%)] border border-[oklch(0.52_0.14_55/15%)]">
      <div className="w-8 h-8 rounded-full bg-[oklch(0.52_0.14_55/12%)] flex items-center justify-center">
        <Eye className="w-4 h-4 text-[oklch(0.52_0.14_55)]" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">Viewing profile for</p>
        <p className="text-sm font-medium text-foreground">
          {formatTime(seconds)}
        </p>
      </div>
      {/* Progress bar animation */}
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-4 rounded-full bg-[oklch(0.52_0.14_55/30%)] animate-pulse-subtle"
            style={{
              animationDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
