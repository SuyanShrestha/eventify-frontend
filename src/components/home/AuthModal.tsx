import React from "react";
import { ModalSheet } from "../ui";
import { RoutingLinks } from "../../constants";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const isSmallest = useMediaQuery({ maxWidth: 475 });
  const isSmaller = useMediaQuery({ minWidth: 476, maxWidth: 767 });

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
          We’re glad to see you again! Please log in to access your events and
          manage your experience.
        </p>

        <div className="flex flex-col items-center w-full">
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
        </div>
      </div>
    </ModalSheet>
  );
};
export default AuthModal;
