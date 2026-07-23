import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createApplication } from "../services/adoptionApplicationService";

function AdoptionApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    occupation: "",
    familyMembers: "",
    experience: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createApplication(id, formData);

      alert("Application submitted successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Adoption Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          
          <textarea
            name="experience"
            placeholder="Previous experience with pets"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="3"
            required
          />

          <textarea
            name="reason"
            placeholder="Why do you want to adopt?"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="5"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700"
          >
            Submit Application
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdoptionApplication;