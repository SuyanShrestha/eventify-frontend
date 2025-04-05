import { validateEventForm, EventFormInterface } from './validateEventForm'; 
describe("validateEventForm", () => {

  it("should return an error if title is empty", () => {
    const event: EventFormInterface = {
      title: "",
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("Title is required!");
  });

  it("should return an error if title is longer than 50 characters", () => {
    const event: EventFormInterface = {
      title: "A".repeat(51),
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("Title must be less than 50 characters!");
  });

  it("should return an error if subtitle is longer than 50 characters", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "A".repeat(51),
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("Subtitle must be less than 50 characters!");
  });

  it("should return an error if start date is missing", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "",
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("Start Date is required!");
  });

  it("should return an error if start date is in the past", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2024-05-01T00:00:00Z", // In the past
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("Start Date cannot be earlier than the current date!");
  });

  it("should return an error if end date is missing", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("End Date is required!");
  });

  it("should return an error if end date is earlier than or the same as the start date", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2025-05-02T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("End Date must be after Start Date!");
  });

  it("should return an error if venue is empty", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      venue: "",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("Venue is required!");
  });

  it("should return an error if ticket price is negative", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: -10
    };
    const result = validateEventForm(event);
    expect(result).toContain("Ticket Price cannot be negative!");
  });

  it("should return an error if ticket price is not a valid number", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      venue: "Venue",
      ticketPrice: NaN
    };
    const result = validateEventForm(event);
    expect(result).toContain("Ticket Price must be a valid number!");
  });

  it("should return an error if booking deadline is later than the end date", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      bookingDeadline: "2025-05-03T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toContain("Booking Deadline cannot be later than End Date!");
  });

  it("should return no errors if all fields are valid", () => {
    const event: EventFormInterface = {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-02T00:00:00Z",
      bookingDeadline: "2025-05-01T00:00:00Z",
      venue: "Venue",
      ticketPrice: 100
    };
    const result = validateEventForm(event);
    expect(result).toHaveLength(0);
  });

});
