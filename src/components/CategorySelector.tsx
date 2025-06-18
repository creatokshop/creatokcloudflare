import React from "react";

interface CategorySelectorProps {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  setActiveCategory,
}) => (
  <div className="flex justify-center mb-10">
    <div className="bg-gray-800 p-1 rounded-lg inline-flex">
      <button
        className={`px-6 py-2 rounded-md transition-all ${
          activeCategory === "non-verified"
            ? "text-xs sm:text-l font-bold bg-gradient-to-r from-rose-600 to-transparent-500 text-white"
            : "text-xs sm:text-l font-bold text-gray-400 hover:text-white"
        }`}
        onClick={() => setActiveCategory("non-verified")}
      >
        Non-verified Account
      </button>
      <button
        className={`px-6 py-2 rounded-md transition-all ${
          activeCategory === "verified"
            ? "text-xs sm:text-l font-bold bg-gradient-to-r from-cyan-600 to-transparent-500 text-white"
            : "text-xs sm:text-l font-bold text-gray-400 hover:text-white"
        }`}
        onClick={() => setActiveCategory("verified")}
      >
        Verified System Bypass
      </button>
    </div>
  </div>
);