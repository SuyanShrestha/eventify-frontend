import type React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";

const App: React.FC = () => {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  return (
    <Router>
      {/* Conditional layout rendering based on the route states */}
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
