import React from "react";
import { ModalSheet } from "../ui";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import NotificationCard from "./NotificationCard";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { bookings } = useSelector((state: RootState) => state.bookings);

  const mappedBookings = bookings.filter(
    (booking) => booking.userId === currentUser?.id
  );
  const userEventIds = mappedBookings.map((booking) => booking.eventId);

  const mappedNotifications = notifications.filter((notification) =>
    userEventIds.includes(notification.event)
  );

  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[0.6, 0]}
      customClass="max-w-2xl w-full"
    >
      <div className="flex flex-col">
        <h2 className="text-xl px-8 font-semibold text-center mb-4 text-secondary-text-500">
          Notifications
        </h2>
        <hr className="border-t border-gray-300" />
      </div>

      <div>
        <p className="text-lg text-primary-text-500 mb-6 text-center">
          Here are the notifications for events you have subscribed to.
        </p>
        {mappedNotifications.length === 0 ? (
          <p className="text-gray-500 text-center">
            No new updates for your bookings.
          </p>
        ) : (
          <ul className="space-y-4">
            {mappedNotifications.map((notification) => {
              return (
                <NotificationCard
                  key={notification.id}
                  eventId={notification.event}
                  message={notification.message}
                  createdAt={notification.created_at}
                  isRead={notification.is_read}
                  onClose={onClose}
                />
              );
            })}
          </ul>
        )}
      </div>
    </ModalSheet>
  );
};

export default NotificationModal;
