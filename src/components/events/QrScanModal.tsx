import { Sheet } from "react-modal-sheet";
import { useMediaQuery } from "react-responsive";
import { CircleX } from "../../assets/icons";
import { Scanner } from "@yudiel/react-qr-scanner";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

interface QrScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QrScanModal: React.FC<QrScanModalProps> = ({ isOpen, onClose }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // for <md screens
  //   const { user: currentUser } = useSelector((state: RootState) => state.auth);
  //   const { bookings } = useSelector((state: RootState) => state.bookings);

  const isSmallest = useMediaQuery({ maxWidth: 475 });
  const isSmaller = useMediaQuery({ minWidth: 476, maxWidth: 767 });

  return isSmallScreen ? (
    // bottom sheet for small screens
    <div className={`fixed inset-0 z-20 ${isOpen ? "visible" : "hidden"}`}>
      {isOpen && (
        <div className="absolute inset-0 backdrop-blur-xs bg-black/30 z-10" />
      )}
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={isSmallest ? [0.6, 0] : isSmaller ? [-100, 0] : [0]}
        initialSnap={0}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content className="p-2 space-y-4 flex flex-col justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-center mb-4 text-secondary-text-500">
                Ticket QR code
              </h2>
              <hr className="border-t border-gray-300 " />
              <Scanner
                onScan={(result) => console.log(result)}
                paused={!isOpen}
                classNames={{ video: "w-5 h-5" }}
              />
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </div>
  ) : (
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
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-center mb-4 text-secondary-text-500">
            Ticket QR code
          </h2>
          <hr className="border-t border-gray-300 " />
          <Scanner onScan={(result) => console.log(result)} paused={!isOpen} />
        </div>
        <CircleX
          className="w-8 h-8 absolute right-2 top-2 text-accent-500 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default QrScanModal;
