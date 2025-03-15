import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/eventSlice";
import { RootState } from "../../store";
import { Tabs } from "../ui";
import { useMediaQuery } from "react-responsive";

interface SidebarProps {
  setIsSidebarOpen?: (isOpen: boolean) => void;
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
  {
    label: "Date",
    icon: <Calendar className="w-6 h-6 text-secondary-text-500" />,
    options: [
      { label: "Today", value: "today" },
      { label: "Tomorrow", value: "tomorrow" },
      { label: "This week", value: "this-week" },
      { label: "This month", value: "this-month" },
    ],
  },
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

const CATEGORY_MAPPER: Record<string, string> = {
  Price: "price",
  Date: "date",
  Platform: "type",
  Status: "expirationStatus",
  Categories: "eventCategoryId",
};

const eventScopeOptions = ["All", "Saved"];

const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    ticketType: null as string | null,
    eventDate: null as string | null,
    platform: null as string | null,
    expirationStatus: null as string | null,
    eventCategoryId: null as string | null,
  });
  const [activeScope, setActiveScope] = useState<string>("All");

  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // for <md screens

  const dispatch = useDispatch();
  const { categories: eventCategories } = useSelector(
    (state: RootState) => state.categories
  );

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

  const handleSelectFilter = (category: string, value: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [category]: value,
    }));
    console.log("selected category is: ", category);
    dispatch(setFilters({ [category]: value }));
  };

  useEffect(() => {
    dispatch(setFilters({ isSavedFilter: activeScope === "Saved" }));
  }, [activeScope, dispatch]);

  return (
    <div className="mx-4 py-2 h-[calc(100vh-4rem)] flex flex-col gap-4 overflow-y-auto custom-scrollbar">
      <div className="w-full flex justify-between items-center ">
        <h1 className="text-2xl py-4 text-secondary-text-500 font-bold">
          Events Category
        </h1>
        {isSmallScreen && (
          <button
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen?.(false)}
          >
            <X className="h-6 w-6 text-secondary-text-500" />
          </button>
        )}
      </div>

      <div>
        <Tabs
          options={eventScopeOptions}
          activeTab={activeScope}
          setActiveTab={setActiveScope}
        />
      </div>

      {sidebarCategories.map((category) => (
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
