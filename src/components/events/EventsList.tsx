import React, { useEffect, useState } from "react";
import { Search } from "../../assets/icons";
import { useDebounce } from "../../hooks";
import { useLocation } from "react-router-dom";
import EmptyLottie from "../ui/EmptyLottie";
import { Messages } from "../../constants";
import { EventCard } from "./EventCard";
import { cn } from "../../lib/utils";
import axios from "axios";

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

interface FilterState {
  price?: string | null;
  date?: string | null;
  type?: string | null;
  expirationStatus?: string | null;
  eventCategoryId?: string | null;
  isSavedFilter?: boolean;
}

interface EventsListProps {
  isDashboard?: boolean;
  isBooking?: boolean;
  filters?: FilterState;
}

const EventsList: React.FC<EventsListProps> = ({
  isDashboard = false,
  isBooking = false,
  filters = {}
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
            'http://localhost:8080/api/events/my-events/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
            }
          });
          setEvents(response.data);
          return;
        }
        if(isBooking){
          const response = await axios.get(
            'http://localhost:8080/api/events/my-bookings/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
            }
          });
          setEvents(response.data);
          return;
        }
        const response = await axios.get(
          'http://localhost:8080/api/events/'
        )
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [isDashboard, isBooking]);

  // useEffect(() => {
  //   let filtered = [...events];
    
  //   if (debouncedSearchText) {
  //     filtered = filtered.filter(event => 
  //       event.title.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
  //       event.subtitle.toLowerCase().includes(debouncedSearchText.toLowerCase())
  //     );
  //   }
    
  //   if (filters) {
  //     if (filters.price) {
  //       filtered = filtered.filter(event => 
  //         (filters.price === 'free' && event.is_free) || 
  //         (filters.price === 'paid' && !event.is_free)
  //       );
  //     }
      
  //     if (filters.type) {
  //       filtered = filtered.filter(event => event.event_type === filters.type);
  //     }
      
  //     if (filters.expirationStatus) {
  //       if (filters.expirationStatus === 'upcoming') {
  //         filtered = filtered.filter(event => event.is_upcoming);
  //       } else if (filters.expirationStatus === 'expired') {
  //         filtered = filtered.filter(event => event.is_expired);
  //       }
  //     }
      
  //     if (filters.eventCategoryId) {
  //       filtered = filtered.filter(event => 
  //         event.category_details.id.toString() === filters.eventCategoryId
  //       );
  //     }
      
  //     if (filters.isSavedFilter) {
  //       filtered = filtered.filter(event => event.is_saved);
  //     }
      
  //     if (filters.date) {
  //       const today = new Date();
  //       const tomorrow = new Date(today);
  //       tomorrow.setDate(tomorrow.getDate() + 1);
        
  //       switch(filters.date) {
  //         case 'today':
  //           filtered = filtered.filter(event => {
  //             const eventDate = new Date(event.start_date);
  //             return eventDate.toDateString() === today.toDateString();
  //           });
  //           break;
  //         case 'tomorrow':
  //           filtered = filtered.filter(event => {
  //             const eventDate = new Date(event.start_date);
  //             return eventDate.toDateString() === tomorrow.toDateString();
  //           });
  //           break;
  //         case 'this-week':
  //           const weekEnd = new Date(today);
  //           weekEnd.setDate(today.getDate() + (7 - today.getDay()));
            
  //           filtered = filtered.filter(event => {
  //             const eventDate = new Date(event.start_date);
  //             return eventDate >= today && eventDate <= weekEnd;
  //           });
  //           break;
  //         case 'this-month':
  //           const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            
  //           filtered = filtered.filter(event => {
  //             const eventDate = new Date(event.start_date);
  //             return eventDate.getMonth() === today.getMonth() && 
  //                    eventDate.getFullYear() === today.getFullYear();
  //           });
  //           break;
  //       }
  //     }
  //   }
    
  //   if (isDashboard && currentUser && currentUser.id) {
  //     filtered = filtered.filter(event => event.organizer.id === currentUser.id);
  //   }
    
  //   setFilteredEvents(filtered);
  // }, [events, debouncedSearchText, filters]);

  useEffect(() => {
    if (!events.length) return; // Prevent unnecessary re-renders
  
    let filtered = [...events];
  
    if (debouncedSearchText) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
    }
  
    if (filters && Object.keys(filters).length > 0) {
      if (filters.price) {
        filtered = filtered.filter(event =>
          (filters.price === "free" && event.is_free) ||
          (filters.price === "paid" && !event.is_free)
        );
      }
  
      if (filters.type) {
        filtered = filtered.filter(event => event.event_type === filters.type);
      }
  
      if (filters.expirationStatus) {
        filtered = filtered.filter(event =>
          filters.expirationStatus === "upcoming"
            ? event.is_upcoming
            : event.is_expired
        );
      }
  
      if (filters.eventCategoryId) {
        filtered = filtered.filter(
          event => event.category_details.id.toString() === filters.eventCategoryId
        );
      }
  
      if (filters.isSavedFilter) {
        filtered = filtered.filter(event => event.is_saved);
      }
    }
  
    setFilteredEvents(filtered);
  }, [events, debouncedSearchText, JSON.stringify(filters)]);
  
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