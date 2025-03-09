import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import eventReducer from "./eventSlice";
import usersReducer from "./usersSlice";
import bookingsReducer from "./bookingSlice";
import categoriesReducer from "./categorySlice";
import notificationReducer from "./notificationSlice";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["events"],
  blacklist: ["auth", "events", "users"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  users: usersReducer,
  bookings: bookingsReducer,
  categories: categoriesReducer,
  notifications: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
