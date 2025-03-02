import type React from "react";
import { useEffect, useState } from "react";
import { Calendar, FileClock, MapPin, Tag } from "../assets/icons";
import { useToast } from "../hooks";
import { validateEventForm } from "../helpers";
// import MarkdownEditor from "../components/MarkdownEditor";
// import Delta from "quill-delta";

const CreateEvent: React.FC = () => {
  const [event, setEvent] = useState({
    title: "",
    subtitle: "",
    startDate: "",
    endDate: "",
    bookingDeadline: "",
    eventType: "physical",
    venue: "",
    ticketPrice: 0,
    details: "",
  });

  useEffect(() => console.log("event details: ", event.details), [event]);

  const { showToast } = useToast();

  const handleInputChange = (e: any) => {
    if (e.target) {
      const { name, value } = e.target;
      setEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleQuillChange = (content: string, delta: Delta, source: string) => {
  //   const markdown = deltaToMarkdown(delta.ops); // Convert to Markdown
  //   setEvent((prev) => ({ ...prev, details: markdown }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateEventForm(event);

    if (errors.length > 0) {
      showToast(errors, "error");
      return;
    }

    console.log("Form submitted:", event);

    setEvent({
      title: "",
      subtitle: "",
      startDate: "",
      endDate: "",
      bookingDeadline: "",
      eventType: "physical",
      venue: "",
      ticketPrice: 0,
      details: "",
    });

    showToast(["Event submitted successfully!"], "success");
  };

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
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* title */}
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={event.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    event.title.length > 100
                      ? "border-accent-400"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400`}
                  required
                />
                <p
                  className={` ${
                    event.title.length > 100
                      ? "text-accent-text-500 font-bold text-xs mt-2"
                      : "text-primary-text-400 text-xs mt-1"
                  }`}
                >
                  {event.title.length}/100 characters
                </p>
              </div>

              {/* subtitle */}
              <div className="col-span-full">
                <label
                  htmlFor="subtitle"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Subtitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={event.subtitle}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    event.title.length > 100
                      ? "border-accent-400"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400`}
                />
                <p
                  className={` ${
                    event.subtitle.length > 100
                      ? "text-accent-text-500 font-bold text-xs mt-2"
                      : "text-primary-text-400 text-xs mt-1"
                  }`}
                >
                  {event.subtitle.length}/100 characters
                </p>
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Start Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400"
                    size={18}
                  />
                  <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    value={event.startDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
                    required
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  End Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400"
                    size={18}
                  />
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    value={event.endDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
                    required
                  />
                </div>
              </div>

              {/* bookingDeadline */}
              <div>
                <label
                  htmlFor="bookingDeadline"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Booking Deadline
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400"
                    size={18}
                  />
                  <input
                    type="datetime-local"
                    id="bookingDeadline"
                    name="bookingDeadline"
                    value={event.bookingDeadline}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
                    required
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label
                  htmlFor="eventType"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Event Type
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400"
                    size={18}
                  />
                  <select
                    id="eventType"
                    name="eventType"
                    value={event.eventType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 appearance-none"
                    required
                  >
                    <option value="physical">Physical</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>

              {/* Venue */}
              <div>
                <label
                  htmlFor="venue"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Venue
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400"
                    size={18}
                  />
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={event.venue}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
                    required
                  />
                </div>
              </div>

              {/* Ticket Price */}
              <div>
                <label
                  htmlFor="ticketPrice"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Ticket Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400">
                    Rs
                  </span>
                  <input
                    type="text"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={event.ticketPrice}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
                    placeholder="0 for free event"
                    required
                  />
                </div>
              </div>

              {/* <MarkdownEditor
                value={event.details}
                onChange={handleQuillChange}
              /> */}

              <div className="col-span-full">
                <label
                  htmlFor="details"
                  className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={event.details}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border border-gray-300
                  rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 min-h-[150px]`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-accent-500 text-accent-btn-text py-3 px-4 rounded-md hover:bg-accent-400 transition duration-300 font-semibold cursor-pointer"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
