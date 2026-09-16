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
    gender: "",
    size: "",
    location: "",
    phone: "",
    animalDescription: "",
    rescueStory: "",
    vaccinated: false,
    sterilized: false,
    specialNeeds: false,
    medicalDetails: {
      type: String,
      default: "",
    },
    adoptionReason: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const totalImages =
      formData.images.length + files.length;

    if (totalImages > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    e.target.value = "";
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert("Please upload at least one animal image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("animalType", formData.animalType);
      data.append("breed", formData.breed);
      data.append("age", formData.age);
      data.append("gender", formData.gender);
      data.append("size", formData.size);
      data.append("location", formData.location);
      data.append("phone", formData.phone);
      data.append(
        "animalDescription",
        formData.animalDescription
      );
      data.append(
        "rescueStory",
        formData.rescueStory
      );
      data.append(
        "adoptionReason",
        formData.adoptionReason
      );

      data.append(
        "vaccinated",
        String(formData.vaccinated)
      );
      data.append(
        "sterilized",
        String(formData.sterilized)
      );
      data.append(
        "specialNeeds",
        String(formData.specialNeeds)
      );
      data.append(
      "medicalDetails",
      formData.medicalDetails
      );
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      await createAdoptionRequest(data);

      alert(
        "Adoption listing request submitted successfully!"
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "CREATE ADOPTION REQUEST ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Something went wrong."
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
            Request Animal for Adoption 🐾
          </h1>

          <p className="text-gray-600 mt-3">
            Submit an animal for review before it is listed
            for adoption.
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

          {/* ================= IMAGES ================= */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-2">
              Animal Photos
            </h2>

            <p className="text-gray-500 mb-6">
              Add clear photos of the animal. At least one
              photo is required.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Camera */}
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-xl p-6 text-center transition">
                  <div className="text-4xl mb-2">
                    📷
                  </div>

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
                    const file = e.target.files?.[0];

                    if (!file) return;

                    if (formData.images.length >= 10) {
                      alert(
                        "You can upload a maximum of 10 images."
                      );
                      return;
                    }

                    setFormData((prev) => ({
                      ...prev,
                      images: [
                        ...prev.images,
                        file,
                      ],
                    }));

                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </label>

              {/* Upload */}
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-green-300 bg-green-50 hover:bg-green-100 rounded-xl p-6 text-center transition">
                  <div className="text-4xl mb-2">
                    🖼️
                  </div>

                  <p className="font-semibold text-green-700">
                    Upload Photos
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Choose from your device
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImages}
                  className="hidden"
                />
              </label>

            </div>

            {/* Selected images */}
            {formData.images.length > 0 && (
              <div className="mt-6">

                <p className="text-sm font-medium text-gray-700 mb-3">
                  {formData.images.length} image(s) selected
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  {formData.images.map(
                    (image, index) => (
                      <div
                        key={`${image.name}-${index}`}
                        className="relative"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Animal ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 hover:bg-red-700"
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </div>

          <SubmitButton loading={loading} />
        </form>

      </div>
    </section>
  );
}

export default AdoptionRequest;