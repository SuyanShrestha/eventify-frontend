export function truncateText(
  text: string,
  charLimit: number,
  spread: string = "...",
  preserveWords: boolean = false
): string {
  if (text.length <= charLimit) return text;

  if (preserveWords) {
    const truncated = text.slice(0, charLimit).trim();
    return truncated.substring(0, truncated.lastIndexOf(" ")) + spread;
  }

  return text.slice(0, charLimit).trim() + spread;
}
