import { render, screen } from '@testing-library/react';
import PreLoader from './Preloader';
import { preLoaderAnim } from '../../animations';

vi.mock('../../animations', () => ({
  preLoaderAnim: vi.fn(),
}));

describe('PreLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<PreLoader />);
  });

  it('should render the preloader with the welcome message', () => {
    expect(screen.getByText(/Welcome to Eventify! 🎉/i)).toBeInTheDocument();
  });

  it('should call preLoaderAnim once on render', () => {
    expect(preLoaderAnim).toHaveBeenCalledTimes(1);
  });
});
