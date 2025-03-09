import React, { useEffect, useState } from "react";
import { Search } from "../../assets/icons";
import { useDebounce } from "../../hooks";
import { clearFilters, setEvents, setSearchTerm } from "../../store/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import EmptyLottie from "../ui/EmptyLottie";
import { Event, Messages, eventsData } from "../../constants";
import { EventCard } from "./EventCard";
import { cn } from "../../lib/utils";

interface EventsListProps {
  isDashboard?: boolean;
  isBooking?: boolean;
}

const EventsList: React.FC<EventsListProps> = ({
  isDashboard = false,
  isBooking = false,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText, 300);
  const location = useLocation();

  const dispatch = useDispatch();
  const { filteredEvents } = useSelector((state: RootState) => state.events);
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.users);
  const { bookings } = useSelector((state: RootState) => state.bookings);

  const mappedBookings = bookings.map(
    ({ bookingId, eventId, userId, bookingCreated }) => {
      const user = users.find((user) => user.id === userId);
      const event = eventsData.find((event) => event.id === eventId);

      return {
        bookingId,
        eventId: event?.id,
        eventTitle: event?.title,
        eventSubtitle: event?.subtitle,
        eventImage: event?.imgSrc,
        userId: user?.id,
        userName: user?.username,
        bookingCreated,
      };
    }
  );

  const currentUserBookings = mappedBookings.filter(
    (item) => item.userId === currentUser?.id
  );

  useEffect(() => {
    if (isBooking && currentUser) {
      const bookedEvents = currentUserBookings
        .map((booking) =>
          eventsData.find((event) => event.id === booking.eventId)
        )
        .filter((event) => event !== undefined);
      dispatch(setEvents(bookedEvents as Event[]));
    } else if (isDashboard && currentUser) {
      const eventsFilteredByUser = eventsData.filter(
        (event: Event) => event.organizerId === currentUser.id
      );
      dispatch(setEvents(eventsFilteredByUser));
    } else {
      dispatch(setEvents(eventsData));
    }
  }, [dispatch, isDashboard, isBooking, currentUser]);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchText));
  }, [debouncedSearchText, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
  }, [location.pathname]);

  return (
    <div
      className={cn(
        " min-h-[calc(100vh-4rem)] flex flex-col bg-secondary-500",
        !isDashboard && !isBooking && "ml-0 md:ml-[20rem] flex-grow "
      )}
    >
      {/* <div className="bg-secondary-500 shadow-md p-4 fixed top-16 left-[5rem] md:left-[20rem] right-0 z-10 "> */}
      <div
        className={cn(
          "bg-secondary-500 shadow-md p-4 fixed top-16 z-10",
          isDashboard
            ? "left-1/2 transform -translate-x-1/2 max-w-7xl w-full"
            : isBooking
            ? "left-1/2 transform -translate-x-1/2 max-w-7xl w-full"
            : "left-[5rem] md:left-[20rem] right-0 "
        )}
      >
        <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="p-2 pl-12 w-full border border-gray-300 rounded-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className=" mt-[5rem] pt-4 max-w-7xl mx-auto flex justify-center w-full">
        <h3 className="text-2xl mb-6 font-semibold text-secondary-text-500">
          {isBooking
            ? "- My Bookings -"
            : isDashboard
            ? "- My Events -"
            : "- Events -"}
        </h3>
      </div>
      <div className="p-4 h-full max-w-7xl mx-auto overflow-auto flex-grow justify-start ">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-6">
          {!filteredEvents.length ? (
            <div className="flex justify-center items-center min-h-[60vh] col-span-3">
              <EmptyLottie spanText={Messages.no_events_message} />
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                eventId={event.id.toString()}
                organizerId={event.organizerId}
                title={event.title}
                subtitle={event.subtitle}
                startDate={event.startDate}
                endDate={event.endDate}
                bookingDeadline={event.bookingDeadline}
                ticketPrice={event.ticketPrice}
                eventType={event.eventType}
                venue={event.venue}
                imgSrc={event.imgSrc}
                attendees={event.attendees}
                isSaved={event.isSaved}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
