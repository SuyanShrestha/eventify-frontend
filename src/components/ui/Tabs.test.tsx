import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "./Tabs";  
import { vi } from "vitest";

describe("Tabs Component", () => {
  const setActiveTabMock = vi.fn();

  it("renders correctly with given options", () => {
    const options = ["home", "profile", "settings"];
    const activeTab = "home";

    render(
      <Tabs
        options={options}
        activeTab={activeTab}
        setActiveTab={setActiveTabMock}
      />
    );

    options.forEach((option) => {
      expect(screen.getByText(option.charAt(0).toUpperCase() + option.slice(1))).toBeInTheDocument();
    });
  });

  it("applies the correct styles for the active tab", () => {
    const options = ["home", "profile", "settings"];
    const activeTab = "home";

    render(
      <Tabs
        options={options}
        activeTab={activeTab}
        setActiveTab={setActiveTabMock}
      />
    );

    const activeTabButton = screen.getByText("Home");
    expect(activeTabButton).toHaveClass("bg-secondary-text-400 text-white border-accent-500");

    const inactiveTabButton = screen.getByText("Profile");
    expect(inactiveTabButton).toHaveClass("bg-gray-100 text-gray-700 border-gray-300");
  });

  it("changes active tab when a tab is clicked", () => {
    const options = ["home", "profile", "settings"];
    const activeTab = "home";

    render(
      <Tabs
        options={options}
        activeTab={activeTab}
        setActiveTab={setActiveTabMock}
      />
    );

    fireEvent.click(screen.getByText("Profile"));

    expect(setActiveTabMock).toHaveBeenCalledWith("profile");
  });

  it("should render with the first tab as the default active tab", () => {
    const options = ["home", "profile", "settings"];
    const activeTab = "home";

    render(
      <Tabs
        options={options}
        activeTab={activeTab}
        setActiveTab={setActiveTabMock}
      />
    );

    expect(screen.getByText("Home")).toHaveClass("bg-secondary-text-400 text-white border-accent-500");
  });
});
