import { Stethoscope, CheckSquare } from "lucide-react";

function HealthInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <Stethoscope size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Health Information</h2>
          <p className="text-slate-400 text-xs">Vaccination, sterilization, and medical records</p>
        </div>
      </div>

      {/* Checkboxes Group */}
      <div className="space-y-4 pt-2">

        {/* Vaccinated */}
        <label className="flex items-center gap-3.5 p-3.5 bg-slate-50/60 border border-slate-200/80 rounded-xl cursor-pointer hover:bg-slate-100/60 transition">
          <input
            type="checkbox"
            name="vaccinated"
            checked={formData.vaccinated}
            onChange={handleChange}
            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500/20"
          />
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Vaccinated
          </span>
        </label>

        {/* Sterilized */}
        <label className="flex items-center gap-3.5 p-3.5 bg-slate-50/60 border border-slate-200/80 rounded-xl cursor-pointer hover:bg-slate-100/60 transition">
          <input
            type="checkbox"
            name="sterilized"
            checked={formData.sterilized}
            onChange={handleChange}
            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500/20"
          />
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Sterilized / Spayed
          </span>
        </label>

        {/* Special Needs */}
        <label className="flex items-center gap-3.5 p-3.5 bg-slate-50/60 border border-slate-200/80 rounded-xl cursor-pointer hover:bg-slate-100/60 transition">
          <input
            type="checkbox"
            name="specialNeeds"
            checked={formData.specialNeeds}
            onChange={handleChange}
            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500/20"
          />
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Has Special Medical Needs
          </span>
        </label>

        {/* Conditional Medical Details */}
        {formData.specialNeeds && (
          <div className="space-y-1.5 pt-2 animate-fadeIn">
            <label className="text-xs font-semibold text-slate-700 block">
              Medical / Special Needs Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="medicalDetails"
              value={formData.medicalDetails || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Describe medication, disability, ongoing treatment, dietary needs, etc."
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
              required
            />
          </div>
        )}

      </div>

    </div>
  );
}

export default HealthInfoForm;