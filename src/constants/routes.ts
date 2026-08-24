export const enum RoutingLinks {
  Home = "/",
  Events = "/events",
  CreateEvent = "/create",
  Dashboard = "/dashboard",
  Bookings = "/bookings",
  Login = "/login",
  Register = "/register",
}

export const getEventDetailRoute = (eventId: string | number) =>
  `/events/${eventId}`;

export const getEditEventRoute = (eventId: string | number) =>
  `/edit/${eventId}`;
