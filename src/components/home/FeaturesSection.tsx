import React, { useState } from "react";
import { Tabs } from "../ui";
import FeatureCard from "./FeatureCard";
import {
  Users,
  Bell,
  Bookmark,
  Calendar,
  CirclePlus,
  Filter,
  Globe,
  PenLine,
  Ticket,
} from "../../assets/icons";

const FeaturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Explorers");

  const tabOptions = ["Explorers", "Attendees", "Organizers"];

  // Function for Explorer Feature Cards
  const renderExplorerFeatures = () => {
    return (
      <>
        <FeatureCard
          icon={Globe}
          title="Discover events"
          description="Browse through thousands of events happening around you without signing up."
        />
        <FeatureCard
          icon={Filter}
          title="Filter by Interest"
          description="Find events that match your interests with our powerful filtering system."
        />
        <FeatureCard
          icon={Calendar}
          title="Event Details"
          description="Get comprehensive information about events including venue, time, and organizer details."
        />
      </>
    );
  };

  // Function for Attendee Feature Cards
  const renderAttendeeFeatures = () => {
    return (
      <>
        <FeatureCard
          icon={Ticket}
          title="Book Events"
          description="Secure your spot at events with our easy booking system and receive QR coded tickets."
        />
        <FeatureCard
          icon={Bell}
          title="Notifications"
          description="Stay updated with event reminders and changes through personalized notifications."
        />
        <FeatureCard
          icon={Bookmark}
          title="Favourites"
          description="Save events to favourites and access them anytime, whenever needed."
        />
      </>
    );
  };

  // Function for Organizer Feature Cards
  const renderOrganizerFeatures = () => {
    return (
      <>
        <FeatureCard
          icon={CirclePlus}
          title="Create Events"
          description="Easily create and publish events with our intuitive event creation tools."
        />
        <FeatureCard
          icon={PenLine}
          title="Edit Events"
          description="Already published an event, but need changes? No problem, Editing is just as easy."
        />
        <FeatureCard
          icon={Users}
          title="Manage Attendee"
          description="Manage attendees, send updates, and handle check-ins all from one platform."
        />
      </>
    );
  };

  return (
    <div className="w-full mx-auto flex justify-center">
      <div className="max-w-7xl w-full h-full flex flex-col my-[8rem] justify-center items-center ">
        {/* header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-secondary-text-500 md:text-4xl">
            One Platform, Multiple Possibilities
          </h2>
          <p className="mt-2 text-gray-700 md:text-lg">
            Whether you're an attendee or an organizer, we've got you covered
          </p>
        </div>

        <div className="pt-4 w-full flex flex-col gap-6">
          <Tabs
            options={tabOptions}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="flex flex-wrap justify-center gap-8 mx-2">
            {activeTab === "Explorers" && renderExplorerFeatures()}
            {activeTab === "Attendees" && renderAttendeeFeatures()}
            {activeTab === "Organizers" && renderOrganizerFeatures()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
