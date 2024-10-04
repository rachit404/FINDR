// src/pages/Recommendation.jsx
import React, { useState, useEffect } from "react";

const Recommendation = () => {
  const [formData, setFormData] = useState({
    budget: "",
    businessType: "",
    grain: "",
  });
  const [recommendations, setRecommendations] = useState([]); // State to hold fetched recommendations

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sending form data to the backend and fetching recommendations.
    console.log("Form Submitted:", formData);
    // You may also want to fetch new recommendations here based on form input.
  };

  // Fetch recommendations from the JSON file
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("src/data/machine.json"); // Adjust the path if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecommendations(data); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };

    fetchRecommendations(); // Call the function to fetch data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Get Your Recommendations
        </h2>
        <form
          className="mt-8 bg-white p-8 shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Budget
            </label>
            <input
              type="text"
              name="budget"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border-2"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Business Type
            </label>
            <input
              type="text"
              name="businessType"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border-2"
              value={formData.businessType}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Grain
            </label>
            <input
              type="text"
              name="grain"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 border-2"
              value={formData.grain}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Submit
          </button>
        </form>

        {/* Render recommendations after fetching */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Recommended Machines
          </h3>
          <ul className="mt-4 space-y-2">
            {recommendations.map((machine, index) => (
              <li key={index} className="p-4 border rounded-md bg-white shadow">
                <h4 className="text-lg font-semibold">
                  {index + 1 + ". " + machine["Machine Name"]}
                </h4>
                <p>Manufacturer: {machine["Manufacturer"]}</p>
                <p>Capacity: {machine["Capacity (tons/hour)"]} tons/hour</p>
                <p>Power: {machine["Power Output (kW)"]} kW</p>
                <p>Dimensions: {machine["Dimensions (LxWxH in meters)"]}</p>
                <p>Price: ${machine["Price (USD)"]}</p>
                <p>Price: ₹{machine["Price (INR)"]}</p>
                <p>Score: {machine["Score"]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
