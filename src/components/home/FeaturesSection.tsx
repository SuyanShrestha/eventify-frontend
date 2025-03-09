import React, { useState } from "react";
import { Tabs } from "../ui";

const FeaturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Explorers");

  const tabOptions = ["Explorers", "Attendees", "Organizers"];

  return (
    <div className="w-full min-h-screen mx-auto flex justify-center ">
      <div className="max-w-7xl w-full h-full flex flex-col mt-[8rem] justify-center items-center ">
        {/* header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-secondary-text-500 md:text-4xl">
            One Platform, Multiple Possibilities
          </h2>
          <p className="mt-2 text-[#423e33] md:text-lg">
            Whether you're an attendee or an organizer, we've got you covered
          </p>
        </div>

        <div className="pt-4 w-full">
          <Tabs
            options={tabOptions}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
