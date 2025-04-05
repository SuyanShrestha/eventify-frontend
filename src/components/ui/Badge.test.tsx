import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import '@testing-library/jest-dom';

describe('Badge Component', () => {
  it('renders correctly with children', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<Badge className="bg-red-500">Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toHaveClass('bg-red-500');
  });

  it('has default styles and renders correctly', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    
    expect(badge).toHaveClass('px-3 py-1 text-sm font-semibold rounded-full');
    expect(badge).toHaveClass('flex justify-between items-center gap-2');
    expect(badge).toHaveClass('bg-gray-200 text-gray-800');
  });
});
