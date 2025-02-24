export const enum RoutingLinks {
  Home = "/",
  Events = "/events",
  CreateEvent = "/create",
  Login = "/login",
  Signup = "/signup",
}

export const getEventDetailRoute = (eventId: string | number) =>
  `/events/${eventId}`;
