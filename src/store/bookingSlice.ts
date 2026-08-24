import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "../constants";

interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
  },
});

export const { setBookings, addBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
