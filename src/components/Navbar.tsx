import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Bell, User, Menu, X } from "../assets/icons";
import { RoutingLinks } from "../constants";
import { AuthModal, NotificationModal } from "./home";
import { SlidingMenu } from "./ui";

const Navbar: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const openAuthModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsAuthModalOpen(true);
  };

  const openNotificationModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsNotificationModalOpen(true);
  };

  return (
    <header className="bg-secondary-500 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to={RoutingLinks.Home}
              className="text-accent-text-500 text-3xl font-extrabold"
            >
              Eventify
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 lg:space-x-4">
              {[
                { name: "Home", path: RoutingLinks.Home },
                { name: "Explore", path: RoutingLinks.Events },
                { name: "Bookings", path: RoutingLinks.Bookings },
                { name: "Create", path: RoutingLinks.CreateEvent },
                { name: "Dashboard", path: RoutingLinks.Dashboard },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`lg:px-3 py-2 text-lg transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-accent-500"
                      : "text-primary-text-500 hover:text-secondary-text-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="cursor-pointer" onClick={openNotificationModal}>
              <Bell className="h-6 w-6 text-accent-500" />
            </button>
            <button className="cursor-pointer" onClick={openAuthModal}>
              <User className="h-6 w-6 text-accent-500" />
            </button>
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-accent-500" />
            </button>
          </div>
        </div>
      </div>

      {/* for responsive */}
      <SlidingMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <X className="h-6 w-6 text-primary-text-500" />
        </button>

        <nav className="mt-16 flex flex-col items-start p-6 space-y-6">
          {[
            { name: "Home", path: RoutingLinks.Home },
            { name: "Explore", path: RoutingLinks.Events },
            { name: "Bookings", path: RoutingLinks.Bookings },
            { name: "Create", path: RoutingLinks.CreateEvent },
            { name: "Dashboard", path: RoutingLinks.Dashboard },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block text-lg transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-accent-500"
                  : "text-primary-text-500 hover:text-secondary-text-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SlidingMenu>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
