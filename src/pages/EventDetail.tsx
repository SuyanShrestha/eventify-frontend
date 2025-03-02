import type React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { eventsData } from "../constants";
import {
  Calendar,
  FaRegBookmark,
  Info,
  MapPin,
  PenLine,
  QrCode,
  Share,
  ShoppingCart,
  Tag,
  Trash,
  User,
  UserRound,
  UserRoundCheck,
} from "../assets/icons";
import { formatDateTime } from "../helpers";
import { Button } from "../components/ui";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ShareModal from "../components/events/ShareModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import QrCodeModal from "../components/events/QrCodeModal";

const EventDetail: React.FC = () => {
  const { eventId } = useParams();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const { users } = useSelector((state: RootState) => state.users);
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const eventItem = eventsData.find((e) => e.id.toString() === eventId);
  const { bookings } = useSelector((state: RootState) => state.bookings);
  const organizer = users.find((user) => user.id === eventItem?.organizerId);
  const isOwnEvent = eventItem?.organizerId === currentUser?.id;

  const mappedAttendees = eventItem?.attendees.map(
    ({ attendeeId, isCheckedIn }) => {
      const user = users.find((user) => user.id === attendeeId);
      return {
        name: user?.username || "Unknown",
        isCheckedIn,
      };
    }
  );

  // get bookings which match current eventID and current user's id
  const mappedBookings = bookings
    .filter(
      (booking) =>
        booking.eventId === eventItem?.id && booking.userId === currentUser?.id
    )
    .map((booking) => ({
      bookingId: booking.bookingId,
      eventId: booking.eventId,
      userId: booking.userId,
      bookingCreated: booking.bookingCreated,
    }));

  if (!eventItem) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">
        Event not found!
      </div>
    );
  }

  const { date: formattedStartDate, time: formattedStartTime } = formatDateTime(
    eventItem.startDate
  );
  const { date: formattedEndDate, time: formattedEndTime } = formatDateTime(
    eventItem.endDate
  );

  const openShareModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const openQrModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    bookingId: string
  ) => {
    e.stopPropagation();
    setSelectedBookingId(bookingId);
    setIsQrModalOpen(true);
  };

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleEditEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleDeleteEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="mt-[4rem] flex flex-col  bg-primary-500 min-h-[calc(100vh-4rem)]
    "
    >
      {/* heading */}
      <div
        className="bg-secondary-500 py-12 px-4 sm:px-6 lg:px-8 z-5"
        style={{ boxShadow: "0 0 10px rgba(85, 60, 154, 0.25)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-end gap-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-text-500 mb-2">
              {eventItem.title}
            </h1>
            <p className="text-xl sm:text-2xl text-secondary-text-400 mb-4">
              {eventItem.subtitle}
            </p>
            <div className="text-sm sm:text-lg flex items-center text-[#423e33] mb-2">
              <Calendar className="w-5 h-5 mr-2" />
              {formattedStartDate === formattedEndDate ? (
                // Single-day event
                <>
                  <span className="mr-2">{formattedStartDate}</span>
                  <span className="mr-2">
                    {formattedStartTime} - {formattedEndTime}
                  </span>
                </>
              ) : (
                // Multi-day event
                <>
                  <span className="mr-2">
                    {formattedStartDate} ({formattedStartTime})
                  </span>
                  <span className="mr-2">—</span>
                  <span>
                    {formattedEndDate} ({formattedEndTime})
                  </span>
                </>
              )}
            </div>
            <div className="text-sm sm:text-lg flex items-center text-[#423e33]">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{eventItem.venue}</span>
            </div>
          </div>

          <div>
            {!isOwnEvent ? (
              <div className="flex gap-4 justify-start items-center">
                <button
                  className="max-w-5 lg:w-auto flex-1 text-secondary-text-500 border-0 border-black p-0 hover:cursor-pointer"
                  onClick={toggleBookmark}
                >
                  <FaRegBookmark className="h-5 w-5 mr-2" />
                </button>
                <button
                  className="max-w-5 lg:w-auto flex-1 text-secondary-text-500 border-0 border-black p-0 hover:cursor-pointer"
                  onClick={openShareModal}
                >
                  <Share className="h-5 w-5 mr-2" />
                </button>
              </div>
            ) : (
              <div className="flex gap-4 justify-start items-center">
                <button
                  className="max-w-5 lg:w-auto flex-1 text-secondary-text-500 border-0 border-black p-0 hover:cursor-pointer"
                  onClick={handleEditEvent}
                >
                  <PenLine className="h-5 w-5 mr-2" />
                </button>
                <button
                  className="max-w-5 lg:w-auto flex-1 text-secondary-text-500 border-0 border-black p-0 hover:cursor-pointer"
                  onClick={handleDeleteEvent}
                >
                  <Trash className="h-5 w-5 mr-2" />
                </button>
                <button
                  className="max-w-5 lg:w-auto flex-1 text-secondary-text-500 border-0 border-black p-0 hover:cursor-pointer"
                  onClick={openShareModal}
                >
                  <Share className="h-5 w-5 mr-2" />
                </button>
              </div>
            )}

            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              shareUrl={window.location.href}
              // shareUrl="https://lucide.dev/icons/circle-x"
            />
          </div>
        </div>
      </div>
      {/* content */}
      <div className="bg-primary-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-secondary-text-500 mb-4">
                  Event Overview
                </h2>
                <div className="prose text-primary-text-400 mb-6">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {eventItem.details}
                  </Markdown>
                </div>
              </div>

              <div className="w-full py-4 border-t border-secondary-text-400">
                <h3 className="text-xl sm:text-2xl font-semibold text-secondary-text-500 mb-3">
                  Event Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3 text-accent-text-500" />
                    <span className="text-primary-text-500">
                      Hosted by :{" "}
                      {organizer ? organizer.username : "Unknown Organizer"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 mr-3 text-accent-text-500" />
                    <span className="text-primary-text-500 capitalize">
                      {eventItem.eventType} Event
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {!isOwnEvent ? (
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-secondary-text-500 mb-4">
                      Ticket Information
                    </h3>
                    {eventItem.ticketPrice === 0 ? (
                      <p className="text-2xl font-bold text-accent-text-500 mb-4">
                        FREE
                      </p>
                    ) : (
                      <p className="text-2xl font-bold text-accent-text-500 mb-4">
                        Rs {eventItem.ticketPrice.toFixed(2)}
                      </p>
                    )}
                    <Button
                      bgColor="bg-accent-500"
                      textColor="text-accent-btn-text"
                      className="w-full bg-accent-500 text-accent-btn-text py-2 px-4 rounded-md hover:bg-accent-300 transition duration-300"
                    >
                      {eventItem.ticketPrice === 0
                        ? "Get Ticket"
                        : "Buy Ticket"}
                      <ShoppingCart className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                  <div className="mt-6 bg-[rgba(255,132,0,0.2)] p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 mr-2 text-accent-text-500 mt-1" />
                      <p className="text-sm text-[#7c6f50]">
                        Please note that tickets are non-refundable. Make sure
                        to review all event details before purchasing.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-secondary-text-500 mb-4">
                      {eventItem.attendees.length > 0
                        ? `Attendees [${eventItem.attendees.length}]`
                        : "No attendees yet"}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {mappedAttendees?.map(({ name, isCheckedIn }, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-start gap-2 text-secondary-text-500"
                        >
                          {isCheckedIn ? (
                            <UserRoundCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <UserRound className="h-5 w-5 text-gray-700" />
                          )}
                          <span className="text-gray-800">{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 bg-[rgba(255,132,0,0.2)] p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 mr-2 text-accent-text-500 mt-1" />
                      <p className="text-sm text-[#7c6f50]">
                        Spread the word and share this event to attract more
                        participants!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-secondary-text-500 mb-4">
                  {mappedBookings.length > 0
                    ? `Your Bookings [${mappedBookings.length}]`
                    : "No bookings made"}
                </h3>
                <ul>
                  {mappedBookings.map((booking) => (
                    <li key={booking.bookingId} className="booking-item">
                      <div className="flex gap-4 items-center">
                        <button
                          onClick={(e) => openQrModal(e, booking.bookingId)}
                        >
                          <QrCode className="h-8 w-8 cursor-pointer text-secondary-text-500" />
                        </button>
                        <span className="text-md text-gray-700">
                          {new Date(booking.bookingCreated).toLocaleString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <QrCodeModal
                  isOpen={isQrModalOpen}
                  onClose={() => setIsQrModalOpen(false)}
                  selectedBookingId={selectedBookingId}
                  eventItem={eventItem}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
