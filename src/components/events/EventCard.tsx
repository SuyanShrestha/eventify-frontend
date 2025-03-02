import { useState, type FC } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Share,
  FaBookmark,
  FaRegBookmark,
} from "../../assets/icons";
import { Badge } from "../ui";
import { useNavigate } from "react-router-dom";
import { getEventDetailRoute } from "../../constants";
import { formatDateTime, truncateText } from "../../helpers";
import ShareModal from "./ShareModal";

interface EventCardProps {
  eventId: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  bookingDeadline?: string;
  ticketPrice: number;
  eventType: string;
  venue: string;
  imgSrc: string;
}

export const EventCard: FC<EventCardProps> = ({
  eventId,
  title,
  subtitle,
  startDate,
  endDate,
  bookingDeadline,
  ticketPrice,
  eventType,
  venue,
  imgSrc,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();

  const { date: formattedStartDate, time: formattedStartTime } =
    formatDateTime(startDate);

  const truncatedTitle = truncateText(title, 25);
  const truncatedSubtitle = truncateText(subtitle, 36);

  const handleDetailsClick = () => {
    navigate(getEventDetailRoute(eventId));
  };

  const openShareModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const checkExpired = (endDate: string, bookingDeadline?: string): boolean => {
    const currentDate = new Date();
    const parsedBookingDeadline = bookingDeadline
      ? new Date(bookingDeadline)
      : null;
    const parsedEndDate = new Date(endDate);

    return parsedBookingDeadline
      ? currentDate > parsedBookingDeadline
      : currentDate > parsedEndDate;
  };

  const isExpired = checkExpired(endDate, bookingDeadline);

  return (
    <div
      className="p-4 border border-gray-200 rounded-lg w-full xl:w-full flex flex-col xl:flex-col xl:justify-center xl:items-start gap-4 hover:cursor-pointer"
      style={{ boxShadow: "0 0 10px rgba(85, 60, 154, 0.4)" }}
      onClick={handleDetailsClick}
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <img
          src={imgSrc}
          alt="event-image"
          className="rounded-lg w-96 h-48 object-cover shadow-md border border-gray-200"
        />

        <div>
          <h3 className="text-2xl font-medium text-secondary-text-500">
            {truncatedTitle}
          </h3>
          <p className="text-md text-primary-text-400">{truncatedSubtitle}</p>
        </div>
        <div className="flex justify-between space-x-4 flex-col gap-2 text-primary-text-500">
          <span className="flex items-center text-md">
            <MapPin className="h-4 w-4 mr-2" />
            {venue}
          </span>

          <div className="flex flex-row gap-8 text-sm items-center">
            <span className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="flex items-center">{formattedStartDate}</span>
            </span>
            {isExpired ? (
              <Badge>booking expired</Badge>
            ) : (
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4 mr-2" />
                <span className="flex items-center">{formattedStartTime}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        {/* Top Section: Badge + Price */}
        <div className="flex items-center justify-start gap-4 h-full text-lg font-semibold">
          {ticketPrice === 0 ? (
            <span className="text-accent-500">FREE</span>
          ) : (
            <span className="text-accent-500">Rs {ticketPrice.toFixed(2)}</span>
          )}
          <Badge>{eventType}</Badge>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <button
            className="w-full lg:w-auto flex-1 text-secondary-text-500 border-0 border-black p-0 hover:cursor-pointer"
            onClick={toggleBookmark}
          >
            <FaRegBookmark className="h-5 w-5 mr-2" />
          </button>
          <button
            className="w-full lg:w-auto flex-1 text-secondary-text-500 border-0 border-black p-0 hover:cursor-pointer"
            onClick={openShareModal}
          >
            <Share className="h-5 w-5 mr-2" />
          </button>
        </div>

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          shareUrl={`${window.location.href}/${eventId}`}
          // shareUrl="https://lucide.dev/icons/circle-x"
        />
      </div>
    </div>
  );
};
