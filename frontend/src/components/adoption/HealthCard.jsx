import { CheckCircle2, XCircle, Stethoscope } from "lucide-react";

function HealthCard({ animal }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <Stethoscope size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Health & Medical</h2>
          <p className="text-slate-400 text-xs">Verified shelter medical profile</p>
        </div>
      </div>

      {/* List items */}
      <div className="space-y-3 pt-2">
        
        {/* Vaccinated */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Vaccinated
          </span>
          {animal.vaccinated ? (
            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
              <CheckCircle2 size={16} /> Yes
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
              <XCircle size={16} /> No
            </div>
          )}
        </div>

        {/* Sterilized */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Sterilized / Spayed
          </span>
          {animal.sterilized ? (
            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
              <CheckCircle2 size={16} /> Yes
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
              <XCircle size={16} /> No
            </div>
          )}
        </div>

        {/* Special Needs */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Special Needs / Care
          </span>
          {animal.specialNeeds ? (
            <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
              <CheckCircle2 size={16} /> Yes
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
              <CheckCircle2 size={16} /> None
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default HealthCard;