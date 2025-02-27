import React, { useState, useEffect } from "react";
import { dropdown2Options, dropdown3Options } from "./dropdown.js";
import axios from "axios";

const Recommendation = () => {
  const [data, setData] = useState([]);
  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: "Coffee",
    dropdown2: "Machine Name",
    dropdown3: "Espressione Concierge 8212S",
  });

  const [dropdown2Choices, setDropdown2Choices] = useState(
    dropdown2Options[dropdownValues.dropdown1]
  );
  const [dropdown3Choices, setDropdown3Choices] = useState(
    dropdown3Options[dropdownValues.dropdown1]?.[dropdownValues.dropdown2]
  );

  const [showData, setShowData] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5001/post-recommendation", dropdownValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response Data:", response.data);
        setData(response.data);
        setShowData(true);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setDropdown2Choices(dropdown2Options[dropdownValues.dropdown1]);
    setDropdownValues((prevValues) => ({
      ...prevValues,
      dropdown2: dropdown2Options[dropdownValues.dropdown1][0],
    }));
  }, [dropdownValues.dropdown1]);

  useEffect(() => {
    setDropdown3Choices(
      dropdown3Options[dropdownValues.dropdown1]?.[dropdownValues.dropdown2]
    );
    setDropdownValues((prevValues) => ({
      ...prevValues,
      dropdown3:
        dropdown3Options[dropdownValues.dropdown1]?.[
          dropdownValues.dropdown2
        ][0],
    }));
  }, [dropdownValues.dropdown2]);

  const renderCards = () => {
    if (!data || data.length === 0) {
      return (
        <p className="text-gray-500 text-center mt-6">
          No recommendations available.
        </p>
      );
    }

    const excludedKeys = ["Model", "Image URL", "Unnamed: 12"];

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-3/4 p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {item["Model Name"] ||
                  item["MachineName"] ||
                  item["Grain Machine"] ||
                  item["Model"] ||
                  item["Machine Name"] ||
                  "Machine"}
              </h2>
              {Object.entries(item)
                .filter(([key]) => !excludedKeys.includes(key))
                .map(([key, value], rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`flex justify-between items-center ${
                      rowIndex !== Object.entries(item).length - 1
                        ? "border-b border-gray-200 pb-2"
                        : ""
                    }`}
                  >
                    <span className="text-sm text-gray-500 font-medium capitalize">
                      {key}:
                    </span>
                    <span className="text-sm text-gray-700">{value}</span>
                  </div>
                ))}
            </div>
            {item["Image URL"] && (
              <div className="w-1/4 flex items-center justify-center p-4 bg-slate-100">
                <img
                  src={item["Image URL"]}
                  alt={`Image of ${item["Machine Name"]}`}
                  className="h-45 w-auto object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showData ? (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Get Machine Recommendations
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="dropdown1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <select
                    id="dropdown1"
                    name="dropdown1"
                    value={dropdownValues.dropdown1}
                    onChange={handleDropdownChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Grain">Grain</option>
                    <option value="Ice-cream">Ice-cream</option>
                    <option value="Juice">Juice</option>
                    <option value="Nut">Nut</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="dropdown2"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Feature
                  </label>
                  <select
                    id="dropdown2"
                    name="dropdown2"
                    value={dropdownValues.dropdown2}
                    onChange={handleDropdownChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    {dropdown2Choices.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="dropdown3"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Input
                  </label>
                  <select
                    id="dropdown3"
                    name="dropdown3"
                    value={dropdownValues.dropdown3}
                    onChange={handleDropdownChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    {dropdown3Choices.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white bg-slate-100 text-base font-medium px-5 py-1 shadow-md transition-all border-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Recommendations
            </h2>
            {renderCards()}
            <button
              className="mt-6 inline-flex items-center px-3 py-1 border-transparent text-base font-medium rounded-md shadow-sm text-sky-700 border-2 border-sky-700 hover:bg-sky-700 hover:text-white"
              onClick={() => setShowData(false)}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
