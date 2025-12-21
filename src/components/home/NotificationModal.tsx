import React, { useEffect, useState } from "react";
import { ModalSheet } from "../ui";
import NotificationCard from "./NotificationCard";
import axios from "axios";

interface NotificationType {
  id:number;
  event:number;
  message:string;
  is_read:boolean;
  created_at:string;
  event_details:{
    banner:string;
    title:string;
  }
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [notification,setNotification] = useState<NotificationType[]>([])



  useEffect(()=>{
    const fetchNotifications = async()=>{
      const response = await axios.get('http://localhost:8080/api/notifications/',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('eventify-token')}`
        }
      })
      setNotification(response.data)
    }
    fetchNotifications()
  },[isOpen,onClose])

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
        {notification.length === 0 ? (
          <p className="text-gray-500 text-center">
            No new updates for your bookings.
          </p>
        ) : (
          <ul className="space-y-4">
            {notification.map((notification) => {
              return (
                <NotificationCard
                  key={notification?.id}
                  eventId={notification?.event}
                  message={notification?.message}
                  createdAt={notification?.created_at}
                  isRead={notification?.is_read}
                  banner={notification?.event_details?.banner}
                  title={notification?.event_details?.title}
                  id={notification?.id}
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
