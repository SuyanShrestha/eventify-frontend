'use client'

import React, { useEffect, useState } from "react";
import { Messages } from "../../constants";
import { EmptyLottie } from "../ui";
import { EventCard } from "../events";
import { CircleChevronRight } from "../../assets/icons";
import { Link } from "react-router-dom";
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

const FeaturedEvents: React.FC = () => {
  
    const [events, setEvents] = useState<ApiEvent[]>([]);

  const limitedEvents = events.slice(0, 3);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
          const response = await axios.get(
            'http://localhost:8000/api/events/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('eventify-token')}`
            }
          });
          setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);


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
                key={event?.id}
                eventId={event?.id.toString()}
                organizerId={event?.organizer?.id.toString()}
                title={event?.title}
                subtitle={event?.subtitle}
                startDate={event?.start_date}
                endDate={event?.end_date}
                bookingDeadline={event?.booking_deadline}
                ticketPrice={parseFloat(event?.ticket_price)}
                eventType={event?.event_type}
                venue={event?.venue || ""}
                imgSrc={event?.banner}
                attendees={event?.attendees_count}
                isSaved={event?.is_saved}
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
