import { render, screen } from "@testing-library/react";
import ShareModal from "./ShareModal";

import { useMediaQuery } from "react-responsive";

navigator.clipboard = {
  writeText: vi.fn(),
};

vi.mock("react-responsive", () => ({
  useMediaQuery: vi.fn(),
}));

describe("ShareModal Component", () => {
  it("renders and displays share buttons when modal is open", () => {
    useMediaQuery.mockReturnValue(false);

    render(
      <ShareModal
        isOpen={true}
        onClose={() => {}}
        shareUrl="http://example.com"
      />
    );

    expect(screen.getByText(/Share on Facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/Share on LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByText(/Share on Twitter/i)).toBeInTheDocument();
    expect(screen.getByText(/Share on WhatsApp/i)).toBeInTheDocument();
  });

  it("shows the ShareModal on small screen", () => {
    useMediaQuery.mockReturnValue(true);

    render(
      <ShareModal
        isOpen={true}
        onClose={() => {}}
        shareUrl="http://example.com"
      />
    );

    expect(screen.getByText(/Share this Event/i)).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    render(
      <ShareModal
        isOpen={false}
        onClose={() => {}}
        shareUrl="http://example.com"
      />
    );

    expect(screen.queryByText(/Share this Event/i)).not.toBeInTheDocument();
  });
});
