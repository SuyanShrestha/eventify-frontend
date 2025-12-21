import React, { useEffect, useState } from "react";
import { ModalSheet } from "../ui";
import { RoutingLinks } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { toast } from "react-toastify";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const isSmallest = useMediaQuery({ maxWidth: 475 });
  const isSmaller = useMediaQuery({ minWidth: 476, maxWidth: 767 });
  const router = useNavigate()
  const [loggedIn,setLoggedIn] = useState(false)

  
  const fetchUser = async()=>{
    if(typeof window === undefined) return
    try{
      const response = await axios.get('http://localhost:8090/api/user/profile/',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('eventify-token')}`
        }
      })
      if(response.data){
        setLoggedIn(true)
      }
    }
    catch(err){
      console.log(err)
      setLoggedIn(false)
    }
  }

  useEffect(()=>{
    fetchUser()
  },[localStorage.getItem('eventify-token')])



  return (
    <ModalSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={isSmallest ? [0.5, 0] : isSmaller ? [0.4, 0] : [0.6, 0]}
    >
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-semibold text-primary-text-500 mb-4">
          Welcome to Eventify!
        </h2>
        <p className="text-lg text-primary-text-500 mb-6 text-center">
          {
            loggedIn ? 'From concerts to conferences, find the perfect event for you.' :
            `
          We’re glad to see you again! Please log in to access your events and
          manage your experience.`
          }
        </p>

        <div className="flex flex-col items-center w-full">
          {loggedIn ? 
          <div
            onClick={
              ()=>{
                localStorage.removeItem('eventify-token')
                localStorage.removeItem('eventify-refresh')
                router('/login')
                toast.success('Logged Out')
                onClose()
              }
            }
            className="bg-[var(--color-accent-300)] text-white hover:bg-[var(--color-accent-500)] px-6 py-3 rounded-md text-lg font-medium mb-4 transition-colors duration-300 w-full text-center"
          >
            Log Out
          </div>:
          
          <>
          <Link
            to={RoutingLinks.Login}
            onClick={onClose}
            className="bg-[var(--color-accent-300)] text-white hover:bg-[var(--color-accent-500)] px-6 py-3 rounded-md text-lg font-medium mb-4 transition-colors duration-300 w-full text-center"
          >
            Log In
          </Link>

          <Link
            to={RoutingLinks.Register}
            onClick={onClose}
            className="bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-300)] px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300 w-full text-center"
          >
            Register
          </Link>
          </>
          }
        </div>
      </div>
    </ModalSheet>
  );
};
export default AuthModal;
