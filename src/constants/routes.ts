export const enum RoutingLinks {
  Home = "/",
  Events = "/events",
  Login = "/login",
  Signup = "/signup",
}

export const getEventDetailRoute = (eventId: string | number) =>
  `/events/${eventId}`;
