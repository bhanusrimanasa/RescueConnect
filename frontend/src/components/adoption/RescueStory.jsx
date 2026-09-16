import { BookOpen, Clock } from "lucide-react";

function RescueStory({ animal }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Rescue Story</h2>
            <p className="text-slate-400 text-xs">Journey to recovery</p>
          </div>
        </div>

        {animal.daysSinceRescue && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
            <Clock size={14} className="text-slate-400" />
            Rescued {animal.daysSinceRescue} days ago
          </div>
        )}
      </div>

      {/* Story Content */}
      <div className="pt-2">
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {animal.rescueStory || "No rescue story provided yet for this animal."}
        </p>
      </div>

    </div>
  );
}

export default RescueStory;