import type React from "react";
import { useEffect, useState } from "react";
import { LayoutList, MapPin, Tag, Ticket } from "../../assets/icons";
import { useToast } from "../../hooks";
import { formatDateToInputFormat, validateEventForm } from "../../helpers";
import { ImageDragDrop } from "../../components/ui";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { RoutingLinks, eventsData } from "../../constants";
// import MarkdownEditor from "../../components/MarkdownEditor";
// import Delta from "quill-delta";

interface EventState {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  bookingDeadline: string;
  eventType: string;
  eventCategoryId: string;
  venue: string;
  ticketPrice: number;
  availableTickets: number | undefined;
  details: string;
  imgSrc: string | null;
}

interface EventFormProps {
  isEditing?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ isEditing = false }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const eventItem = eventsData.find((e) => e.id.toString() === eventId);

  const [event, setEvent] = useState<EventState>({
    title: eventItem?.title || "",
    subtitle: eventItem?.subtitle || "",
    startDate: eventItem?.startDate
      ? formatDateToInputFormat(eventItem.startDate)
      : "",
    endDate: eventItem?.endDate
      ? formatDateToInputFormat(eventItem.endDate)
      : "",
    bookingDeadline: eventItem?.bookingDeadline
      ? formatDateToInputFormat(eventItem.bookingDeadline)
      : "",
    eventType: eventItem?.eventType || "physical",
    eventCategoryId: eventItem?.eventCategoryId || "c1",
    venue: eventItem?.venue || "",
    ticketPrice: eventItem?.ticketPrice || 0,
    availableTickets: eventItem?.availableTickets || undefined,
    details: eventItem?.details || "",
    imgSrc: eventItem?.imgSrc || null,
  });

  // const [isFree, setIsFree] = useState(false);
  const [isFree, setIsFree] = useState(() => eventItem?.ticketPrice === 0);

  const { categories } = useSelector((state: RootState) => state.categories);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Event details: ", event.details);
    if (event.imgSrc) {
      console.log("Image Source: ", event.imgSrc);
    }
  }, [event]);

  const handleInputChange = (e: any) => {
    if (e.target) {
      const { name, value } = e.target;
      setEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (newDataUrl: string) => {
    setEvent((prev) => ({ ...prev, imgSrc: newDataUrl }));
  };

  const toggleFreeEvent = () => {
    setIsFree((prev) => !prev);
    setEvent((prev) => ({
      ...prev,
      ticketPrice: isFree ? 0 : prev.ticketPrice,
      availableTickets: isFree ? undefined : prev.availableTickets,
    }));
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
      eventCategoryId: "c1",
      venue: "",
      ticketPrice: 0,
      availableTickets: undefined,
      details: "",
      imgSrc: null,
    });

    showToast(["Event submitted successfully!"], "success");

    if (isEditing) {
      navigate(RoutingLinks.Dashboard);
    }
  };

  return (
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
                  event.title.length > 50
                    ? "border-accent-400"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400`}
                required
              />
              <p
                className={` ${
                  event.title.length > 50
                    ? "text-accent-text-500 font-bold text-xs mt-2"
                    : "text-primary-text-400 text-xs mt-1"
                }`}
              >
                {event.title.length}/50 characters
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
                  event.title.length > 50
                    ? "border-accent-400"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400`}
              />
              <p
                className={` ${
                  event.subtitle.length > 50
                    ? "text-accent-text-500 font-bold text-xs mt-2"
                    : "text-primary-text-400 text-xs mt-1"
                }`}
              >
                {event.subtitle.length}/50 characters
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
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={event.startDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
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
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={event.endDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
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
                <input
                  type="datetime-local"
                  id="bookingDeadline"
                  name="bookingDeadline"
                  value={event.bookingDeadline}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400"
                  required
                />
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 appearance-none cursor-pointer"
                  required
                >
                  <option value="physical">Physical</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Event Category */}
            <div>
              <label
                htmlFor="eventCategory"
                className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
              >
                Event Category
              </label>
              <div className="relative">
                <LayoutList
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400"
                  size={18}
                />
                <select
                  id="eventCategory"
                  name="eventCategory"
                  value={event.eventCategoryId}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 appearance-none cursor-pointer"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="space-y-6 flex flex-col">
              <span className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1">
                Ticket Details
              </span>

              <div className="space-y-6 bg-gray-50 border-gray-300 border-2 flex-grow p-4 rounded-md ">
                {/* isFree */}
                <div className="flex items-center gap-3">
                  <label htmlFor="isFree" className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      id="isFree"
                      name="isFree"
                      checked={isFree}
                      onChange={toggleFreeEvent}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-accent-400 relative">
                      <div
                        className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${
                          isFree ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                  <span className="text-sm sm:text-md font-medium text-primary-text-400">
                    Free Event
                  </span>
                </div>

                {/* Ticket Price */}
                <div>
                  <label
                    htmlFor="ticketPrice"
                    className="block text-sm sm:text-md font-medium text-primary-text-400 mb-1"
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
                      value={isFree ? 0 : event.ticketPrice}
                      min={1}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 ${
                        isFree ? "cursor-not-allowed" : ""
                      }`}
                      placeholder="Enter ticket price"
                      required
                      disabled={isFree}
                    />
                  </div>
                </div>

                {/* Available Tickets */}
                <div>
                  <label
                    htmlFor="availableTickets"
                    className="block text-sm sm:text-md font-medium text-primary-text-400 mb-1"
                  >
                    Number of available tickets
                  </label>
                  <div className="relative">
                    <Ticket
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-text-400"
                      size={18}
                    />
                    <input
                      type="number"
                      id="availableTickets"
                      name="availableTickets"
                      value={
                        event.ticketPrice === 0 || isFree
                          ? ""
                          : event.availableTickets
                      }
                      min={1}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 ${
                        event.ticketPrice === 0 || isFree
                          ? "cursor-not-allowed"
                          : ""
                      }`}
                      placeholder="Enter number of tickets"
                      required
                      disabled={event.ticketPrice === 0 || isFree}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* image dropdown */}
            <div>
              <label
                htmlFor="eventImage"
                className="block text-md sm:text-lg font-medium text-primary-text-400 mb-1"
              >
                Event Image
              </label>
              <div className="bg-gray-100 w-full h-60 flex justify-center items-center rounded-md">
                <ImageDragDrop
                  dataUrl={event.imgSrc}
                  onChange={handleImageChange}
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
              rounded-md focus:outline-none focus:ring-1 focus:ring-accent-400 min-h-60`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-accent-500 text-accent-btn-text py-3 px-4 rounded-md hover:bg-accent-400 transition duration-300 font-semibold cursor-pointer"
            >
              {isEditing ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EventForm;
