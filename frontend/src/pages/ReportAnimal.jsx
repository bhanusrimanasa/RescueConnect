import { useState } from "react";
import { createReport } from "../services/reportService.js";
function ReportAnimal() {
  const [formData, setFormData] = useState({
    animalType: "",
    problem: "",
    condition: "",
    location: "",
    description: "",
    contactUser: "",
  });

  const animalTypes = ["Dog", "Cat", "Cow", "Bird", "Other"];
  const conditions = ["Mild", "Moderate", "Critical"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("1. Submit clicked");

  try {
    console.log("2. Before createReport");

    const data = await createReport(formData);

    console.log("3. Response received", data);

    alert("Report submitted successfully!");
  } catch (error) {
    console.error("4. Error:", error);
  }
  setFormData({
    animalType: "",
    problem: "",
    condition: "",
    location: "",
    description: "",
    contactUser: "",
  });
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Report an Injured Animal
        </h1>

        {/* Animal Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Animal Type
          </label>

          <select
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Animal</option>

            {animalTypes.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </div>

        {/* Problem */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Problem
          </label>

          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            placeholder="Enter the problem"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Condition */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Condition
          </label>

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Condition</option>

            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the animal's condition..."
            className="w-full p-3 border rounded-lg resize-none"
          />
        </div>

        {/* Contact User */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Contact Number
          </label>

          <input
            type="text"
            name="contactUser"
            value={formData.contactUser}
            onChange={handleChange}
            placeholder="Enter your contact number"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportAnimal;