import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { becomeVolunteer } from "../services/volunteerService";
import { useNavigate } from "react-router-dom";

function Volunteer() {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    city: "",
    availability: "Weekends",
    volunteerReason: "",
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
      await becomeVolunteer(formData);

      await fetchUser();

      alert("🎉 Welcome to RescueConnect Volunteers!");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (user?.role === "volunteer") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-xl p-10 text-center">
          <h1 className="text-4xl font-bold text-green-600">
            ❤️ You're already a Volunteer!
          </h1>

          <p className="mt-4 text-gray-600">
            Thank you for helping animals in need.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl"
      >

        <h1 className="text-4xl font-bold text-center text-red-600 mb-2">
          Become a Rescue Hero ❤️
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Every rescued animal has a story.
          Be the reason the next one survives.
        </p>

        <input
          value={user.name}
          disabled
          className="w-full border rounded-lg p-3 mb-4 bg-gray-100"
        />

        <input
          value={user.email}
          disabled
          className="w-full border rounded-lg p-3 mb-4 bg-gray-100"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <select
          name="availability"
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option>Weekdays</option>
          <option>Weekends</option>
          <option>Anytime</option>
        </select>

        <textarea
          name="volunteerReason"
          placeholder="Why do you want to volunteer?"
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-6"
          rows="4"
        />

        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg">
          Join RescueConnect
        </button>

      </form>

    </div>
  );
}

export default Volunteer;