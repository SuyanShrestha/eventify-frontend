import React, { useEffect, useState } from "react";
import { Search } from "../../assets/icons";
import { useDebounce } from "../../hooks";
import { useLocation } from "react-router-dom";
import EmptyLottie from "../ui/EmptyLottie";
import { Messages } from "../../constants";
import { EventCard } from "./EventCard";
import { cn } from "../../lib/utils";
import axios from "axios";

// API Event interface to match the response format
interface ApiEvent {
  id: number;
  banner: string;
  title: string;
  subtitle: string;
  event_type: string;
  is_free: boolean;
  ticket_price: string;
  start_date: string;
  end_date: string;
  booking_deadline: string;
  venue: string | null;
  category_details: {
    id: number;
    name: string;
  };
  tickets_available: number;
  created_at: string;
  updated_at: string;
  organizer: {
    id: number;
    profile_picture: string | null;
    username: string;
  };
  is_upcoming: boolean;
  is_active: boolean;
  is_expired: boolean;
  attendees_count: number;
  is_saved: boolean;
}

interface EventsListProps {
  isDashboard?: boolean;
  isBooking?: boolean;
}

const EventsList: React.FC<EventsListProps> = ({
  isDashboard = false,
  isBooking = false,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<ApiEvent[]>([]);
  const debouncedSearchText = useDebounce<string>(searchText, 300);
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('eventify-user') || '{}');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if(isDashboard){
          const response = await axios.get(
            'http://localhost:8000/api/events/my-events/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
            }
          });
          setEvents(response.data);
          return;
        }
        if(isBooking){
          const response = await axios.get(
            'http://localhost:8000/api/events/my-bookings/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
            }
          });
          setEvents(response.data);
          return;
        }
        const response = await axios.get(
          'http://localhost:8000/api/events/'
        )
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];
    
    if (debouncedSearchText) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
    }
    
    // Filter for dashboard (my events)
    if (isDashboard && currentUser && currentUser.id) {
      filtered = filtered.filter(event => event.organizer.id === currentUser.id);
    }
    
    if (isBooking && currentUser && currentUser.id) {
    }
    
    setFilteredEvents(filtered);
  }, [events, debouncedSearchText]);

  return (
    <div
      className={cn(
        " min-h-[calc(100vh-4rem)] flex flex-col bg-secondary-500",
        !isDashboard && !isBooking && "ml-0 md:ml-[20rem] flex-grow "
      )}
    >
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
                organizerId={event.organizer.id.toString()}
                title={event.title}
                subtitle={event.subtitle}
                startDate={event.start_date}
                endDate={event.end_date}
                bookingDeadline={event.booking_deadline}
                ticketPrice={parseFloat(event.ticket_price)}
                eventType={event.event_type}
                venue={event.venue || ""}
                imgSrc={isBooking ? `http://localhost:8000/`+event.banner :event.banner}
                attendees={event.attendees_count}
                isSaved={event.is_saved}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsList;