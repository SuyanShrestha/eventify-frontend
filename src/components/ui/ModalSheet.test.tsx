import { render, screen, fireEvent } from '@testing-library/react';
import ModalSheet from './ModalSheet';
import { vi } from 'vitest';
import { useMediaQuery } from 'react-responsive';

vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(),
}));

describe('ModalSheet', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('should render the modal/sheet when isOpen is true', () => {
    useMediaQuery.mockReturnValueOnce(true); 

    render(<ModalSheet isOpen={true} onClose={onCloseMock}>Content</ModalSheet>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should not render the modal/sheet when isOpen is false', () => {
    useMediaQuery.mockReturnValueOnce(true);

    render(<ModalSheet isOpen={false} onClose={onCloseMock}>Content</ModalSheet>);

    expect(screen.queryByText('Content')).toBeNull();
  });

  it('should not render the cross icon if showCrossIcon is false', () => {
    useMediaQuery.mockReturnValueOnce(false);

    render(
      <ModalSheet isOpen={true} onClose={onCloseMock} showCrossIcon={false}>
        Content
      </ModalSheet>
    );

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should not call onClose when modal content is clicked', () => {
    useMediaQuery.mockReturnValueOnce(true);
  
    render(
      <ModalSheet isOpen={true} onClose={onCloseMock} showCrossIcon={true}>
        Content
      </ModalSheet>
    );
  
    const modalContent = screen.getByText('Content');
    fireEvent.click(modalContent);
  
    expect(onCloseMock).toHaveBeenCalledTimes(0);
  });

  it('should not call onClose when isOpen is false', () => {
    useMediaQuery.mockReturnValueOnce(true);
  
    render(
      <ModalSheet isOpen={false} onClose={onCloseMock} showCrossIcon={true}>
        Content
      </ModalSheet>
    );

    expect(onCloseMock).toHaveBeenCalledTimes(0);
  });
  
  
});
