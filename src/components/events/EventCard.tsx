import type { FC } from "react";
import { format } from "date-fns";
import {
  MapPin,
  Calendar,
  Clock,
  Share2,
  Info,
  LibraryBig,
  Library,
  SquareLibrary,
} from "lucide-react";
import { Badge, Button } from "../ui";

interface EventCardProps {
  title: string;
  subtitle: string;
  startDate: string;
  ticketPrice: number;
  eventType: string;
  venue: string;
}

export const EventCard: FC<EventCardProps> = ({
  title,
  subtitle,
  startDate,
  ticketPrice,
  eventType,
  venue,
}) => {
  const formattedDate = format(new Date(startDate), "MMM d, yyyy");
  const formattedTime = format(new Date(startDate), "h:mm a");

  return (
    <div
      className="p-4 border border-secondary-text-400 rounded-lg w-full xl:w-full flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 xl:gap-8"
      style={{ boxShadow: "0 0 4px rgba(85, 60, 154, 0.25)" }}
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <div>
          <h3 className="text-2xl font-medium text-secondary-text-500">
            {title}
          </h3>
          <p className="text-md text-primary-text-400">{subtitle}</p>
        </div>
        <div className="flex justify-between space-x-4 flex-col gap-2 text-primary-text-500">
          <span className="flex items-center text-md">
            <MapPin className="h-4 w-4 mr-2" />
            {venue}
          </span>

          <div className="flex flex-row gap-8 text-sm items-center">
            <span className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="flex items-center">{formattedDate}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Clock className="h-4 w-4 mr-2" />
              <span className="flex items-center">{formattedTime}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-between space-y-4 w-full lg:w-auto xl:border-l-2 xl:border-secondary-text-400 xl:pl-8 xl:py-4 border-l-1 border-secondary-text-400 pl-4 py-2">
        {/* Top Section: Badge + Price */}
        <div className="flex items-center justify-start xl:justify-end gap-4 text-lg font-semibold">
          <Badge>{eventType}</Badge>
          {ticketPrice === 0 ? (
            <span className="text-accent-400">FREE</span>
          ) : (
            <span className="text-accent-400">Rs {ticketPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Bottom Section: Buttons */}
        <div className="flex flex-col xl:flex-row gap-4">
          <Button className="w-full lg:w-auto flex-1 text-secondary-text-500 border-secondary-text-400">
            {/* <Info className="h-4 w-4 mr-2" /> */}
            <Library className="h-4 w-4 mr-2" />
            Details
          </Button>
          <Button className="w-full lg:w-auto flex-1 text-secondary-text-500 border-secondary-text-400">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};
