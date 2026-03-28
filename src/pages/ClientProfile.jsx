import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // <--- Added Link
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Fingerprint,
  Map as MapIcon,
  History,
  Edit2,
  Save,
  X,
  Camera,
  Home, // <--- Added Home
  ChevronRight, // <--- Added ChevronRight
} from "lucide-react";

export default function ClientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- STATE ---
  const [isEditing, setIsEditing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // MOCK DATA
  const [client, setClient] = useState({
    id: id || "11071852",
    firstName: "Stanley",
    middleName: "Mutugi",
    lastName: "Irungu",
    type: "Diaspora",
    phone: "0721688262",
    email: "stanley@example.com",
    address: "P.O Box 1234, Nairobi",
    biometricRegistered: false,
    image: null,
    stats: {
      totalPaid: 450000,
      arrears: 0,
      plotsCount: 3,
    },
    plots: [
      {
        name: "Kithyoko Phase 2",
        plotNo: "45",
        price: 150000,
        status: "Fully Paid",
      },
      {
        name: "Kithyoko Phase 2",
        plotNo: "46",
        price: 150000,
        status: "Fully Paid",
      },
      {
        name: "Malindi Gardens",
        plotNo: "12",
        price: 200000,
        status: "Paying (Bal: 50k)",
      },
    ],
  });

  // HANDLERS
  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleScanFingerprint = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setClient({ ...client, biometricRegistered: true });
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
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
          to="/office/clients"
          className="hover:text-brand-blue transition-colors"
        >
          Clients
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white font-medium">
          Profile
        </span>
      </div>

      {/* Header Nav & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/office/clients")}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-red transition-colors"
        >
          <ArrowLeft size={18} /> Back to Directory
        </button>

        {/* Edit / Save Toggle Buttons */}
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-md transition-colors"
              >
                <Save size={16} /> Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* --- TOP PROFILE CARD --- */}
      <div className="bg-white dark:bg-brand-black p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row gap-8">
        {/* LEFT: Avatar & Biometrics */}
        <div className="flex flex-col items-center gap-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-100 dark:border-neutral-800 pb-6 md:pb-0 md:pr-8">
          {/* Avatar Circle */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-brand-black shadow-sm text-slate-300">
              {client.image ? (
                <img
                  src={client.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold">
                  {client.firstName[0]}
                  {client.lastName[0]}
                </span>
              )}
            </div>
            {isEditing && (
              <button className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} />
                <span className="text-xs font-bold mt-1">Change</span>
              </button>
            )}
          </div>

          {/* Biometric Status */}
          {client.biometricRegistered ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900/30">
              <Fingerprint size={14} /> Biometric Active
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full">
                Not Registered
              </div>
              {isEditing && (
                <button
                  onClick={handleScanFingerprint}
                  disabled={isScanning}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm transition-all ${isScanning ? "bg-gray-400 cursor-wait" : "bg-brand-red hover:bg-red-700"}`}
                >
                  {isScanning ? (
                    <>Scanning...</>
                  ) : (
                    <>
                      <Fingerprint size={14} /> Add Fingerprint
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Client Details Form */}
        <div className="flex-1 space-y-5">
          <div>
            {isEditing ? (
              <div className="grid grid-cols-3 gap-3 mb-2">
                <div>
                  <label className="text-xs text-gray-400">First Name</label>
                  <input
                    type="text"
                    value={client.firstName}
                    onChange={(e) =>
                      setClient({ ...client, firstName: e.target.value })
                    }
                    className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-1 text-lg font-bold outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Middle</label>
                  <input
                    type="text"
                    value={client.middleName}
                    onChange={(e) =>
                      setClient({ ...client, middleName: e.target.value })
                    }
                    className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-1 text-lg font-bold outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Last Name</label>
                  <input
                    type="text"
                    value={client.lastName}
                    onChange={(e) =>
                      setClient({ ...client, lastName: e.target.value })
                    }
                    className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-1 text-lg font-bold outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {client.firstName} {client.middleName} {client.lastName}
              </h1>
            )}

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-xs font-bold text-slate-700 dark:text-gray-300">
                {client.type} Account
              </span>
              <span className="flex items-center gap-1">ID: {client.id}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="group">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1 mb-1">
                <Phone size={12} /> Mobile Phone
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={client.phone}
                  onChange={(e) =>
                    setClient({ ...client, phone: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded p-2 text-sm focus:border-brand-blue outline-none"
                />
              ) : (
                <p className="text-slate-800 dark:text-gray-200 font-medium">
                  {client.phone}
                </p>
              )}
            </div>

            <div className="group">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1 mb-1">
                <Mail size={12} /> Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={client.email}
                  onChange={(e) =>
                    setClient({ ...client, email: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded p-2 text-sm focus:border-brand-blue outline-none"
                />
              ) : (
                <p className="text-slate-800 dark:text-gray-200 font-medium">
                  {client.email}
                </p>
              )}
            </div>

            <div className="group md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1 mb-1">
                <MapPin size={12} /> Postal Address / Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={client.address}
                  onChange={(e) =>
                    setClient({ ...client, address: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded p-2 text-sm focus:border-brand-blue outline-none"
                />
              ) : (
                <p className="text-slate-800 dark:text-gray-200 font-medium">
                  {client.address}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <div>
              <p className="text-xs text-gray-400 uppercase">Total Paid</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                KES {client.stats.totalPaid.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Arrears</p>
              <p className="text-lg font-bold text-red-600">
                KES {client.stats.arrears.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Plots</p>
              <p className="text-lg font-bold text-brand-blue">
                {client.stats.plotsCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: PLOTS & ACTIVITY --- */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-brand-black p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <MapIcon size={20} className="text-brand-red" /> Property Portfolio
          </h3>
          <div className="space-y-3">
            {client.plots.map((plot, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-gray-200">
                    {plot.name}
                  </p>
                  <p className="text-xs text-gray-500">Plot #{plot.plotNo}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${plot.status === "Fully Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {plot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-brand-black p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <History size={20} className="text-brand-blue" /> Recent Activity
          </h3>
          <div className="border-l-2 border-gray-200 dark:border-neutral-700 pl-4 space-y-6">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-brand-black"></div>
              <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                Payment Received
              </p>
              <p className="text-xs text-gray-500">
                Jan 20, 2026 • KES 50,000 via M-Pesa
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-brand-black"></div>
              <p className="text-sm font-medium text-slate-800 dark:text-gray-200">
                Allocated Plot #12
              </p>
              <p className="text-xs text-gray-500">
                Dec 15, 2025 • Malindi Gardens
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
