import React from "react";
import { EventsList } from "../components/events";

const Dashboard: React.FC = () => {
  return (
    <div className="mt-[4rem]">
      <EventsList isDashboard={true} />
    </div>
  );
};

export default Dashboard;
