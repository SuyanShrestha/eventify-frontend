import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import { Messages, eventsData } from "../constants";
import { useDebounce } from "../hooks";
import { Search } from "lucide-react";
import { EventCard, Sidebar } from "../components/events";
import { clearFilters, setEvents, setSearchTerm } from "../store/eventSlice";
import { useLocation } from "react-router-dom";
import EmptyLottie from "../components/ui/EmptyLottie";

const ExplorePage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText, 300);
  const location = useLocation();

  const dispatch = useDispatch();
  const { filteredEvents } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(setEvents(eventsData));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchText));
  }, [debouncedSearchText, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
  }, [location.pathname]);

  return (
    <div className="flex mt-[4rem] ">
      {/* Sidebar Section */}
      <div className="hidden md:block w-[20rem] h-full bg-gray-100 fixed left-0 top-16 bottom-16 border-r border-r-gray-300">
        <div className="w-[98%] bg-primary-500 h-full">
          <Sidebar />
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-0 md:ml-[20rem] flex-grow min-h-[calc(100vh-4rem)] flex flex-col bg-secondary-500">
        <div className="bg-secondary-500 shadow-md p-4 fixed top-16 left-[5rem] md:left-[20rem] right-0 z-10 ">
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
            - Events - 
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
                  title={event.title}
                  subtitle={event.subtitle}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  bookingDeadline={event.bookingDeadline}
                  ticketPrice={event.ticketPrice}
                  eventType={event.eventType}
                  venue={event.venue}
                  imgSrc={event.imgSrc}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
