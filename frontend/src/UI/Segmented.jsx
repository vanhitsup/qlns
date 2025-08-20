import React, { useEffect, useState } from "react";

export default function Segmented({ options, defaultValue, value, onChange }) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const handleChange = (value) => {
    setSelectedOption(value);
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  return (
    <div className="flex space-x-1 p-0.5 bg-gray-100 rounded-lg shadow-md">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleChange(option.value)}
          className={`flex items-center justify-center p-1 rounded-md transition-all duration-200 ${
            selectedOption === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {option.icon}
          {option.title && <span className="mx-1">{option.title}</span>}
        </button>
      ))}
    </div>
  );
}
