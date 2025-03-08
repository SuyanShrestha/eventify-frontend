import { useMediaQuery } from "react-responsive";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ModalSheet } from "../ui";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

interface QrScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QrScanModal: React.FC<QrScanModalProps> = ({ isOpen, onClose }) => {
  //   const { user: currentUser } = useSelector((state: RootState) => state.auth);
  //   const { bookings } = useSelector((state: RootState) => state.bookings);

  const isSmallest = useMediaQuery({ maxWidth: 475 });
  const isSmaller = useMediaQuery({ minWidth: 476, maxWidth: 767 });

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={isSmallest ? [0.6, 0] : isSmaller ? [-100, 0] : [0]}
    >
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
    </ModalSheet>
  );
};

export default QrScanModal;
