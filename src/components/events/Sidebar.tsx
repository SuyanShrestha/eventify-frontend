import React, { useState } from "react";
import {
  Ticket,
  Option,
  Calendar,
  CircleX,
  Timer,
  Tag,
} from "../../assets/icons";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/eventSlice";

interface SidebarProps {}

const SIDEBAR_CATEGORIES = [
  {
    label: "Price",
    icon: <Ticket className="w-8 h-8 text-secondary-text-500" />,
    options: [
      { label: "Free", value: "free" },
      { label: "Paid", value: "paid" },
    ],
  },
  {
    label: "Date",
    icon: <Calendar className="w-8 h-8 text-secondary-text-500" />,
    options: [
      { label: "Today", value: "today" },
      { label: "Tomorrow", value: "tomorrow" },
      { label: "This week", value: "this-week" },
      { label: "This month", value: "this-month" },
    ],
  },
  {
    label: "Platform",
    icon: <Tag className="w-8 h-8 text-secondary-text-500" />,
    options: [
      { label: "Physical", value: "physical" },
      { label: "Remote", value: "remote" },
    ],
  },
  {
    label: "Status",
    icon: <Timer className="w-8 h-8 text-secondary-text-500" />,
    options: [
      { label: "Upcoming", value: "upcoming" },
      { label: "Expired", value: "expired" },
    ],
  },
];

const CATEGORY_MAPPER: Record<string, string> = {
  Price: "price",
  Date: "date",
  Platform: "type",
  Status: "expirationStatus",
};

const Sidebar: React.FC<SidebarProps> = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    ticketType: null as string | null,
    eventDate: null as string | null,
    platform: null as string | null,
  });

  const dispatch = useDispatch();

  const handleClearFilter = (category: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [category]: null,
    }));

    dispatch(setFilters({ [category]: "" }));
  };

  const OptionItem = ({
    label,
    value,
    selectedValue,
    onSelect,
    onClear,
  }: {
    label: string;
    value: string;
    selectedValue: string | null;
    onSelect: (value: string) => void;
    onClear: () => void;
  }) => {
    const isSelected = selectedValue === value;

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
          <span className={`text-lg ${isSelected ? "font-bold" : ""}`}>
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

  const handleSelectFilter = (category: string, value: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [category]: value,
    }));
    dispatch(setFilters({ [category]: value }));
  };

  return (
    <div className="mx-4 py-2 h-full flex flex-col">
      <h1 className="text-3xl p-4 text-secondary-text-500 font-bold">
        Events Category
      </h1>

      {SIDEBAR_CATEGORIES.map((category) => (
        <div className="p-4 flex flex-col gap-4" key={category.label}>
          <div className="flex gap-4">
            {category.icon}
            <h3 className="text-2xl text-secondary-text-500 font-semibold">
              {category.label}
            </h3>
          </div>
          <div className="flex flex-col pl-8 gap-4">
            {category.options.map((option) => (
              <OptionItem
                key={option.value}
                label={option.label}
                value={option.value}
                selectedValue={selectedFilters[CATEGORY_MAPPER[category.label]]}
                onSelect={(value) =>
                  handleSelectFilter(CATEGORY_MAPPER[category.label], value)
                }
                onClear={() =>
                  handleClearFilter(CATEGORY_MAPPER[category.label])
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
