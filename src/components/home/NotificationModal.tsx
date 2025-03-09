import React from "react";
import { useMediaQuery } from "react-responsive";
import { ModalSheet } from "../ui";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const isSmallest = useMediaQuery({ maxWidth: 475 });
  const isSmaller = useMediaQuery({ minWidth: 476, maxWidth: 767 });

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={isSmallest ? [0.5, 0] : isSmaller ? [0.4, 0] : [0.6, 0]}
      customClass="max-w-2xl w-full"
    >
      <div className="flex flex-col">
        <h2 className="text-xl px-8 font-semibold text-center mb-4 text-secondary-text-500">
          Notifications
        </h2>
        <hr className="border-t border-gray-300" />
      </div>

      <p className="text-lg text-primary-text-500 mb-6 text-center">
        Here are the notifications for events you have subscribed to.
      </p>
    </ModalSheet>
  );
};

export default NotificationModal;
