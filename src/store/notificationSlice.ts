import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../constants";

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
