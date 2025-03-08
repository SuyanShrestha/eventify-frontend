import { CircleX } from "lucide-react";
import { Sheet } from "react-modal-sheet";
import { useMediaQuery } from "react-responsive";

interface ModalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
  showCrossIcon?: boolean;
}

const ModalSheet: React.FC<ModalSheetProps> = ({
  isOpen,
  onClose,
  children,
  snapPoints = [0.4, 0],
  showCrossIcon = true,
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return isSmallScreen ? (
    // Bottom sheet for small screens
    <div className={`fixed inset-0 z-20 ${isOpen ? "visible" : "hidden"}`}>
      {isOpen && (
        <div className="absolute inset-0 backdrop-blur-xs bg-black/30 z-10" />
      )}
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={snapPoints}
        initialSnap={0}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content className="p-2 space-y-4 flex flex-col justify-between items-center">
            {children}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </div>
  ) : (
    // Modal for larger screens
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500/30 z-25 ${
        isOpen ? "visible" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-xs z-10" />

      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-20 flex flex-col items-center gap-8"
        style={{ boxShadow: "0 0 4px rgba(85, 60, 154, 0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {showCrossIcon && (
          <CircleX
            className="w-8 h-8 absolute right-2 top-2 text-accent-500 cursor-pointer"
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default ModalSheet;
