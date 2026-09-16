import { useNavigate } from "react-router-dom";
import { Heart, Sparkles } from "lucide-react";

function ApplyCard({ animal }) {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-4">
        
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-indigo-200 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold">
          <Sparkles size={14} className="text-amber-300" /> Forever Home
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Adopt?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Take the first step and give <span className="text-white font-semibold">{animal.name}</span> a safe, loving family.
          </p>
        </div>

        <button
          onClick={() => navigate(`/adoptions/${animal._id}/apply`)}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-indigo-600/25 transition-all text-xs sm:text-sm group"
        >
          <Heart size={16} className="text-rose-300 fill-rose-300 group-hover:scale-110 transition-transform" />
          Apply for Adoption
        </button>

      </div>
    </div>
  );
}

export default ApplyCard;