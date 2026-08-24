import type { FC } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  bgColor = "bg-transparent",
  textColor = "text-primary-text-500",
  className,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium flex items-center justify-center transition hover:opacity-100",
        " border border-gray-400 rounded-lg cursor-pointer",
        "hover:shadow-md ",
        bgColor,
        textColor,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
