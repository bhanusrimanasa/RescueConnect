import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getReportById } from "../services/reportService";
import { createAdoptionFromRescue } from "../services/adoptionService";

function CreateAdoptionFromRescue() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    animalType: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    location: "",
    description: "",
    rescueStory: "",
    vaccinated: false,
    sterilized: false,
    specialNeeds: false,
    temperament: "",
    images: [],
  });

  // =========================
  // FETCH RESCUE REPORT
  // =========================

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      const data = await getReportById(reportId);

      if (data.status !== "Rescued") {
        alert("This animal has not been rescued yet.");
        navigate("/dashboard");
        return;
      }

      setReport(data);

      // Pre-fill information from rescue report
      setForm((prev) => ({
        ...prev,
        animalType: data.animalType || "",
        location: data.location || "",
        description: data.description || "",
      }));
    } catch (error) {
      console.error("FETCH RESCUE REPORT ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load rescue report."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.rescueStory.trim()) {
    alert("Please write the rescue story.");
    return;
  }

  if (form.images.length === 0) {
    alert("Please upload at least one animal image.");
    return;
  }

  try {
    setSubmitting(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("animalType", form.animalType);
    formData.append("breed", form.breed);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("size", form.size);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("rescueStory", form.rescueStory);

    formData.append("vaccinated", form.vaccinated);
    formData.append("sterilized", form.sterilized);
    formData.append("specialNeeds", form.specialNeeds);

    formData.append(
      "temperament",
      JSON.stringify(
        form.temperament
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );

    // Add all images
    form.images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await createAdoptionFromRescue(
      reportId,
      formData
    );

    console.log("ADOPTION LISTING CREATED:", response);

    alert(
      "Adoption listing created successfully. It has been sent to the Admin for approval."
    );

    navigate("/dashboard");

  } catch (error) {
    console.error(
      "CREATE ADOPTION FROM RESCUE ERROR:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to create adoption listing."
    );
  } finally {
    setSubmitting(false);
  }
};

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading rescue information...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-8 text-center">
        Report not found.
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          🏡 Create Adoption Listing
        </h1>

        <p className="text-gray-600 mb-8">
          Create an adoption listing for the rescued animal.
        </p>

        {/* =========================
            RESCUE INFORMATION
        ========================= */}

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">

          <h2 className="text-xl font-bold mb-3">
            🐾 Rescue Information
          </h2>

          <p>
            <span className="font-semibold">
              Animal:
            </span>{" "}
            {report.animalType}
          </p>

          <p>
            <span className="font-semibold">
              Location:
            </span>{" "}
            {report.location}
          </p>

          <p>
            <span className="font-semibold">
              Problem:
            </span>{" "}
            {report.problem}
          </p>

          <p>
            <span className="font-semibold">
              Original Description:
            </span>{" "}
            {report.description || "No description"}
          </p>

          <p className="mt-3">
            <span className="font-semibold">
              Rescue Status:
            </span>{" "}
            <span className="text-green-600 font-semibold">
              {report.status}
            </span>
          </p>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <div className="mb-5">
            <label className="font-semibold">
              Animal Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Example: Bruno"
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* ANIMAL TYPE */}

          <div className="mb-5">
            <label className="font-semibold">
              Animal Type
            </label>

            <input
              type="text"
              name="animalType"
              value={form.animalType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
            />
          </div>

          {/* BREED */}

          <div className="mb-5">
            <label className="font-semibold">
              Breed
            </label>

            <input
              type="text"
              name="breed"
              value={form.breed}
              onChange={handleChange}
              placeholder="Example: Indian Pariah"
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* AGE */}

          <div className="mb-5">
            <label className="font-semibold">
              Age
            </label>

            <input
              type="text"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Example: 2 years"
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* GENDER */}

          <div className="mb-5">
            <label className="font-semibold">
              Gender
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>
            </select>
          </div>

          {/* SIZE */}

          <div className="mb-5">
            <label className="font-semibold">
              Size
            </label>

            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">
                Select Size
              </option>

              <option value="Small">
                Small
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Large">
                Large
              </option>
            </select>
          </div>

          {/* LOCATION */}

          <div className="mb-5">
            <label className="font-semibold">
              Current Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="mb-5">
            <label className="font-semibold">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* RESCUE STORY */}

          <div className="mb-5">

            <label className="font-semibold">
              📖 Rescue Story
            </label>

            <p className="text-sm text-gray-500 mt-1 mb-2">
              Tell potential adopters what happened to
              this animal and how it was rescued.
            </p>

            <textarea
              name="rescueStory"
              value={form.rescueStory}
              onChange={handleChange}
              placeholder="Example: Bruno was found injured near Jawahar Nagar after being hit by a vehicle..."
              required
              rows={6}
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* VACCINATED */}

          <div className="flex items-center gap-3 mb-4">

            <input
              type="checkbox"
              name="vaccinated"
              checked={form.vaccinated}
              onChange={handleChange}
            />

            <label>
              Vaccinated
            </label>

          </div>

          {/* STERILIZED */}

          <div className="flex items-center gap-3 mb-4">

            <input
              type="checkbox"
              name="sterilized"
              checked={form.sterilized}
              onChange={handleChange}
            />

            <label>
              Sterilized
            </label>

          </div>

          {/* SPECIAL NEEDS */}

          <div className="flex items-center gap-3 mb-5">

            <input
              type="checkbox"
              name="specialNeeds"
              checked={form.specialNeeds}
              onChange={handleChange}
            />

            <label>
              Has Special Medical Needs
            </label>

          </div>

          {/* TEMPERAMENT */}

          <div className="mb-5">

            <label className="font-semibold">
              Temperament
            </label>

            <input
              type="text"
              name="temperament"
              value={form.temperament}
              onChange={handleChange}
              placeholder="Friendly, Playful, Calm"
              className="w-full border rounded-lg p-3 mt-2"
            />

            <p className="text-sm text-gray-500 mt-1">
              Separate multiple traits with commas.
            </p>

          </div>
{/* IMAGE */}

<div className="mb-8">

  <label className="font-semibold block mb-3">
    Animal Images
  </label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* CAMERA */}
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

          setForm((prev) => ({
            ...prev,
            images: [...prev.images, file],
          }));
        }}
        className="hidden"
      />
    </label>

    {/* GALLERY */}
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
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files);

          setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
          }));
        }}
        className="hidden"
      />
    </label>

  </div>

  {/* PREVIEWS */}

  {form.images.length > 0 && (
    <div className="mt-4">

      <p className="text-sm font-medium text-gray-700 mb-2">
        {form.images.length} image(s) selected
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        {form.images.map((image, index) => (
          <div key={index} className="relative">

            <img
              src={URL.createObjectURL(image)}
              alt={`Animal ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border"
            />

            <button
              type="button"
              onClick={() => {
                setForm((prev) => ({
                  ...prev,
                  images: prev.images.filter(
                    (_, i) => i !== index
                  ),
                }));
              }}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7"
            >
              ×
            </button>

          </div>
        ))}

      </div>

    </div>
  )}

</div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={submitting}
            className={`text-white px-8 py-3 rounded-lg ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitting
              ? "Creating Listing..."
              : "Submit Adoption Listing"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateAdoptionFromRescue;