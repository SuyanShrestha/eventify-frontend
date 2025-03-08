import { format } from "date-fns";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: format(date, "MMM d, yyyy"),
    time: format(date, "h:mm a"),
  };
};

// for datetime input compatible format
const formatDateToInputFormat = (dateString: string) => {
  const dateObj = new Date(dateString);
  return format(dateObj, "yyyy-MM-dd'T'HH:mm");
};

export { formatDateTime, formatDateToInputFormat };
