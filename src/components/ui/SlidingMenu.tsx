import React from "react";
import { cn } from "../../lib/utils";

interface SlidingMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position?: "left" | "right";
  customClass?: string;
  children: React.ReactNode;
}

export const SlidingMenu: React.FC<SlidingMenuProps> = ({
  isOpen,
  setIsOpen,
  position = "right",
  customClass = "",
  children,
}) => {
  const isLeft = position === "left";

  return (
    <div
      className={cn(
        `fixed inset-0 md:hidden flex ${
          isLeft ? "items-center justify-start" : "items-center justify-end"
        } bg-gray-500/30 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`
      )}
      onClick={() => setIsOpen(false)}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      {/* sliding menu */}
      <div
        className={cn(
          `relative bg-white w-64 h-full shadow-lg z-20 transform transition-transform duration-300 ease-in-out bg-background-image ${
            isOpen
              ? "translate-x-0"
              : isLeft
              ? "-translate-x-full" // Slide out to the left
              : "translate-x-full" // Slide out to the right
          }`,
          customClass
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
