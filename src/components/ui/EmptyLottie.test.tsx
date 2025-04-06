import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyLottie from './EmptyLottie';

// Mock the imported Lottie file
vi.mock('lottie-react', () => ({
  __esModule: true,
  default: ({ animationData, loop, autoplay, style }: any) => (
    <div
      data-testid="lottie-mock"
      data-animation={JSON.stringify(animationData)}
      data-loop={loop}
      data-autoplay={autoplay}
      style={style}
    />
  ),
}));

// Mock the animation asset import
vi.mock('../../assets/lottie', () => ({
  SearchingLottie2: { mock: 'lottie-animation' },
}));

describe('EmptyLottie', () => {
  it('renders the animation and spanText', () => {
    render(<EmptyLottie spanText="No data found" />);
    const lottie = screen.getByTestId('lottie-mock');
    const span = screen.getByText('No data found');

    expect(lottie).toBeInTheDocument();
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass('text-secondary-text-400 text-xl');
  });

  it('applies the default height if not passed', () => {
    render(<EmptyLottie spanText="Checking..." />);
    const lottie = screen.getByTestId('lottie-mock');
    expect(lottie).toHaveStyle({ height: '350px' });
  });

  it('applies custom height if passed', () => {
    render(<EmptyLottie spanText="Custom Height" height={500} />);
    const lottie = screen.getByTestId('lottie-mock');
    expect(lottie).toHaveStyle({ height: '500px' });
  });
});
