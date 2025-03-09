import type React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import { ToastContainer } from "react-toastify";
import { useFetchUsers } from "./hooks";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import { setBookings } from "./store/bookingSlice";
import { bookingsData, categoriesData, notificationsData } from "./constants";
import { setCategories } from "./store/categorySlice";
import { setNotifications } from "./store/notificationSlice";

const App: React.FC = () => {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  const dispatch = useDispatch();

  // only for dummy data
  useFetchUsers();

  useEffect(() => {
    const testUser = {
      username: "Event Master",
      password: "securePass123",
    };
    dispatch(login(testUser));
    dispatch(setBookings(bookingsData));
    dispatch(setCategories(categoriesData));
    dispatch(setNotifications(notificationsData));
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />

      {isAuthRoute ? (
        <AuthLayout />
      ) : isAdminRoute ? (
        <AdminLayout />
      ) : (
        <UserLayout />
      )}
    </Router>
  );
};

export default App;
