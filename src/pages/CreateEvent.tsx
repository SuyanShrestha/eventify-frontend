import type React from "react";
import { FileClock } from "../assets/icons";
import { EventForm } from "../components/events";
// import MarkdownEditor from "../components/MarkdownEditor";
// import Delta from "quill-delta";

const CreateEvent: React.FC = () => {
  return (
    <div className="bg-primary-500 min-h-[calc(100vh-4rem)] z-20">
      {/* HEADER */}
      <div className="mt-16 bg-secondary-500 py-6 px-4 sm:px-6 lg:px-8 shadow-md z-5 ">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full gap-32 py-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl sm:text-5xl font-bold text-secondary-text-500">
              Create Event
            </h1>
            <p className="hidden sm:block sm:text-2xl text-secondary-text-400 ">
              Just a few details & you're set!
            </p>
          </div>

          <button className="text-lg sm:text-xl text-accent-text-500 hover:text-accent-400 transition duration-300 cursor-pointer flex gap-2 items-center">
            <span>History</span>
            <FileClock className="w-5 h-5 " />
          </button>
        </div>
      </div>

      {/* CONTENTS */}
      <EventForm />
    </div>
  );
};

export default CreateEvent;
