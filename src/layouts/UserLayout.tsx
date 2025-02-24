import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages or Components for Routes
import Navbar from "../components/Navbar";
import { CreateEvent, EventDetail, ExplorePage, HomePage } from "../pages";

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<ExplorePage />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/create" element={<CreateEvent />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserLayout;
