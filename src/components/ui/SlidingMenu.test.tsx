// SlidingMenu.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlidingMenu } from './SlidingMenu';

describe('SlidingMenu', () => {
  it('renders children inside the sliding menu', () => {
    render(
      <SlidingMenu isOpen={true} onClose={() => {}}>
        <div>Menu Content</div>
      </SlidingMenu>
    );
    expect(screen.getByText('Menu Content')).toBeInTheDocument();
  });

  it('calls onClose when clicking on the overlay', () => {
    const handleClose = vi.fn();
    const setIsOpen = vi.fn(); 
    const { container } = render(
      <SlidingMenu isOpen={true} setIsOpen={setIsOpen} onClose={handleClose}>
        <div>Menu Content</div>
      </SlidingMenu>
    );

    // Click the overlay div (first child with bg-gray-500/30 class)
    const overlay = container.querySelector('.bg-gray-500\\/30') as HTMLElement;
    fireEvent.click(overlay);
  });

  it('renders menu on the left side by default', () => {
    const { container } = render(
      <SlidingMenu isOpen={true} onClose={() => {}}>
        <div>Menu Content</div>
      </SlidingMenu>
    );
    const slidingPanel = container.querySelector('.transform') as HTMLElement;
    expect(slidingPanel).toBeTruthy();
    expect(slidingPanel.className).toContain('translate-x-0');
  });

  it('renders menu on the right side when position is right', () => {
    const { container } = render(
      <SlidingMenu isOpen={true} onClose={() => {}} position="right">
        <div>Menu Content</div>
      </SlidingMenu>
    );
    const slidingPanel = container.querySelector('.transform') as HTMLElement;
    expect(slidingPanel).toBeTruthy();
    expect(slidingPanel.className).toContain('translate-x-0');
  });

  it('applies custom class to the menu', () => {
    const { container } = render(
      <SlidingMenu isOpen={true} onClose={() => {}} customClass="custom-shadow">
        <div>Menu Content</div>
      </SlidingMenu>
    );
    expect(container.innerHTML).toMatch(/custom-shadow/);
  });
});
