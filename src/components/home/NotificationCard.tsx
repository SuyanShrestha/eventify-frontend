import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { truncateText } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { getEventDetailRoute } from "../../constants";
import axios from "axios";

interface NotificationCardProps {
  id:number;
  eventId: number;
  message: string;
  createdAt: string;
  isRead: boolean;
  onClose: () => void;
  banner:string;
  title:string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  eventId,
  message,
  createdAt,
  isRead,
  onClose,
  banner,
  title,
}) => {
  const timeAgo = moment(createdAt).fromNow();

  const navigate = useNavigate();

  const truncatedEventTitle = truncateText(title ?? "", 36);
  const truncatedMessage = truncateText(message, 50);

  const handleNotificationClick = async() => {
    navigate(getEventDetailRoute(eventId));
    await axios.put(`http://localhost:8080/api/notifications/mark-as-read/${id}/`,{},{headers:{
      Authorization:`Bearer ${localStorage.getItem('eventify-token')}`
    }})
    onClose();
  };

  return (
    <div
      className={`p-4 shadow-md rounded-lg flex items-center justify-between border-l-4 transition-all cursor-pointer ${
        isRead ? "border-gray-300 bg-white" : "border-blue-500 bg-blue-50"
      }`}
      onClick={handleNotificationClick}
    >
      <div className="flex items-start space-x-4">
        {/* {!isRead && <span className="w-3 h-3 bg-blue-500 rounded-full mt-1" />} */}
          <img
            src={`http://localhost:8080${banner}`}
            alt={truncatedEventTitle}
            className="w-12 h-12 rounded-md object-cover"
          />
        <div>
          {truncatedEventTitle && (
            <p className="text-sm font-semibold text-gray-700">
              {truncatedEventTitle}
            </p>
          )}
          <p className={`text-lg ${isRead ? "font-normal" : "font-bold"}`}>
            {truncatedMessage}
          </p>
          <p className="text-sm text-gray-500">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
