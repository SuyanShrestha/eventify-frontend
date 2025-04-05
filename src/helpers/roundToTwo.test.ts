import { roundToTwo } from "./roundToTwo";

describe("roundToTwo", () => {
    it("should round a number to two decimal places", () => {
      expect(roundToTwo(1.2345)).toBe(1.23);
    });
  
    it("should round a number down if the third decimal is less than 5", () => {
      expect(roundToTwo(2.345)).toBe(2.35);
    });
  
    it("should round a number up if the third decimal is 5 or more", () => {
      expect(roundToTwo(3.456)).toBe(3.46);
    });
  
    it("should return the same number if it has already two decimal places", () => {
      expect(roundToTwo(4.56)).toBe(4.56);
    });
  
    it("should handle zero correctly", () => {
      expect(roundToTwo(0)).toBe(0);
    });
  
    it("should handle negative numbers correctly", () => {
      expect(roundToTwo(-1.2345)).toBe(-1.23);
      expect(roundToTwo(-2.345)).toBe(-2.35);
      expect(roundToTwo(-3.456)).toBe(-3.46);
    });
  });
  