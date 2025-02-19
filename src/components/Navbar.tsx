import type React from "react"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#F5E6D3] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-[#8E3B46] text-3xl font-extrabold font-['Playfair_Display']">
              Eventify
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-[#D96941] hover:bg-[#D96941] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="text-[#D96941] hover:bg-[#D96941] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Explore
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to="/login"
                className="bg-[#D96941] text-white hover:bg-[#8E3B46] px-4 py-2 rounded-md text-sm font-medium mr-2 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#8E3B46] text-white hover:bg-[#D96941] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

