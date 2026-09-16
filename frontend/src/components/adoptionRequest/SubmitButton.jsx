import { Loader2, Send } from "lucide-react";

function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 px-6 rounded-xl font-semibold shadow-lg shadow-indigo-600/25 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed text-xs sm:text-sm"
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin text-white" />
          <span>Submitting Request...</span>
        </>
      ) : (
        <>
          <Send size={16} className="text-indigo-200" />
          <span>Submit Adoption Request</span>
        </>
      )}
    </button>
  );
}

export default SubmitButton;