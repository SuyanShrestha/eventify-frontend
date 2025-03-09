import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-500 text-primary-text-500 py-2 bg-fixed bg-background-image">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-2">
          <p
            className="text-sm border-t-2 border-accent-500 pt-2 px-8 tracking-wider "
            style={{ wordSpacing: "2px" }}
          >
            Copyright © 2025 Eventify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
