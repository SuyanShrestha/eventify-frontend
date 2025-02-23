import type React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutingLinks } from "../constants";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-secondary-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to={RoutingLinks.Home}
              className="text-accent-text-500 text-3xl font-extrabold font-['Playfair_Display']"
            >
              Eventify
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to={RoutingLinks.Home}
                className={`px-3 py-2 text-lg transition-colors duration-300 ${
                  location.pathname === RoutingLinks.Home
                    ? "text-accent-500"
                    : "text-primary-text-500 hover:text-secondary-text-500"
                }`}
              >
                Home
              </Link>
              <Link
                to={RoutingLinks.Explore}
                className={`px-3 py-2 text-lg transition-colors duration-300 ${
                  location.pathname === RoutingLinks.Explore
                    ? "text-accent-500"
                    : "text-primary-text-500 hover:text-secondary-text-500"
                }`}
              >
                Explore
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to={RoutingLinks.Login}
                className="bg-[var(--color-accent-400)] text-white hover:bg-[var(--color-primary-400)] px-4 py-2 rounded-md text-lg font-medium mr-2 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to={RoutingLinks.Signup}
                className="bg-[var(--color-primary-400)] text-white hover:bg-[var(--color-accent-400)] px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
