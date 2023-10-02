import React from "react";
import { FaBook } from "react-icons/fa";

const Navbar = ({ onViewModeToggle }) => {
  // Get the initial view mode from localStorage or default to "table"
  const initialViewMode = localStorage.getItem("viewMode") || "table";

  const isCardView = initialViewMode === "card";

  const toggleViewMode = () => {
    const newViewMode = isCardView ? "table" : "card";

    // Store the view mode in localStorage
    localStorage.setItem("viewMode", newViewMode);

    // Send a message to other tabs or windows to update their view mode
    window.postMessage(
      { type: "VIEW_MODE_CHANGE", viewMode: newViewMode },
      "*"
    );

    onViewModeToggle(newViewMode);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaBook className="text-white text-2xl" />
          <h1 className="text-white text-xl font-semibold">StorySage</h1>
        </div>
        <div className="flex items-center space-x-4">
          <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
            <input
              type="checkbox"
              checked={isCardView}
              onChange={toggleViewMode}
              className="sr-only"
            />
            <span className="label flex items-center text-sm font-medium text-black">
              Table
            </span>
            <span
              className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                isCardView ? "bg-[#212b36]" : "bg-[#CCCCCE]"
              }`}
            >
              <span
                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                  isCardView ? "translate-x-[28px]" : ""
                }`}
              ></span>
            </span>
            <span className="label flex items-center text-sm font-medium text-black">
              Card
            </span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
