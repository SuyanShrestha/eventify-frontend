import { render, screen, fireEvent, act } from '@testing-library/react';
import CarouselComponent from './Carousel';
import { waitFor } from '@testing-library/react';

const mockCards = [
  { key: '1', content: <div>Card 1</div> },
  { key: '2', content: <div>Card 2</div> },
  { key: '3', content: <div>Card 3</div> },
];

describe('CarouselComponent', () => {
  it('renders the carousel with the provided cards', () => {
    render(
      <CarouselComponent
        cards={mockCards}
        offset={2}
        showArrows={true}
      />
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
  });

  it('changes slide when a card is clicked', async () => {
    render(
      <CarouselComponent
        cards={mockCards}
        offset={2}
        showArrows={true}
      />
    );

    const card = screen.getByText('Card 1');
    fireEvent.click(card);

    await waitFor(() => {
      expect(screen.getByText('Card 1')).toBeInTheDocument();
    });
  });

  it('auto-scrolls through the slides after a set interval', async () => {
    vi.useFakeTimers();

    render(
      <CarouselComponent
        cards={mockCards}
        offset={2}
        showArrows={true}
        autoScrollInterval={2000}
      />
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000); 
    });

    expect(screen.getByText('Card 2')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // After another interval, the third card should be visible
    expect(screen.getByText('Card 3')).toBeInTheDocument();

    // Cleanup timers after the test
    vi.useRealTimers();
  });

  it('resets auto-scroll timer when slide is manually changed', () => {
    vi.useFakeTimers();

    render(
      <CarouselComponent
        cards={mockCards}
        offset={2}
        showArrows={true}
        autoScrollInterval={2000}
      />
    );

    const card = screen.getByText('Card 2');
    fireEvent.click(card);

    act(() => {
      vi.advanceTimersByTime(2000); 
    });

    expect(screen.getByText('Card 2')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
