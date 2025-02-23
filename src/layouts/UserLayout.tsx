import React from "react"
import { Route, Routes } from "react-router-dom"

// Pages or Components for Routes
import Navbar from "../components/Navbar"
import HomePage from "../pages/HomePage"
import ExplorePage from "../pages/ExplorePage"
import EventDetail from "../pages/EventDetail"
import UserProfile from "../pages/UserProfile"


const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/events" element={<EventDetail />} />
          <Route path="/explore/events/:id" element={<UserProfile />} />
        </Routes>
      </main>
    </div>
  )
}

export default UserLayout
