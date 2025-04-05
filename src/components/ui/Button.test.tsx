import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies default background and text color', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('text-primary-text-500');
  });

  it('applies custom background and text color', () => {
    render(<Button bgColor="bg-blue-500" textColor="text-white">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('bg-blue-500');
    expect(button).toHaveClass('text-white');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('custom-class');
  });

  it('handles click event', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
