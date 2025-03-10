import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages or Components for Routes
import Navbar from "../components/Navbar";
import {
  BookingsPage,
  CreateEvent,
  Dashboard,
  EditEvent,
  EventDetail,
  ExplorePage,
  HomePage,
  LoginPage,
  RegisterPage,
} from "../pages";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";


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
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/edit/:eventId" element={<EditEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserLayout;
