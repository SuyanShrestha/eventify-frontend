import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QrScanModal from "./QrScanModal";
import axios from "axios";
import { toast } from "sonner";

// Mocking Axios and Toast
vi.mock("axios");
vi.mock("sonner");

// Mock QRScanner component
vi.mock("@yudiel/react-qr-scanner", () => ({
  Scanner: ({ onScan, paused }: any) => (
    <div
      onClick={() => onScan([{ rawValue: "sample-ticket-code" }])}
      data-testid="scanner"
    >
      {paused ? "Scanner Paused" : "Scanner Active"}
    </div>
  ),
}));

// Mock ModalSheet
vi.mock("../ui", () => ({
  ModalSheet: ({ children }: any) => (
    <div data-testid="modal-sheet">{children}</div>
  ),
}));

describe("QrScanModal", () => {
  const mockOnClose = vi.fn();

  it("renders the modal when open", () => {
    render(<QrScanModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByTestId("modal-sheet")).toBeInTheDocument();
    expect(screen.getByText("Ticket QR code")).toBeInTheDocument();
  });

  it("starts QR scan process and processes the data", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        detail: "Ticket checked-in successfully",
        ticket_info: {
          event_name: "React Conference 2025",
          ticket_code: "sample-ticket-code",
          ticket_quantity: 1,
          ticket_status: "valid",
          purchase_date: "2025-04-06T10:00:00Z",
          attendee_name: "John Doe",
          check_in_time: "2025-04-06T11:00:00Z",
        },
      },
    });

    render(<QrScanModal isOpen={true} onClose={mockOnClose} />);

    await act(async () => {
      fireEvent.click(screen.getByTestId("scanner"));
    });
    await waitFor(() => screen.getByText("Ticket checked-in successfully"));

    expect(screen.getByText("React Conference 2025")).toBeInTheDocument();
    expect(screen.getByText("Attendee:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Ticket Code:")).toBeInTheDocument();
    expect(screen.getByText("sample-ticket-code")).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith(
      "Ticket checked-in successfully"
    );
  });

  it("displays error message when API call fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<QrScanModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId("scanner"));
  });

  it("can scan another ticket and reset the state", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        detail: "Ticket checked-in successfully",
        ticket_info: {
          event_name: "React Conference 2025",
          ticket_code: "sample-ticket-code",
          ticket_quantity: 1,
          ticket_status: "valid",
          purchase_date: "2025-04-06T10:00:00Z",
          attendee_name: "John Doe",
          check_in_time: "2025-04-06T11:00:00Z",
        },
      },
    });

    render(<QrScanModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId("scanner"));

    await waitFor(() => screen.getByText("Ticket checked-in successfully"));

    fireEvent.click(screen.getByText("Scan Another"));

    expect(
      screen.queryByText("Ticket checked-in successfully")
    ).not.toBeInTheDocument();
  });
});
