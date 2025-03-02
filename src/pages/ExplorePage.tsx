import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import { Messages, eventsData } from "../constants";
import { Search } from "../assets/icons";
import { useDebounce } from "../hooks";
import { EventCard, Sidebar } from "../components/events";
import { clearFilters, setEvents, setSearchTerm } from "../store/eventSlice";
import { useLocation } from "react-router-dom";
import EmptyLottie from "../components/ui/EmptyLottie";
import EventsList from "../components/events/EventsList";

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
      <EventsList isDashboard={false} />
    </div>
  );
};

export default ExplorePage;
