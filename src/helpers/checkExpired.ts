const checkExpired = (endDate: string, bookingDeadline?: string): boolean => {
  const currentDate = new Date();
  const parsedBookingDeadline = bookingDeadline
    ? new Date(bookingDeadline)
    : null;
  const parsedEndDate = new Date(endDate);

  return parsedBookingDeadline
    ? currentDate > parsedBookingDeadline
    : currentDate > parsedEndDate;
};

export { checkExpired };
