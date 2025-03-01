import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id: number;
  title: string;
  subtitle: string;
  hostname: string;
  startDate: string;
  endDate: string;
  details: string;
  ticketPrice: number;
  eventType: string;
  venue: string;
  imgSrc: string;
}

interface FilterState {
  date: string; // 'today', 'tomorrow', 'this-week', 'this-month'
  type: string; // 'online', 'physical'
  price: string; // 'free', 'paid'
}

interface EventState {
  events: Event[];
  filteredEvents: Event[];
  filters: FilterState;
  searchTerm: string;
}

const initialState: EventState = {
  events: [],
  filteredEvents: [],
  filters: {
    date: "",
    type: "",
    price: "",
  },
  searchTerm: "",
};

const filterByDate = (event: Event, date: string): boolean => {
  const eventStartDate = new Date(event.startDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  switch (date) {
    case "today":
      return eventStartDate.toDateString() === today.toDateString();
    case "tomorrow":
      return eventStartDate.toDateString() === tomorrow.toDateString();

    case "this-week": {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return eventStartDate >= startOfWeek && eventStartDate <= endOfWeek;
    }

    case "this-month":
      return eventStartDate.getMonth() === today.getMonth();
    default:
      return true;
  }
};

const filterByType = (event: Event, type: string): boolean => {
  return type ? event.eventType === type : true;
};

const filterByPrice = (event: Event, price: string): boolean => {
  if (price === "free") return event.ticketPrice === 0;
  if (price === "paid") return event.ticketPrice > 0;
  return true;
};

const filterBySearchTerm = (event: Event, searchTerm: string): boolean => {
  return event.title.toLowerCase().includes(searchTerm.toLowerCase());
};

// Main filter function to apply all filters
const applyFilters = (
  events: Event[],
  filters: FilterState,
  searchTerm: string
): Event[] => {
  const filtered = events.filter((event) => {
    const { date, type, price } = filters;

    return (
      filterByDate(event, date) &&
      filterByType(event, type) &&
      filterByPrice(event, price) &&
      filterBySearchTerm(event, searchTerm)
    );
  });

  console.log("filtered: ", filtered);
  return filtered;
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      state.filteredEvents = action.payload; // No filtering initially
    },

    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredEvents = applyFilters(
        state.events,
        state.filters,
        state.searchTerm
      );
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredEvents = applyFilters(
        state.events,
        state.filters,
        state.searchTerm
      );
    },

    clearFilters: (state) => {
      state.filters = { date: "", type: "", price: "" };
      state.searchTerm = "";
      state.filteredEvents = state.events;
    },
  },
});

export const { setEvents, setFilters, setSearchTerm, clearFilters } =
  eventSlice.actions;

export default eventSlice.reducer;
