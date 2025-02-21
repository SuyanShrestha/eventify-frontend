import type React from "react"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-accent-500 text-3xl font-extrabold font-['Playfair_Display']">
              Eventify
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-secondary-500 hover:bg-secondary-500 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="text-secondary-500 hover:bg-secondary-500 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors duration-300"
              >
                Explore
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to="/login"
                className="bg-secondary-500 text-white hover:bg-accent-500 px-4 py-2 rounded-md text-md font-medium mr-2 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-accent-500 text-white hover:bg-secondary-500 px-4 py-2 rounded-md text-md font-medium transition-colors duration-300"
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

