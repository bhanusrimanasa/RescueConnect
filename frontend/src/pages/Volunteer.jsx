import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { becomeVolunteer } from "../services/volunteerService";
import { useNavigate } from "react-router-dom";

function Volunteer() {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    emergencyContact: "",
    city: "",
    availability: "Weekends",
    hasVehicle: "Yes",
    experience: "Beginner",
    volunteerReason: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await becomeVolunteer(formData);
      await fetchUser();
      alert("🎉 Application submitted! Waiting for admin review.");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (user?.role === "volunteer") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mx-auto">
            ❤️
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Application Under Review / Active
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            Your volunteer status is active or currently being processed by our admin team. Thank you for helping animals in need!
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow-sm"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-red-50/50 via-white to-orange-50/30 border-b border-gray-100 text-center">
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Community Outreach
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
            Become a Rescue Hero
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Every rescued animal has a story. Be the reason the next one survives and finds a loving home.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={user.name || ""}
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +1 (555) 000-0000"
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Emergency Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergencyContact"
                required
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Relative or friend's phone"
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                City / Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Austin, TX"
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                General Availability
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              >
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Anytime">Anytime / Flexible</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Do you have reliable transportation?
              </label>
              <select
                name="hasVehicle"
                value={formData.hasVehicle}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              >
                <option value="Yes">Yes (Car / Bike)</option>
                <option value="No">No (Public Transport / Walking)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Previous Animal Handling Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              >
                <option value="Beginner">Beginner (No prior formal experience)</option>
                <option value="Intermediate">Intermediate (Pet owner / basic care)</option>
                <option value="Expert">Expert (Vet tech, shelter volunteer, etc.)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Why do you want to volunteer? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="volunteerReason"
              required
              rows="4"
              value={formData.volunteerReason}
              onChange={handleChange}
              placeholder="Tell us a little bit about why you'd like to join the rescue mission..."
              className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-sm shadow-red-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Submitting Application...
                </>
              ) : (
                "Submit Volunteer Application"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Volunteer;