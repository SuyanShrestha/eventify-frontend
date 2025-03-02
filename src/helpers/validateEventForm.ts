// Define Event type
export interface EventFormInterface {
  title: string;
  subtitle: string;
  startDate?: string;
  endDate?: string;
  bookingDeadline?: string;
  venue: string;
  ticketPrice: number;
}

// Validation Helper Function
export const validateEventForm = (event: EventFormInterface): string[] => {
  let errors: string[] = [];

  if (!event.title.trim()) {
    errors.push("Title is required!");
  } else if (event.title.length > 100) {
    errors.push("Title must be less than 100 characters!");
  }

  if (event.subtitle && event.subtitle.length > 100) {
    errors.push("Subtitle must be less than 100 characters!");
  }

  if (!event.startDate) {
    errors.push("Start Date is required!");
  } else {
    const currentDate = new Date();
    const startDate = new Date(event.startDate);
    if (startDate < currentDate) {
      errors.push("Start Date cannot be earlier than the current date!");
    }
  }

  if (!event.endDate) {
    errors.push("End Date is required!");
  }

  if (
    event.startDate &&
    event.endDate &&
    new Date(event.startDate) >= new Date(event.endDate)
  ) {
    errors.push("End Date must be after Start Date!");
  }

  if (!event.venue.trim()) {
    errors.push("Venue is required!");
  }

  if (event.ticketPrice < 0) {
    errors.push("Ticket Price cannot be negative!");
  }

  if (event.bookingDeadline) {
    const bookingDeadline = new Date(event.bookingDeadline);
    const endDate = new Date(event.endDate!); // endDate is required, so it will exist

    if (bookingDeadline > endDate) {
      errors.push("Booking Deadline cannot be later than End Date!");
    }
  }

  return errors;
};
