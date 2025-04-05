import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('updates after delay', async () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'a' },
    });

    rerender({ val: 'b' });

    expect(result.current).toBe('a');

    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });

    expect(result.current).toBe('b');
  });

  it('does not change immediately when passed null', async () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: null },
    });

    expect(result.current).toBe(null);

    rerender({ val: 'newValue' });

    expect(result.current).toBe(null);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });

    expect(result.current).toBe('newValue');
  });

});
