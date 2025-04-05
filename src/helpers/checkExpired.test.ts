import { checkExpired } from "./checkExpired";

describe("checkExpired", () => {
  it("should return true if current date is after the end date", () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    const result = checkExpired(endDate.toISOString());
    expect(result).toBe(true);
  });

  it("should return false if current date is before the end date", () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const result = checkExpired(endDate.toISOString());
    expect(result).toBe(false);
  });

  it("should return true if current date is after the booking deadline", () => {
    const endDate = new Date();
    const bookingDeadline = new Date();
    bookingDeadline.setDate(bookingDeadline.getDate() - 1);
    const result = checkExpired(endDate.toISOString(), bookingDeadline.toISOString());
    expect(result).toBe(true);
  });

  it("should return false if current date is before the booking deadline", () => {
    const endDate = new Date();
    const bookingDeadline = new Date();
    bookingDeadline.setDate(bookingDeadline.getDate() + 1);
    const result = checkExpired(endDate.toISOString(), bookingDeadline.toISOString());
    expect(result).toBe(false);
  });

  it("should return true if booking deadline is not provided and current date is after the end date", () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    const result = checkExpired(endDate.toISOString());
    expect(result).toBe(true);
  });

  it("should return false if booking deadline is not provided and current date is before the end date", () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const result = checkExpired(endDate.toISOString());
    expect(result).toBe(false);
  });

  it("should return false if the end date and booking deadline are both in the future and current date is before them", () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    const bookingDeadline = new Date();
    bookingDeadline.setDate(bookingDeadline.getDate() + 2); 
    const result = checkExpired(endDate.toISOString(), bookingDeadline.toISOString());
    expect(result).toBe(false);
  });
});
