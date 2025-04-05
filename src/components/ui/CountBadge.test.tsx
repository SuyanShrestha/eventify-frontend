import { render, screen } from '@testing-library/react';
import CountBadge from './CountBadge';

describe('CountBadge', () => {
  it('renders the badge when count is greater than 0', () => {
    render(<CountBadge count={5} />);
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
  });

  it('does not render the badge when count is 0', () => {
    render(<CountBadge count={0} />);
    const badge = screen.queryByText('0');
    expect(badge).not.toBeInTheDocument();
  });

  it('applies the default position class', () => {
    render(<CountBadge count={3} />);
    const badge = screen.getByText('3');
    expect(badge).toHaveClass('-top-2 -right-2');
  });

  it('applies a custom position class', () => {
    render(<CountBadge count={3} positionClass="-top-4 -right-4" />);
    const badge = screen.getByText('3');
    expect(badge).toHaveClass('-top-4 -right-4');
  });
});
