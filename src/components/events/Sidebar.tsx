import type React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-[20vw] mt-0 h-full bg-primary-500 border-l-2 border-red-500 z-20 text-white fixed left-0 top-16 bottom-16">
      <h1 className="text-2xl p-4 text-secondary-text-500 text-bold">Explore Sidebar</h1>
    </div>
  );
};

export default Sidebar;
