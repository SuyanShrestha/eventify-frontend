import type { FC } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-sm font-semibold rounded-full",
        "flex justify-between items-center gap-2",
        "bg-gray-200 text-gray-800",
        className
      )}
    >
      {children}
    </span>
  );
};
