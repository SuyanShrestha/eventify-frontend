import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Ticket,
  Option,
  Calendar,
  CircleX,
  Timer,
  Tag,
  LayoutList,
  X,
} from "../../assets/icons";
import { Tabs } from "../ui";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

interface SidebarProps {
  onFilterChange?: (filters: any) => void;
}

interface FilterState {
  price: string | null;
  date: string | null;
  type: string | null;
  expirationStatus: string | null;
  eventCategoryId: string | null;
}

const SIDEBAR_CATEGORIES = [
  {
    label: "Price",
    icon: <Ticket className="w-6 h-6 text-secondary-text-500" />,
    options: [
      { label: "Free", value: "free" },
      { label: "Paid", value: "paid" },
    ],
  },
  // {
  //   label: "Date",
  //   icon: <Calendar className="w-6 h-6 text-secondary-text-500" />,
  //   options: [
  //     { label: "Today", value: "today" },
  //     { label: "Tomorrow", value: "tomorrow" },
  //     { label: "This week", value: "this-week" },
  //     { label: "This month", value: "this-month" },
  //   ],
  // },
  {
    label: "Platform",
    icon: <Tag className="w-6 h-6 text-secondary-text-500" />,
    options: [
      { label: "Physical", value: "physical" },
      { label: "Remote", value: "remote" },
    ],
  },
  {
    label: "Status",
    icon: <Timer className="w-6 h-6 text-secondary-text-500" />,
    options: [
      { label: "Upcoming", value: "upcoming" },
      { label: "Expired", value: "expired" },
    ],
  },
];

// Map category labels to filter state keys
const CATEGORY_MAPPER: Record<string, keyof FilterState> = {
  Price: "price",
  Date: "date",
  Platform: "type",
  Status: "expirationStatus",
  Categories: "eventCategoryId",
};

const eventScopeOptions = ["All", "Saved"];

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    price: null,
    date: null,
    type: null,
    expirationStatus: null,
    eventCategoryId: null,
  });
  const [activeScope, setActiveScope] = useState<string>("All");

  // Mock event categories from the provided API response
  const [eventCategories, setEventCategories] = useState([]);

  useEffect(() => {
    const fetchEventCategories = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/events/categories/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("eventify-token")}`,
          },
        }
      );
      setEventCategories(response.data);
    };
    fetchEventCategories();
  }, []);

  const sidebarCategories = [
    ...SIDEBAR_CATEGORIES,
    ...(eventCategories.length > 0
      ? [
          {
            label: "Categories",
            icon: <LayoutList className="w-6 h-6 text-secondary-text-500" />,
            options: eventCategories.map((category) => ({
              label: category.name,
              value: category.id,
            })),
          },
        ]
      : []),
  ];

  const handleClearFilter = (category: keyof FilterState) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [category]: null,
    }));

    if (onFilterChange) {
      const updatedFilters = {
        ...selectedFilters,
        [category]: null,
        isSavedFilter: activeScope === "Saved",
      };
      onFilterChange(updatedFilters);
    }
  };

  const OptionItem = ({
    label,
    value,
    selectedValue,
    onSelect,
    onClear,
  }: {
    label: string;
    value: string | number;
    selectedValue: string | null;
    onSelect: (value: string | number) => void;
    onClear: () => void;
  }) => {
    const isSelected = selectedValue === value.toString();

    return (
      <div className="flex justify-between items-center">
        <div
          className={`flex gap-4 justify-start items-center cursor-pointer ${
            isSelected ? "text-secondary-text-500" : ""
          }`}
          onClick={() => onSelect(value)}
        >
          <Option
            className={`w-5 h-5 ${isSelected ? "text-secondary-text-500" : ""}`}
          />
          <span className={`text-md ${isSelected ? "font-bold" : ""}`}>
            {label}
          </span>
        </div>

        {isSelected && (
          <button
            className="ml-auto text-secondary-text-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            <CircleX className="w-5 h-5 font-bold" />
          </button>
        )}
      </div>
    );
  };

  const handleSelectFilter = (
    category: keyof FilterState,
    value: string | number
  ) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [category]: value.toString(),
    }));

    // Notify parent component of filter changes if callback provided
    if (onFilterChange) {
      const updatedFilters = {
        ...selectedFilters,
        [category]: value.toString(),
        isSavedFilter: activeScope === "Saved",
      };
      onFilterChange(updatedFilters);
    }
  };

  // Wrapper function to match expected type for Tabs component
  const handleScopeChangeWrapper: Dispatch<SetStateAction<string>> = (
    value
  ) => {
    // Handle both function and direct value updates
    const newScope = typeof value === "function" ? value(activeScope) : value;

    setActiveScope(newScope);

    // Notify parent component of saved filter change if callback provided
    if (onFilterChange) {
      const updatedFilters = {
        ...selectedFilters,
        isSavedFilter: newScope === "Saved",
      };
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className="mx-4 py-2 h-[calc(100vh-4rem)] flex flex-col gap-4 overflow-y-auto custom-scrollbar">
      <div className="w-full flex justify-between items-center ">
        <h1 className="text-2xl py-4 text-secondary-text-500 font-bold">
          Events Category
        </h1>
        {/* {isSmallScreen && (
          <button
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen?.(false)}
          >
            <X className="h-6 w-6 text-secondary-text-500" />
          </button>
        )} */}
      </div>

      <div>
        <Tabs
          options={eventScopeOptions}
          activeTab={activeScope}
          setActiveTab={handleScopeChangeWrapper}
        />
      </div>

      {sidebarCategories.map((category) => {
        const categoryKey = CATEGORY_MAPPER[category.label];

        return (
          <div className="p-4 flex flex-col gap-4" key={category.label}>
            <div className="flex gap-4 justify-start items-center">
              {category.icon}
              <h3 className="text-xl text-secondary-text-500 font-semibold">
                {category.label}
              </h3>
            </div>

            <div className="flex flex-col pl-8 gap-4">
              {category.options.map((option) => (
                <OptionItem
                  key={option.value.toString()}
                  label={option.label}
                  value={option.value}
                  selectedValue={
                    categoryKey ? selectedFilters[categoryKey] : null
                  }
                  onSelect={(value) =>
                    categoryKey && handleSelectFilter(categoryKey, value)
                  }
                  onClear={() => categoryKey && handleClearFilter(categoryKey)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
