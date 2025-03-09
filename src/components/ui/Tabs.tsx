import React from "react";

interface TabProps {
  options: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs: React.FC<TabProps> = ({ options, activeTab, setActiveTab }) => {
  return (
    <div className="flex w-full">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`flex-1 px-4 py-2 text-sm font-medium border transition-all duration-300 cursor-pointer ${
            activeTab === option
              ? "bg-secondary-text-400 text-white border-accent-500"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
          onClick={() => setActiveTab(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
