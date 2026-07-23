function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
    >
      {loading ? "Submitting..." : "Submit Adoption Request"}
    </button>
  );
}

export default SubmitButton;