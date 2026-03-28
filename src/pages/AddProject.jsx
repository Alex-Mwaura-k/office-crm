import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  MapPin,
  Layers,
  DollarSign,
  FileText,
  Home,
  ChevronRight,
  Upload,
  CheckSquare,
} from "lucide-react";

export default function AddProject() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6 animate-fade-in pb-10">
      {/* --- BREADCRUMBS --- */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          to="/office"
          className="hover:text-brand-blue flex items-center gap-1 transition-colors"
        >
          <Home size={14} /> Dashboard
        </Link>
        <ChevronRight size={14} />
        <Link
          to="/office/inventory"
          className="hover:text-brand-blue transition-colors"
        >
          Inventory
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white font-medium">
          Add Project
        </span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/office/inventory")}
            className="flex items-center gap-2 text-gray-500 hover:text-brand-red transition-colors mb-2"
          >
            <ArrowLeft size={18} /> Back to Inventory
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create New Project
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/office/inventory")}
            className="px-6 py-2.5 rounded-lg font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button className="bg-brand-red text-white px-6 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2 hover:bg-red-700 transition-colors">
            <Save size={18} /> Save Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- LEFT COLUMN: CORE INFO --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECTION 1: BASIC DETAILS */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-6 border-b border-gray-100 dark:border-neutral-800 pb-2 flex items-center gap-2">
              <MapPin size={16} /> Project Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Project Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kithyoko Phase 2"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Project Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Machakos County"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Project ID / Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. PRJ-005"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors font-mono"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: DIMENSIONS & PRICING */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-6 border-b border-gray-100 dark:border-neutral-800 pb-2 flex items-center gap-2">
              <DollarSign size={16} /> Pricing & Sizing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Size Info */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Total Size (Acres)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Total Plots Available *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>

              {/* Price Info */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Price Per Plot (Cash) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">
                    KES
                  </span>
                  <input
                    type="number"
                    className="w-full pl-10 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Minimum Deposit Allowed
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">
                    KES
                  </span>
                  <input
                    type="number"
                    className="w-full pl-10 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: EXTRAS --- */}
        <div className="space-y-6">
          {/* UPLOAD MAP */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm flex flex-col items-center text-center h-fit">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 w-full text-left">
              Site Map / Layout
            </h3>
            <div className="w-full h-40 bg-gray-50 dark:bg-neutral-900 border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
              <Layers size={32} strokeWidth={1.5} />
              <span className="text-xs mt-2 font-medium">
                Click to upload map image
              </span>
            </div>
          </div>

          {/* FEATURES */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">
              Amenities & Utilities
            </h3>
            <div className="space-y-3">
              {[
                "Water on Site",
                "Electricity on Site",
                "Perimeter Fence",
                "Graded Roads",
                "Title Deeds Ready",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-5 h-5 rounded border border-gray-300 dark:border-neutral-600 flex items-center justify-center group-hover:border-brand-blue">
                    <input type="checkbox" className="hidden peer" />
                    <CheckSquare
                      size={14}
                      className="text-brand-blue opacity-0 peer-checked:opacity-100"
                    />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-gray-300 select-none">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* STATUS */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
              Project Status
            </label>
            <select className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors">
              <option>Upcoming (Pre-selling)</option>
              <option>Active Selling</option>
              <option>Sold Out</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
