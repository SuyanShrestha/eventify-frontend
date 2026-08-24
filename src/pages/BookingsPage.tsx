import React from "react";
import { EventsList } from "../components/events";

const BookingsPage: React.FC = () => {
  return (
    <div className="mt-[4rem]">
      <EventsList isBooking={true} />
    </div>
  );
};

export default BookingsPage;
