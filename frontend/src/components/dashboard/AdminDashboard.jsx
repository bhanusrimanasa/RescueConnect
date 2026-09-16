import { useEffect, useState } from "react";
import {
  getReports,
  assignVolunteer,
} from "../../services/reportService";
import { getNearbyVolunteers } from "../../services/volunteerService";
import { 
  ShieldAlert, 
  MapPin, 
  ChevronRight, 
  ChevronDown, 
  PawPrint, 
  UserCheck, 
  Activity, 
  FileText,
  CheckCircle2,
  HeartHandshake,
  BookOpen,
  Users,
  Sparkles,
  Layers,
  ArrowUpRight,
  Clock,
  AlertTriangle
} from "lucide-react";

import PendingListingApprovals from "./PendingListingApprovals";
import PendingApplicationApprovals from "./PendingApplicationApprovals";
import PendingAdoptions from "./PendingAdoptions";
import PendingSuccessStories from "./PendingSuccessStories";
import AdminVolunteers from "../../pages/AdminVolunteers";

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [nearbyVolunteers, setNearbyVolunteers] = useState({});
  const [selectedVolunteer, setSelectedVolunteer] = useState({});
  const [expandedReport, setExpandedReport] = useState(null);
  const [activeSection, setActiveSection] = useState("pending-reports");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNearbyVolunteers = async (reportId) => {
    try {
      const data = await getNearbyVolunteers(reportId);
      setNearbyVolunteers((prev) => ({
        ...prev,
        [reportId]: data,
      }));
    } catch (err) {
      console.error("Failed to fetch nearby volunteers:", err);
      setNearbyVolunteers((prev) => ({
        ...prev,
        [reportId]: [],
      }));
    }
  };

  const handleAssign = async (reportId) => {
    const volunteerId = selectedVolunteer[reportId];

    if (!volunteerId) {
      return alert("Please select a volunteer.");
    }

    try {
      await assignVolunteer(reportId, volunteerId);
      alert("Volunteer assigned successfully.");
      fetchReports();
      setExpandedReport(null);
    } catch (err) {
      console.log(err);
      alert("Failed to assign volunteer.");
    }
  };

  const toggleCard = (reportId) => {
    const isOpening = expandedReport !== reportId;
    setExpandedReport(isOpening ? reportId : null);

    if (isOpening && !nearbyVolunteers[reportId]) {
      fetchNearbyVolunteers(reportId);
    }
  };

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const pendingReports = reports.filter((r) => r.status === "Pending");
  const activeReports = reports.filter(
    (r) =>
      r.status === "Assigned" ||
      r.status === "Accepted" ||
      r.status === "In Progress" ||
      r.status === "Rescued"
  );

  const sections = [
    {
      id: "pending-reports",
      title: "Pending Rescue Reports",
      subtitle: "Review incoming emergency requests and dispatch nearby field volunteers",
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      badge: { count: pendingReports.length, color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
      accentBorder: "hover:border-rose-500/40",
      activeBg: "border-rose-500/40 bg-gradient-to-r from-rose-500/[0.03] to-transparent"
    },
    {
      id: "active-operations",
      title: "Active Rescue Operations",
      subtitle: "Monitor live missions and track ongoing field status updates",
      icon: <Activity className="w-5 h-5 text-sky-500" />,
      badge: { count: activeReports.length, color: "bg-sky-500/10 text-sky-500 border-sky-500/20" },
      accentBorder: "hover:border-sky-500/40",
      activeBg: "border-sky-500/40 bg-gradient-to-r from-sky-500/[0.03] to-transparent"
    },
    {
      id: "volunteer-applications",
      title: "Volunteer Applications",
      subtitle: "Approve or audit background profiles of prospective field rescue workers",
      icon: <Users className="w-5 h-5 text-amber-500" />,
      accentBorder: "hover:border-amber-500/40",
      activeBg: "border-amber-500/40 bg-gradient-to-r from-amber-500/[0.03] to-transparent"
    },
    {
      id: "adoption-listings",
      title: "Pending Adoption Listings",
      subtitle: "Verify animal shelter profiles before publishing for public adoption",
      icon: <BookOpen className="w-5 h-5 text-violet-500" />,
      accentBorder: "hover:border-violet-500/40",
      activeBg: "border-violet-500/40 bg-gradient-to-r from-violet-500/[0.03] to-transparent"
    },
    {
      id: "adoption-applications",
      title: "Adoption Applications",
      subtitle: "Screen prospective pet parent adoption questionnaires and requests",
      icon: <HeartHandshake className="w-5 h-5 text-pink-500" />,
      accentBorder: "hover:border-pink-500/40",
      activeBg: "border-pink-500/40 bg-gradient-to-r from-pink-500/[0.03] to-transparent"
    },
    {
      id: "final-adoptions",
      title: "Completed Adoptions & Success Stories",
      subtitle: "Celebrate happy tails and archive closed adoption workflows",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      accentBorder: "hover:border-emerald-500/40",
      activeBg: "border-emerald-500/40 bg-gradient-to-r from-emerald-500/[0.03] to-transparent"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans antialiased text-slate-800">

      {/* ================= REFINED ULTRA-MODERN HEADER ================= */}
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800">
        {/* Dynamic ambient lighting gradient circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium tracking-wide">
              <Sparkles size={13} className="text-indigo-400 animate-pulse" />
              Rescue Command Dashboard
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Operations Control Center
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
              Manage live rescue dispatches, streamline vetting pipelines, and review workflows effortlessly from a single unified deck.
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-2xl p-4 shrink-0 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layers size={18} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">Live Database</span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                Connected & Synchronized
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXPANDABLE ACCORDION SECTIONS ================= */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const isOpen = activeSection === sec.id;

          return (
            <div 
              key={sec.id}
              className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
                isOpen 
                  ? `${sec.activeBg} shadow-md ring-1 ring-slate-900/5` 
                  : `border-slate-200/80 hover:border-slate-300 ${sec.accentBorder}`
              }`}
            >
              {/* Trigger Header */}
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm ${
                    isOpen ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/70"
                  }`}>
                    {sec.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h2 className={`text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? "text-slate-900 font-extrabold" : "text-slate-800 group-hover:text-slate-900"
                    }`}>
                      {sec.title}
                    </h2>
                    <p className="text-slate-400 text-xs font-normal">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {sec.badge && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${sec.badge.color}`}>
                      {sec.badge.count} Active
                    </span>
                  )}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isOpen ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
                  }`}>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </div>
              </button>

              {/* Expandable Body */}
              {isOpen && (
                <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-100 bg-slate-50/40 animate-fadeIn">
                  
                  {sec.id === "pending-reports" && (
                    pendingReports.length === 0 ? (
                      <div className="bg-white rounded-2xl border border-slate-200/70 p-12 text-center text-slate-400 text-xs sm:text-sm shadow-sm">
                        No pending rescue reports at the moment. Everything is clear!
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-5 pt-2">
                        {pendingReports.map((report) => {
                          const isExpanded = expandedReport === report._id;

                          return (
                            <div
                              key={report._id}
                              onClick={() => toggleCard(report._id)}
                              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer shadow-sm hover:shadow-md ${
                                isExpanded 
                                  ? "md:col-span-2 border-slate-400 ring-2 ring-slate-900/5 shadow-md" 
                                  : "border-slate-200/80 hover:border-slate-300"
                              }`}
                            >
                              <div className="p-5 sm:p-6 space-y-3">
                                <div className="flex justify-between items-start gap-4">
                                  <div className="space-y-1">
                                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                                      <PawPrint size={16} className="text-rose-500" />
                                      {report.animalType}
                                    </h3>
                                    <p className="text-slate-500 text-xs flex items-center gap-1.5">
                                      <MapPin size={13} className="text-slate-400 shrink-0" />
                                      {report.location}
                                    </p>
                                  </div>
                                  <span className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-[11px] font-semibold shrink-0">
                                    {report.status}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                  <span
                                    className={`px-3 py-1 rounded-full text-[11px] font-semibold border inline-flex items-center gap-1 ${
                                      report.priority === "Critical"
                                        ? "bg-rose-50 border-rose-200 text-rose-700"
                                        : report.priority === "High"
                                        ? "bg-orange-50 border-orange-200 text-orange-700"
                                        : "bg-indigo-50 border-indigo-200 text-indigo-700"
                                    }`}
                                  >
                                    <AlertTriangle size={12} /> {report.priority} Priority
                                  </span>
                                  <span className="text-slate-900 font-semibold text-xs flex items-center gap-1 hover:underline">
                                    {isExpanded ? "Collapse" : "Review Report"}
                                    <ArrowUpRight size={14} className={isExpanded ? "rotate-180" : ""} />
                                  </span>
                                </div>
                              </div>

                              {isExpanded && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="border-t border-slate-100 bg-slate-50/60 p-6 space-y-6"
                                >
                                  {report.images && report.images.length > 0 ? (
                                    <img
                                      src={report.images[0]}
                                      alt={`${report.animalType} report`}
                                      className="w-full max-h-[320px] object-cover rounded-xl border border-slate-200 shadow-sm"
                                    />
                                  ) : (
                                    <div className="h-36 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
                                      <PawPrint size={36} />
                                    </div>
                                  )}

                                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                                    <p><strong className="text-slate-900">Location:</strong> {report.location}</p>
                                    <p><strong className="text-slate-900">Problem:</strong> {report.problem}</p>
                                    <p><strong className="text-slate-900">Priority:</strong> {report.priority}</p>

                                    {report.description && (
                                      <div className="pt-2 border-t border-slate-100 mt-2">
                                        <p className="font-semibold text-slate-900 mb-1">Description</p>
                                        <p className="text-slate-600">{report.description}</p>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-3">
                                    <select
                                      value={selectedVolunteer[report._id] || ""}
                                      onChange={(e) =>
                                        setSelectedVolunteer({
                                          ...selectedVolunteer,
                                          [report._id]: e.target.value,
                                        })
                                      }
                                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition cursor-pointer shadow-sm"
                                    >
                                      <option value="">Select Nearby Volunteer</option>
                                      {(nearbyVolunteers[report._id] || []).map((v) => (
                                        <option key={v.volunteerId} value={v.volunteerId}>
                                          {v.name} — {v.distance} km away
                                        </option>
                                      ))}
                                    </select>

                                    <button
                                      onClick={() => handleAssign(report._id)}
                                      className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition shadow-md inline-flex items-center justify-center gap-2 shrink-0"
                                    >
                                      <UserCheck size={16} />
                                      Assign Volunteer
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => (window.location.href = `/reports/${report._id}`)}
                                    className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 py-3 rounded-xl font-semibold text-xs sm:text-sm transition inline-flex items-center justify-center gap-2 shadow-sm"
                                  >
                                    <FileText size={16} className="text-slate-500" />
                                    Open Full Report View
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )
                  )}

                  {sec.id === "active-operations" && (
                    activeReports.length === 0 ? (
                      <div className="bg-white rounded-2xl border border-slate-200/70 p-12 text-center text-slate-400 text-xs sm:text-sm shadow-sm">
                        No active rescue operations currently underway.
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-5 pt-2">
                        {activeReports.map((report) => {
                          const isExpanded = expandedReport === report._id;

                          return (
                            <div
                              key={report._id}
                              onClick={() => toggleCard(report._id)}
                              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer shadow-sm hover:shadow-md ${
                                isExpanded 
                                  ? "md:col-span-2 border-slate-400 ring-2 ring-slate-900/5 shadow-md" 
                                  : "border-slate-200/80 hover:border-slate-300"
                              }`}
                            >
                              <div className="p-5 sm:p-6 space-y-3">
                                <div className="flex justify-between items-start gap-4">
                                  <div className="space-y-1">
                                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                                      <PawPrint size={16} className="text-sky-500" />
                                      {report.animalType}
                                    </h3>
                                    <p className="text-slate-500 text-xs flex items-center gap-1.5">
                                      <MapPin size={13} className="text-slate-400 shrink-0" />
                                      {report.location}
                                    </p>
                                  </div>
                                  <span className="bg-sky-50 border border-sky-200 text-sky-700 px-3 py-1 rounded-full text-[11px] font-semibold shrink-0">
                                    {report.status}
                                  </span>
                                </div>

                                <div className="flex justify-end pt-1">
                                  <span className="text-slate-900 font-semibold text-xs flex items-center gap-1 hover:underline">
                                    {isExpanded ? "Collapse" : "View Mission Details"}
                                    <ArrowUpRight size={14} className={isExpanded ? "rotate-180" : ""} />
                                  </span>
                                </div>
                              </div>

                              {isExpanded && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="border-t border-slate-100 bg-slate-50/60 p-6 space-y-5"
                                >
                                  {report.images && report.images.length > 0 && (
                                    <img
                                      src={report.images[0]}
                                      alt={report.animalType}
                                      className="w-full max-h-[320px] object-cover rounded-xl border border-slate-200 shadow-sm"
                                    />
                                  )}
                                  
                                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                                    <p><strong className="text-slate-900">Problem:</strong> {report.problem}</p>
                                    <p><strong className="text-slate-900">Location:</strong> {report.location}</p>
                                    <p><strong className="text-slate-900">Priority:</strong> {report.priority}</p>
                                  </div>

                                  <button
                                    onClick={() => (window.location.href = `/reports/${report._id}`)}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-xs sm:text-sm transition inline-flex items-center justify-center gap-2 shadow-sm"
                                  >
                                    <FileText size={16} />
                                    Open Full Report View
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )
                  )}

                  {sec.id === "volunteer-applications" && (
                    <div className="pt-2">
                      <AdminVolunteers />
                    </div>
                  )}

                  {sec.id === "adoption-listings" && (
                    <div className="pt-2">
                      <PendingListingApprovals />
                    </div>
                  )}

                  {sec.id === "adoption-applications" && (
                    <div className="pt-2">
                      <PendingApplicationApprovals />
                    </div>
                  )}

                  {sec.id === "final-adoptions" && (
                    <div className="space-y-8 pt-2">
                      <PendingAdoptions />
                      <div className="pt-6 border-t border-slate-200/60">
                        <PendingSuccessStories />
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default AdminDashboard;