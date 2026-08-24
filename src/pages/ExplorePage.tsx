import React, { useState } from "react";
import { EventsList } from "../components/events";
import Sidebar from "../components/events/Sidebar";

interface FilterState {
  price?: string | null;
  date?: string | null;
  type?: string | null;
  expirationStatus?: string | null;
  eventCategoryId?: string | null;
  isSavedFilter?: boolean;
}
import { SlidingMenu } from "../components/ui";
import { PanelLeftOpen } from "../assets/icons";

const ExplorePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({});

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex mt-[4rem] relative">
      <button
        className="md:hidden fixed top-[5rem] left-4 z-50 p-2 rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        <PanelLeftOpen className="h-8 w-8 text-secondary-text-500" />
      </button>

      {/* Sidebar Section */}
      <div className="hidden md:block w-[20rem] h-full bg-gray-100 fixed left-0 top-16 bottom-16 border-r border-r-gray-300">
        <div className="w-[98%] bg-primary-500 h-full">
          <Sidebar onFilterChange={handleFilterChange} />
        </div>
      </div>

      <SlidingMenu
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        position="left"
      >
        <div className="w-[20rem] h-full bg-gray-100">
          <Sidebar/>
        </div>
      </SlidingMenu>

      <SlidingMenu
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        position="left"
      >
        <div className="w-[20rem] h-full bg-gray-100">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen}/>
        </div>
      </SlidingMenu>

      <EventsList isDashboard={false} filters={filters} />
    </div>
  );
};

export default ExplorePage;