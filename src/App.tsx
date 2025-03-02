import type React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import { ToastContainer } from "react-toastify";
import { useFetchUsers } from "./hooks";

const App: React.FC = () => {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useFetchUsers();
  
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
