export const enum RoutingLinks {
  Home = "/",
  Events = "/events",
  CreateEvent = "/create",
  Dashboard = "/dashboard",
  Login = "/login",
  Signup = "/signup",
}

export const getEventDetailRoute = (eventId: string | number) =>
  `/events/${eventId}`;
