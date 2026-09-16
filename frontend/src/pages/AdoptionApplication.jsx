import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createApplication,
} from "../services/adoptionApplicationService";
import { getAdoptionById } from "../services/adoptionService";

function AdoptionApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    occupation: "",
    familyMembers: "",
    experience: "",
    reason: "",
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const data = await getAdoptionById(id);
        setAnimal(data);
      } catch (error) {
        console.error("Failed to fetch animal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createApplication(id, formData);

      alert("Application submitted successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to submit application."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">
          Loading animal details...
        </p>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-600">
          Animal not found.
        </p>
      </div>
    );
  }

  const image =
    animal.images && animal.images.length > 0
      ? animal.images[0]
      : null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-4xl mx-auto">

        {/* ================= ANIMAL SUMMARY ================= */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">

          <div className="grid md:grid-cols-2">

            {/* Image */}

            <div className="bg-gray-100 h-80 flex items-center justify-center">

              {image ? (
                <img
                  src={image}
                  alt={animal.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-7xl">
                  🐾
                </div>
              )}

            </div>

            {/* Animal Info */}

            <div className="p-8">

              <p className="text-sm text-blue-600 font-semibold uppercase">
                Adoption Application
              </p>

              <h1 className="text-4xl font-bold mt-2">
                {animal.name}
              </h1>

              <div className="mt-5 space-y-2 text-gray-700">

                <p>
                  <span className="font-semibold">
                    Type:
                  </span>{" "}
                  {animal.animalType}
                </p>

                <p>
                  <span className="font-semibold">
                    Breed:
                  </span>{" "}
                  {animal.breed}
                </p>

                <p>
                  <span className="font-semibold">
                    Age:
                  </span>{" "}
                  {animal.age}
                </p>

                <p>
                  <span className="font-semibold">
                    Gender:
                  </span>{" "}
                  {animal.gender}
                </p>

                <p>
                  <span className="font-semibold">
                    Location:
                  </span>{" "}
                  {animal.location}
                </p>

              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-4 text-blue-800">
                You are applying to adopt{" "}
                <span className="font-bold">
                  {animal.name}
                </span>.
              </div>

            </div>

          </div>

        </div>

        {/* ================= APPLICATION FORM ================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-2">
            Your Details
          </h2>

          <p className="text-gray-500 mb-8">
            Please provide accurate information. Your application
            will be reviewed by a volunteer and then by an administrator.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Phone */}

            <div>
              <label className="block font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Enter your phone number"
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Address */}

            <div>
              <label className="block font-semibold mb-2">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                placeholder="Enter your current address"
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Occupation */}

            <div>
              <label className="block font-semibold mb-2">
                Occupation
              </label>

              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                placeholder="Student, Engineer, Teacher, etc."
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Family Members */}

            <div>
              <label className="block font-semibold mb-2">
                Family Members
              </label>

              <input
                type="text"
                name="familyMembers"
                value={formData.familyMembers}
                placeholder="Example: 4 members"
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Experience */}

            <div>
              <label className="block font-semibold mb-2">
                Previous Pet Experience
              </label>

              <textarea
                name="experience"
                value={formData.experience}
                placeholder="Tell us about your previous experience with pets."
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Reason */}

            <div>
              <label className="block font-semibold mb-2">
                Why do you want to adopt?
              </label>

              <textarea
                name="reason"
                value={formData.reason}
                placeholder="Explain why you want to adopt this animal."
                onChange={handleChange}
                rows={5}
                className="w-full border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Submit Adoption Application
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdoptionApplication;