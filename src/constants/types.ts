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

export interface Feedback {
  feedbackId: string;
  userId: string;
  username: string;
  feedbackContent: string;
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
  availableTickets?: number | null;
  eventType: string;
  eventCategoryId: string;
  venue: string;
  imgSrc: string | undefined;
  isSaved: boolean;
  attendees: Attendee[];
  feedbacks: Feedback[];
}

export interface Booking {
  bookingId: string;
  eventId: number;
  userId: string;
  bookingCreated: string;
}

export interface Notification {
  id: number;
  event: number;
  message: string;
  is_read: boolean;
  created_at: string;
}
