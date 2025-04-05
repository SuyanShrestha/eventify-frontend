import { truncateText } from "./truncateText";

describe("truncateText", () => {
    it("should truncate text without preserving words when the char limit is exceeded", () => {
      const result = truncateText("This is a long sentence", 10);
      expect(result).toBe("This is a...");
    });
  
    it("should truncate text and preserve the last complete word when preserveWords is true", () => {
      const result = truncateText("This is a long sentence", 10, "...", true);
      expect(result).toBe("This is...");
    });
  
    it("should not truncate text if it's shorter than the char limit", () => {
      const result = truncateText("Short text", 20);
      expect(result).toBe("Short text");
    });
  
    it("should handle edge case with a text equal to the char limit", () => {
      const result = truncateText("Exactly ten", 11);
      expect(result).toBe("Exactly ten");
    });
  
    it("should handle edge case with a char limit of zero", () => {
      const result = truncateText("Some text", 0);
      expect(result).toBe("...");
    });
  
    it("should use the default spread '...' when no custom spread is provided", () => {
      const result = truncateText("This is a long sentence", 10);
      expect(result).toBe("This is a...");
    });
  
    it("should use a custom spread when provided", () => {
      const result = truncateText("This is a long sentence", 10, "***");
      expect(result).toBe("This is a***");
    });
  
    it("should preserve words when the char limit is at a word boundary", () => {
      const result = truncateText("This is a long sentence", 14, "...", true);
      expect(result).toBe("This is a...");
    });
  });
  