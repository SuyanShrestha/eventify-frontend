import { renderHook } from '@testing-library/react';
import { useToast } from './useToast';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: vi.fn(),
}));

describe('useToast', () => {
  it('should show a single toast message with default error type', () => {
    const { result } = renderHook(() => useToast());

    result.current.showToast(['Test message']);

    expect(toast).toHaveBeenCalledWith('Test message', expect.objectContaining({
      type: 'error',
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }));
  });

  it('should show multiple toast messages', () => {
    const { result } = renderHook(() => useToast());

    result.current.showToast(['Message 1', 'Message 2']);

    expect(toast).toHaveBeenCalledTimes(3);
    expect(toast).toHaveBeenCalledWith('Message 1', expect.any(Object));
    expect(toast).toHaveBeenCalledWith('Message 2', expect.any(Object));
  });

  it('should show a success toast when type is "success"', () => {
    const { result } = renderHook(() => useToast());

    result.current.showToast(['Success message'], 'success');

    expect(toast).toHaveBeenCalledWith('Success message', expect.objectContaining({
      type: 'success',
    }));
  });

  it('should show an error toast when type is "error"', () => {
    const { result } = renderHook(() => useToast());

    result.current.showToast(['Error message'], 'error');

    expect(toast).toHaveBeenCalledWith('Error message', expect.objectContaining({
      type: 'error',
    }));
  });
});
