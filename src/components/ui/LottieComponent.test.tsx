import React from 'react';
import { render } from '@testing-library/react';
import LottieComponent from './LottieComponent';

vi.mock('lottie-react', () => ({
  __esModule: true,
  default: ({ animationData, loop, autoplay, style }: any) => (
    <div data-testid="lottie-mock" data-animation={JSON.stringify(animationData)} data-loop={loop} data-autoplay={autoplay} style={style} />
  ),
}));

describe('LottieComponent', () => {
  const mockAnimationData = { some: 'animation-data' };

  it('renders the Lottie component with provided animation data', () => {
    const { getByTestId } = render(<LottieComponent animationData={mockAnimationData} />);
    const lottie = getByTestId('lottie-mock');

    expect(lottie).toBeInTheDocument();
    expect(lottie.getAttribute('data-animation')).toBe(JSON.stringify(mockAnimationData));
    expect(lottie.getAttribute('data-loop')).toBe('true');
    expect(lottie.getAttribute('data-autoplay')).toBe('true');
  });

  it('applies the default height when height prop is not provided', () => {
    const { getByTestId } = render(<LottieComponent animationData={mockAnimationData} />);
    const lottie = getByTestId('lottie-mock');
    expect(lottie).toHaveStyle({ height: '350px' });
  });

  it('applies the custom height when height prop is provided', () => {
    const { getByTestId } = render(<LottieComponent animationData={mockAnimationData} height={500} />);
    const lottie = getByTestId('lottie-mock');
    expect(lottie).toHaveStyle({ height: '500px' });
  });
});
