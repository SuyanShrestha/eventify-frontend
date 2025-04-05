import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import useFetchUsers from './useFetchUsers.ts';
import { setUsers } from '../store/usersSlice';
import { usersData } from '../constants/data';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../store/usersSlice', () => ({
  setUsers: vi.fn(),
}));

describe('useFetchUsers', () => {
  it('should dispatch setUsers with usersData', async () => {
    const mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    renderHook(() => useFetchUsers());

    await new Promise((resolve) => setImmediate(resolve));

    expect(mockDispatch).toHaveBeenCalledWith(setUsers(usersData));
  });
});
