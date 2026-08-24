import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkExpired } from "../helpers";
import { Event } from "../constants";
interface FilterState {
  date: string; // 'today', 'tomorrow', 'this-week', 'this-month'
  type: string; // 'online', 'physical'
  price: string; // 'free', 'paid'
  expirationStatus: string;
  eventCategoryId: string;
  isSavedFilter: boolean;
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
    expirationStatus: "",
    eventCategoryId: "",
    isSavedFilter: false,
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

const filterByCategory = (event: Event, eventCategoryId: string): boolean => {
  return eventCategoryId ? event.eventCategoryId === eventCategoryId : true;
};

const filterByStatus = (event: Event, expirationStatus: string): boolean => {
  if (!expirationStatus) return true;
  const isExpired = checkExpired(event.endDate, event.bookingDeadline);

  return expirationStatus === "expired" ? isExpired : !isExpired;
};

const filterBySearchTerm = (event: Event, searchTerm: string): boolean => {
  return event.title.toLowerCase().includes(searchTerm.toLowerCase());
};

const filterBySaved = (event: Event, isSavedFilter: boolean): boolean => {
  return isSavedFilter ? event.isSaved : true;
};

// main filter function to apply all filters
const applyFilters = (
  events: Event[],
  filters: FilterState,
  searchTerm: string,
): Event[] => {
  const filtered = events.filter((event) => {
    const { date, type, price, expirationStatus, eventCategoryId, isSavedFilter } = filters;

    return (
      filterByDate(event, date) &&
      filterByType(event, type) &&
      filterByPrice(event, price) &&
      filterByStatus(event, expirationStatus) &&
      filterByCategory(event, eventCategoryId) &&
      filterBySearchTerm(event, searchTerm) &&
      filterBySaved(event, isSavedFilter)
    );
  });

  return filtered;
};

const sortEvents = (
  events: Event[]
): { upcomingEvents: Event[]; expiredEvents: Event[] } => {
  const upcomingEvents = events
    .filter((event) => !checkExpired(event.endDate, event.bookingDeadline))
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  const expiredEvents = events
    .filter((event) => checkExpired(event.endDate, event.bookingDeadline))
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  return { upcomingEvents, expiredEvents };
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setUnfilteredEvents: (state, action: PayloadAction<Event[]>) => {
      const allEvents = action.payload;
      const { upcomingEvents, expiredEvents } = sortEvents(allEvents);

      state.events = [...upcomingEvents, ...expiredEvents];
    },

    setEvents: (state, action: PayloadAction<Event[]>) => {
      const allEvents = action.payload;
      const { upcomingEvents, expiredEvents } = sortEvents(allEvents);

      state.events = [...upcomingEvents, ...expiredEvents];
      state.filteredEvents = [...upcomingEvents, ...expiredEvents];
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
      state.filters = {
        date: "",
        type: "",
        price: "",
        expirationStatus: "",
        eventCategoryId: "",
        isSavedFilter: false,
      };
      state.searchTerm = "";
      state.filteredEvents = state.events;
    },
  },
});

export const { setEvents, setFilters, setSearchTerm, clearFilters } =
  eventSlice.actions;

export default eventSlice.reducer;
