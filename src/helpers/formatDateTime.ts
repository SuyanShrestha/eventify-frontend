import { format } from "date-fns";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: format(date, "MMM d, yyyy"),
    time: format(date, "h:mm a"),
  };
};

export { formatDateTime };
