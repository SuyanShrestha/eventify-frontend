import type { FC } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
}

export const Badge: FC<BadgeProps> = ({ children }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-semibold rounded-full",
        "bg-gray-200 text-gray-800"
      )}
    >
      {children}
    </span>
  );
};
