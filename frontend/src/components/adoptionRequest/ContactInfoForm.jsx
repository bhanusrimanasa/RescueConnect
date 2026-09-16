import { PhoneCall } from "lucide-react";

function ContactInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <PhoneCall size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Contact Information</h2>
          <p className="text-slate-400 text-xs">Details for volunteer or admin verification</p>
        </div>
      </div>

      {/* Form Fields Stack */}
      <div className="space-y-5 pt-2">

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Contact Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        {/* Adoption Reason */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Why is this animal being put up for adoption?
          </label>
          <textarea
            rows={4}
            name="adoptionReason"
            value={formData.adoptionReason}
            onChange={handleChange}
            placeholder="Explain why the animal needs a new home..."
            className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
          />
        </div>

      </div>

    </div>
  );
}

export default ContactInfoForm;