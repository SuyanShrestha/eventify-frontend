import { QRCodeSVG } from "qrcode.react";
import { Event } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ModalSheet } from "../ui";

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
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { bookings } = useSelector((state: RootState) => state.bookings);

  const bookingTimestamp =
    bookings.find((booking) => booking.bookingId === selectedBookingId)
      ?.bookingCreated || "N/A";

  const qrCodeData = `booking_id:${selectedBookingId}|event_id:${eventItem.id}|user_id:${currentUser?.id}|bookingTimestamp:${bookingTimestamp}`;

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-center mb-4 text-secondary-text-500">
          Ticket QR code
        </h2>
        <hr className="border-t border-gray-300 " />
      </div>

      <div className="mb-4">
        <QRCodeSVG value={qrCodeData} size={220} />
      </div>
    </ModalSheet>
  );
};

export default QrCodeModal;
