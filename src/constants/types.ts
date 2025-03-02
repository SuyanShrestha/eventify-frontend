export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

export interface UsersState {
  users: User[];
}

export interface Attendee {
  attendeeId: string;
  isCheckedIn: boolean;
}

export interface Event {
  id: number;
  title: string;
  subtitle: string;
  organizerId: string;
  startDate: string;
  endDate: string;
  bookingDeadline?: string;
  details: string;
  ticketPrice: number;
  eventType: string;
  venue: string;
  imgSrc: string;
  attendees: Attendee[];
}

export interface Booking {
  bookingId: string;
  eventId: number;
  userId: string;
  bookingCreated: string;
}
