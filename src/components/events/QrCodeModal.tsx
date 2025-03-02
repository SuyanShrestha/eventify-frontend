import { Sheet } from "react-modal-sheet";
import { useMediaQuery } from "react-responsive";
import { QRCodeSVG } from "qrcode.react";
import { CircleX } from "../../assets/icons";
import { Event } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBookingId: string | null;
  eventItem: Event;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  selectedBookingId,
  eventItem,
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // for <md screens
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const qrCodeData = `booking_id:${selectedBookingId}|event_id:${eventItem.id}|user_id:${currentUser?.id}`;

  return isSmallScreen ? (
    // bottom sheet for small screens
    <div className={`fixed inset-0 z-20 ${isOpen ? "visible" : "hidden"}`}>
      {isOpen && (
        <div className="absolute inset-0 backdrop-blur-xs bg-black/30 z-10" />
      )}
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[0.4, 0]}
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
            </div>

            <div className="mb-4">
              <QRCodeSVG value={qrCodeData} size={220} />
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
        </div>

        <div className="mb-4">
          <QRCodeSVG value={qrCodeData} size={256} />
        </div>

        <CircleX
          className="w-8 h-8 absolute right-2 top-2 text-accent-500 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default QrCodeModal;
