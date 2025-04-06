import React from 'react';
import { render, screen } from '@testing-library/react';
import QrCodeModal from './QrCodeModal';

// Mock QRCodeSVG
vi.mock('qrcode.react', () => ({
  QRCodeSVG: ({ value }: any) => <div data-testid="qr-code" data-value={value} />,
}));

// Mock ModalSheet
vi.mock('../ui', () => ({
  ModalSheet: ({ children }: any) => <div data-testid="modal-sheet">{children}</div>,
}));

describe('QrCodeModal', () => {
  const mockEvent = {
    id: 123,
    title: 'React Conference 2025',
  };

  const bookingId = 'abc-123';

  it('renders the QR modal content when open', () => {
    render(
      <QrCodeModal
        isOpen={true}
        onClose={vi.fn()}
        selectedBookingId={bookingId}
        eventItem={mockEvent}
      />
    );

    expect(screen.getByTestId('modal-sheet')).toBeInTheDocument();
    expect(screen.getByText('Ticket QR code')).toBeInTheDocument();
    expect(screen.getByTestId('qr-code')).toBeInTheDocument();
  });

  it('generates correct QR code data string', () => {
    vi.useFakeTimers().setSystemTime(new Date('2025-04-06T10:00:00Z'));

    render(
      <QrCodeModal
        isOpen={true}
        onClose={vi.fn()}
        selectedBookingId={bookingId}
        eventItem={mockEvent}
      />
    );

    const expectedQRCodeValue =
      `booking_id:abc-123|event_id:123|user_id:1|bookingTimestamp:2025-04-06T10:00:00.000Z`;

    expect(screen.getByTestId('qr-code')).toHaveAttribute('data-value', expectedQRCodeValue);

    vi.useRealTimers();
  });
});
