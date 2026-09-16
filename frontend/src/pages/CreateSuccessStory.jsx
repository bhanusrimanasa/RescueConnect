import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getReportById } from "../services/reportService";

function CreateSuccessStory() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  // Fetch the rescue report
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportById(reportId);
        console.log("SUCCESS STORY REPORT:", data);
        setReport(data);
      } catch (error) {
        console.error("Failed to fetch report:", error);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !story || !image || !report) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("story", story);
      formData.append("animalType", report.animalType);
      formData.append("reportId", reportId);
      formData.append("image", image);

      await axios.post(
        "http://localhost:5000/api/success-stories",
        formData,
        {
          withCredentials: true,
        }
      );

      alert("Success story submitted to admin!");

      navigate("/reports");

    } catch (error) {
      console.error("SUCCESS STORY ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to submit success story."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-purple-600 mb-2">
          🏆 Create Success Story
        </h1>

        <p className="text-gray-500 mb-8">
          Tell the story of how this animal was rescued.
          Your story will be sent to an admin for approval.
        </p>

        {/* Report information */}
        {report && (
          <div className="mb-8 bg-purple-50 rounded-xl p-5">
            <h2 className="font-bold text-lg mb-2">
              Rescue Case
            </h2>

            <p>
              <span className="font-semibold">Animal:</span>{" "}
              {report.animalType}
            </p>

            <p>
              <span className="font-semibold">Problem:</span>{" "}
              {report.problem}
            </p>

            <p>
              <span className="font-semibold">Location:</span>{" "}
              {report.location}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Story Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Bruno's Journey from Injury to Safety"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Story */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Success Story
            </label>

            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Describe what happened, how the animal was rescued, treatment received, and its current condition..."
              rows={8}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Image */}
         {/* Image */}
<div className="mb-6">
  <label className="block font-semibold mb-2">
    Rescued Animal Photo
  </label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Camera */}
    <label className="cursor-pointer">
      <div className="border-2 border-dashed border-purple-300 bg-purple-50 hover:bg-purple-100 rounded-xl p-6 text-center transition">
        <div className="text-4xl mb-2">📷</div>

        <p className="font-semibold text-purple-700">
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
        onChange={(e) => setImage(e.target.files[0])}
        className="hidden"
      />
    </label>

    {/* Upload */}
    <label className="cursor-pointer">
      <div className="border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-xl p-6 text-center transition">
        <div className="text-4xl mb-2">🖼️</div>

        <p className="font-semibold text-blue-700">
          Upload Photo
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Choose from device
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="hidden"
      />
    </label>

  </div>

  {/* Selected image */}
  {image && (
    <div className="mt-4">

      <img
        src={URL.createObjectURL(image)}
        alt="Selected rescued animal"
        className="w-full max-h-64 object-contain rounded-xl border bg-gray-50"
      />

      <p className="text-sm text-gray-500 mt-2">
        Selected: {image.name}
      </p>

    </div>
  )}
</div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !report}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Submitting..."
              : "🏆 Submit Success Story"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateSuccessStory;