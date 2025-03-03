import React from "react";
import { EventsList, Sidebar } from "../components/events";

const ExplorePage: React.FC = () => {
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
