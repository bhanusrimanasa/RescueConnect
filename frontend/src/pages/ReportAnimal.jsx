import { useState } from "react";
import { createReport } from "../services/reportService.js";

function ReportAnimal() {
  const [formData, setFormData] = useState({
    animalType: "",
    problem: "",
    priority: "",
    location: "",
    latitude: null,
    longitude: null,
    description: "",
    contactUser: "",
    images: [],
  });

  const animalTypes = ["Dog", "Cat", "Cow", "Bird", "Other"];
  const priorities = ["Critical", "High", "Medium", "Low"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = formData.images.length + files.length;

    if (totalImages > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert(
      "Live location is not available. Please enter the animal's location manually."
    );
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      setFormData((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    },
    (error) => {
      console.error(error);

      alert(
        "Unable to get your live location. Please enter the animal's location manually."
      );
    },
    {
      enableHighAccuracy: true,
    }
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM DATA:", formData);

  if (!formData.location.trim()) {
  alert("Please enter the animal's location.");
  return;
}
    try {
      console.log("1. Submit clicked");
      console.log("2. Before createReport");
      console.log("FORM DATA BEFORE API:", formData);
      const data = await createReport(formData);

      console.log("3. Response received", data);

      alert("Report submitted successfully!");

      setFormData({
        animalType: "",
        problem: "",
        priority: "",
        location: "",
        latitude: null,
        longitude: null,
        description: "",
        contactUser: "",
        images: [],
      });

      e.target.reset();
    } catch (error) {
      console.error("4. Error:", error);

      console.error(
        "Backend response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to submit report"
      );
    }
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
            required
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
            required
          />
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Condition
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Condition</option>

            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
       {/* Location */}
<div className="mb-4">
  <label className="block text-gray-700 font-medium mb-2">
    Animal Location
  </label>

  <button
    type="button"
    onClick={getCurrentLocation}
    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
  >
    📍 Use My Current Location
  </button>

  <p className="text-sm text-gray-500 text-center mt-2">
    Or enter the animal's location manually below.
  </p>

  <textarea
    name="location"
    value={formData.location}
    onChange={handleChange}
    rows="3"
    placeholder="Example: Near Shillong Civil Hospital, Laitumkhrah, Shillong"
    className="w-full p-3 border rounded-lg mt-3 resize-none"
    required
  />

  {formData.latitude !== null &&
    formData.longitude !== null && (
      <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-green-700">
        <p className="font-semibold">
          📍 Live location captured ✓
        </p>

        <p className="mt-1">
          You can still edit the location above to give volunteers
          more specific directions.
        </p>
      </div>
    )}
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
            required
          />
        </div>

        {/* Contact */}
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
            required
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Animal Images
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Take Photo */}
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-xl p-6 text-center transition">
                <div className="text-4xl mb-2">📷</div>

                <p className="font-semibold text-blue-700">
                  Take Photo
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Use your camera
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  if (formData.images.length >= 10) {
                    alert(
                      "You can upload a maximum of 10 images."
                    );
                    return;
                  }

                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, file],
                  }));
                }}
                className="hidden"
              />
            </label>

            {/* Upload Photos */}
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-green-300 bg-green-50 hover:bg-green-100 rounded-xl p-6 text-center transition">
                <div className="text-4xl mb-2">🖼️</div>

                <p className="font-semibold text-green-700">
                  Upload Photos
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Choose from device
                </p>
              </div>

              <input
                type="file"
                name="images"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

          </div>

          <p className="text-sm text-gray-500 mt-3">
            You can add up to 10 images.
          </p>

          {/* Selected images */}
          {formData.images.length > 0 && (
            <div className="mt-4">

              <p className="text-sm font-medium text-gray-700 mb-2">
                {formData.images.length} image(s) selected
              </p>

              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter(
                            (_, i) => i !== index
                          ),
                        }));
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Submit */}
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