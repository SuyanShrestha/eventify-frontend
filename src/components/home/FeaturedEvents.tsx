import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEvents } from "../../store/eventSlice";
import { Messages, eventsData } from "../../constants";
import { EmptyLottie } from "../ui";
import { EventCard } from "../events";
import { CircleChevronRight } from "../../assets/icons";
import { Link } from "react-router-dom";

const FeaturedEvents: React.FC = () => {
  const { events } = useSelector((state: RootState) => state.events);
  const dispatch = useDispatch();

  const limitedEvents = events.slice(0, 3);

  useEffect(() => {
    dispatch(setEvents(eventsData));
  }, [dispatch]);
  console.log("helloo filtered evetns: ", events);

  return (
    <div className="w-full mx-auto flex justify-center ">
      <div className="max-w-7xl w-full h-full flex flex-col my-[8rem] justify-between lg:justify-center items-center relative">
        {/* header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-secondary-text-500 md:text-4xl">
            Featured Events
          </h2>
          <p className="mt-2 text-gray-700 md:text-lg">
            Discover the most popular events happening near you
          </p>
        </div>

        {/* events */}
        <div className="p-4 h-full max-w-7xl mx-auto overflow-auto flex-grow justify-start ">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-6">
            {!limitedEvents.length ? (
              <div className="flex justify-center items-center min-h-[60vh] col-span-3">
                <EmptyLottie spanText={Messages.no_events_message} />
              </div>
            ) : (
              limitedEvents.map((event) => (
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
                />
              ))
            )}
          </div>
        </div>

        <Link
          to="/events" // replace with your actual route if different
          className={`lg:px-3 py-2 text-lg transition-colors duration-300 lg:absolute lg:-top-8 lg:right-0 flex items-center mt-8 ${
            location.pathname === "/events"
              ? "text-accent-500"
              : "text-secondary-text-500 hover:text-accent-text-500"
          }`}
        >
          <CircleChevronRight className="ml-2" size={50} />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedEvents;
