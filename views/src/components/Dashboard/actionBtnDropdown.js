import { useState } from "react";
import { Link } from "react-router-dom";

const ActionBtnDropdown = () => {
  const options = ["Read", "Update", "Delete"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="btn text-white cursor-pointer rounded text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        Select
        <svg
          className="w-2.5 h-2.5 ms-3"
          ariaHidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        // <div className="origin-top-right right-0 mt-2 w-44 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="origin-top-right right-0 mt-2 w-44 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none z-50 absolute overflow-y-scroll" style={{ zIndex: 50 }}>
          <div
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option, index) => (
              <Link
                key={index}
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {option}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionBtnDropdown;
