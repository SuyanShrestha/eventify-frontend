'use client'

import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutingLinks } from "../constants";
import { AuthModal, NotificationModal } from "./home";
import { useEffect, useState } from "react";
import { Bell, User } from "../assets/icons";
import axios from "axios";

const Navbar: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificaitonModalOpen] = useState(false);
  const [isOrganizer,setIsOrganizer] = useState(false)

  
  const fetchUser = async()=>{
    if(typeof window === undefined) return
    try{
      const response = await axios.get('http://localhost:8000/api/user/profile/',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('eventify-token')}`
        }
      })
      if(response.data){
        setIsOrganizer(response.data.is_organizer)
      }
    }
    catch(err){
      console.log(err)
      setIsOrganizer(false)
    }
  }

  useEffect(()=>{
    fetchUser()
  },[localStorage.getItem('eventify-token')])

  const location = useLocation();

  const openAuthModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsAuthModalOpen(true);
  };

  const openNotificationModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsNotificaitonModalOpen(true);
  };


  return (
    <header className="bg-secondary-500 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to={RoutingLinks.Home}
              className="text-accent-text-500 text-3xl font-extrabold "
            >
              Eventify
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 lg:space-x-4">
              <Link
                to={RoutingLinks.Home}
                className={`lg:px-3 py-2 text-lg transition-colors duration-300 ${
                  location.pathname === RoutingLinks.Home
                    ? "text-accent-500"
                    : "text-primary-text-500 hover:text-secondary-text-500"
                }`}
              >
                Home
              </Link>
              <Link
                to={RoutingLinks.Events}
                className={`lg:px-3 py-2 text-lg transition-colors duration-300 ${
                  location.pathname === RoutingLinks.Events
                    ? "text-accent-500"
                    : "text-primary-text-500 hover:text-secondary-text-500"
                }`}
              >
                Explore
              </Link>

              <Link
                to={RoutingLinks.Bookings}
                className={`lg:px-3 py-2 text-lg transition-colors duration-300 ${
                  location.pathname === RoutingLinks.Bookings
                    ? "text-accent-500"
                    : "text-primary-text-500 hover:text-secondary-text-500"
                }`}
              >
                Bookings
              </Link>
            
            {isOrganizer && 
              <Link
                to={RoutingLinks.CreateEvent}
                className={`lg:px-3 py-2 text-lg transition-colors duration-300 ${
                  location.pathname === RoutingLinks.CreateEvent
                    ? "text-accent-500"
                    : "text-primary-text-500 hover:text-secondary-text-500"
                }`}
              >
                Create
              </Link>}

              {isOrganizer && 
              <Link
                to={RoutingLinks.Dashboard}
                className={`lg:px-3 py-2 text-lg transition-colors duration-300 ${
                  location.pathname === RoutingLinks.Dashboard
                    ? "text-accent-500"
                    : "text-primary-text-500 hover:text-secondary-text-500"
                }`}
              >
                Dashboard
              </Link>}
            </div>
          </div>
          <div className="flex gap-4 ml-4 h-full items-center justify-center">
            <button className="cursor-pointer" onClick={openNotificationModal}>
              <Bell className="h-6 w-6 text-accent-500" />
            </button>
            <button className="cursor-pointer" onClick={openAuthModal}>
              <User className="h-6 w-6 text-accent-500" />
            </button>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificaitonModalOpen(false)}
        />
      </div>
    </header>
  );
};

export default Navbar;