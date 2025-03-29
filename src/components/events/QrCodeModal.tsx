import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { ModalSheet } from "../ui";

interface EventItem {
  id: number;
  title: string;
  // Add other relevant properties
}

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBookingId: string | null;
  eventItem: EventItem;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  selectedBookingId,
  eventItem,
}) => {
  // Get current user ID from local storage or context
  const currentUserId = 1; // This would be retrieved from auth context in real app
  
  // In a real app, you'd fetch this from API or local state
  const bookingTimestamp = new Date().toISOString();

  const qrCodeData = `booking_id:${selectedBookingId}|event_id:${eventItem.id}|user_id:${currentUserId}|bookingTimestamp:${bookingTimestamp}`;

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