import React, { useState } from "react";
import { EventsList, Sidebar } from "../components/events";
import { SlidingMenu } from "../components/ui";
import { PanelLeftOpen } from "../assets/icons";

const ExplorePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <Sidebar />
        </div>
      </div>

      <SlidingMenu
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        position="left"
      >
        <div className="w-[20rem] h-full bg-gray-100">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen}/>
        </div>
      </SlidingMenu>

      {/* Right Section */}
      <EventsList isDashboard={false} />
    </div>
  );
};

export default ExplorePage;
