import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  Fingerprint,
  Users,
  Camera,
  CheckCircle,
  X,
  FileText, // <--- Added FileText Icon
} from "lucide-react";

export default function ClientRegister() {
  const navigate = useNavigate();

  // --- STATE ---
  const [isScanning, setIsScanning] = useState(false);
  const [biometricCaptured, setBiometricCaptured] = useState(false);

  // Simulate Scan Function
  const handleScan = () => {
    setIsScanning(true);
    // Fake 2-second scan delay
    setTimeout(() => {
      setIsScanning(false);
      setBiometricCaptured(true);
    }, 2000);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/office/clients")}
            className="flex items-center gap-2 text-gray-500 hover:text-brand-red transition-colors mb-2"
          >
            <ArrowLeft size={18} /> Back to Database
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Client Registration
          </h1>
        </div>
        <button className="bg-brand-red text-white px-6 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Save size={18} /> Save Record
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* --- LEFT SIDE: PHOTO, DOCUMENTS & BIOMETRICS --- */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* 1. Photo Upload Card */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm flex flex-col items-center text-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 w-full text-left">
              Client Photo
            </h3>
            <div className="w-40 h-40 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-gray-400 mb-4 border-2 border-dashed border-gray-300 dark:border-neutral-700 overflow-hidden relative group cursor-pointer">
              <User size={64} strokeWidth={1.5} />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <Camera size={24} />
              </div>
            </div>
            <button className="text-sm font-medium text-brand-blue hover:underline flex items-center gap-2">
              <Upload size={14} /> Upload Photo
            </button>
          </div>

          {/* 2. [NEW] KRA Certificate Upload */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm flex flex-col items-center text-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 w-full text-left flex items-center justify-between">
              Documents{" "}
              <span className="text-[10px] bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-gray-500">
                Required
              </span>
            </h3>

            <div className="w-full h-32 bg-gray-50 dark:bg-neutral-900 rounded-lg border-2 border-dashed border-gray-200 dark:border-neutral-700 flex flex-col items-center justify-center text-gray-400 gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group">
              <FileText
                size={32}
                className="group-hover:text-brand-blue transition-colors"
              />
              <span className="text-xs font-medium text-gray-500 group-hover:text-brand-blue">
                KRA PIN Certificate
              </span>
            </div>

            <button className="mt-4 text-sm font-medium text-brand-blue hover:underline flex items-center gap-2">
              <Upload size={14} /> Upload PDF / Image
            </button>
          </div>

          {/* 3. Biometric Status Card */}
          <div className="bg-white dark:bg-brand-black p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
              Biometrics
            </h3>

            {/* Status Indicator */}
            <div
              className={`border rounded-lg p-4 flex items-center gap-4 mb-4 transition-colors ${biometricCaptured ? "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-900/30" : "bg-gray-50 border-gray-100 dark:bg-neutral-900 dark:border-neutral-800"}`}
            >
              <div
                className={`p-2 rounded-full ${biometricCaptured ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" : "bg-gray-200 dark:bg-neutral-800 text-gray-400"}`}
              >
                {biometricCaptured ? (
                  <CheckCircle size={24} />
                ) : (
                  <Fingerprint size={24} />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${biometricCaptured ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {biometricCaptured
                    ? "Fingerprint Captured"
                    : "Not Registered"}
                </p>
                <p className="text-xs text-gray-400">
                  {biometricCaptured ? "Ready to save" : "Optional"}
                </p>
              </div>
            </div>

            {/* Action Button */}
            {!biometricCaptured ? (
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${isScanning ? "bg-gray-100 text-gray-400 cursor-wait dark:bg-neutral-800" : "bg-slate-800 hover:bg-slate-700 text-white shadow-md"}`}
              >
                {isScanning ? (
                  <>Scanning Device...</>
                ) : (
                  <>
                    <Fingerprint size={16} /> Scan Fingerprint
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setBiometricCaptured(false)}
                className="w-full py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors border border-transparent hover:border-red-100 flex items-center justify-center gap-2"
              >
                <X size={14} /> Remove / Rescan
              </button>
            )}
          </div>
        </div>

        {/* --- RIGHT SIDE: DATA FORM --- */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white dark:bg-brand-black p-6 md:p-8 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm space-y-8">
          {/* Section 1: Official Details */}
          <div>
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-6 border-b border-gray-100 dark:border-neutral-800 pb-2 flex items-center gap-2">
              <User size={16} /> Member Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Account Type *
                </label>
                <select className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors">
                  <option>Local Individual</option>
                  <option>Diaspora</option>
                  <option>Company</option>
                  <option>Chama / Group</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  National ID / Passport *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  KRA PIN
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                  placeholder="A00..."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Names */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none uppercase transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none uppercase transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none uppercase transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Meta */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                  placeholder="07..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Gender
                </label>
                <select className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Next of Kin (Beneficiary) */}
          <div className="pt-6 border-t border-dashed border-gray-200 dark:border-neutral-700">
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider mb-6 flex items-center gap-2">
              <Users size={16} /> Next of Kin / Beneficiary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Beneficiary Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Relationship
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                  placeholder="e.g. Spouse, Child"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                  Beneficiary Phone
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-slate-800 dark:text-white focus:border-brand-blue outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
