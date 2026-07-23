import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AnimalInfoForm from "../components/adoptionRequest/AnimalInfoForm";
import RescueInfoForm from "../components/adoptionRequest/RescueInfoForm";
import HealthInfoForm from "../components/adoptionRequest/HealthInfoForm";
import ContactInfoForm from "../components/adoptionRequest/ContactInfoForm";
import SubmitButton from "../components/adoptionRequest/SubmitButton";

import { createAdoptionRequest } from "../services/adoptionRequestService";

function AdoptionRequest() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    animalType: "",
    breed: "",
    age: "",
    gender: "Male",
    size: "Medium",
    location: "",
    phone: "",
    animalDescription: "",
    rescueStory: "",
    vaccinated: false,
    sterilized: false,
    specialNeeds: false,
    adoptionReason: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createAdoptionRequest(formData);

      alert("Adoption request submitted successfully!");

      navigate("/adoptions");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Request Animal For Adoption 🐾
          </h1>

          <p className="text-gray-600 mt-3">
            Help a rescued animal find a forever home.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <AnimalInfoForm
            formData={formData}
            handleChange={handleChange}
          />

          <RescueInfoForm
            formData={formData}
            handleChange={handleChange}
          />

          <HealthInfoForm
            formData={formData}
            handleChange={handleChange}
          />

          <ContactInfoForm
            formData={formData}
            handleChange={handleChange}
          />

          <SubmitButton loading={loading} />
        </form>

      </div>
    </section>
  );
}

export default AdoptionRequest;