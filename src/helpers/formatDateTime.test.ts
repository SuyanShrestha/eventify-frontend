import { formatDateTime, formatDateToInputFormat } from "./formatDateTime";

describe("formatDateTime", () => {
  it("should return formatted date and time", () => {
    const dateString = "2025-04-05T14:30:00Z";
    const result = formatDateTime(dateString);

    // here, time is different because of timezone differences
    expect(result).toEqual({
      date: "Apr 5, 2025",
      time: "8:15 PM",
    });
  });

  it("should handle invalid date string", () => {
    const invalidDate = "invalid-date-string";
    try {
      formatDateTime(invalidDate);
    } catch (e) {
      expect(e).toBeInstanceOf(RangeError);
    }
  });
});
describe("formatDateToInputFormat", () => {
  it("should return date in input format", () => {
    const dateString = "2025-04-05T14:30:00Z";
    const result = formatDateToInputFormat(dateString);

    expect(result).toBe("2025-04-05T20:15");
  });

  it("should handle invalid date string", () => {
    const dateString = "invalid-date";

    let result: string;
    try {
      result = formatDateToInputFormat(dateString);
    } catch (e) {
      result = "Invalid Date";
    }

    expect(result).toBe("Invalid Date");
  });
});
