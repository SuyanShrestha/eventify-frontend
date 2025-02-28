import React, { useState } from "react";
import { eventsData } from "../constants";
import { useDebounce } from "../hooks";
import { Search } from "lucide-react";
import { EventCard, Sidebar } from "../components/events";

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 300);

  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="flex mt-[4rem] ">
      {/* Sidebar Section */}
      <div className="hidden md:block w-[20vw] h-full bg-gray-800 text-white fixed left-0 top-16 bottom-16">
        <h1 className="text-2xl p-4">Explore Sidebar</h1>
      </div>

      {/* Right Section */}
      <div className="ml-0 md:ml-[20vw] flex-grow h-full flex flex-col">
        <div className=" bg-secondary-500 shadow-md p-4 fixed top-16 left-[20vw] right-0 z-10 ">
          <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-12 w-full border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-secondary-500 mt-[5rem] p-4 h-full max-w-7xl mx-auto overflow-auto flex-grow">
          <h2 className="text-2xl mb-6 font-semibold text-secondary-text-500">
            Events
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-6 justify-center">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                eventId={event.id.toString()}
                title={event.title}
                subtitle={event.subtitle}
                startDate={event.startDate}
                ticketPrice={event.ticketPrice}
                eventType={event.eventType}
                venue={event.venue}
                imgSrc={event.imgSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
