import React, { useState } from "react";
import {
  Search,
  Plus,
  Fingerprint,
  User,
  Filter,
  ChevronRight,
  Home, // <--- Added Home Icon
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom"; // <--- Added Link

// MOCK DATA
const MOCK_CLIENTS = [
  {
    id: "11071852",
    name: "Stanley Mutugi Irungu",
    phone: "0721688262",
    type: "Diaspora",
    plots: 3,
    arrears: 0,
    biometric: true,
    image: "https://i.pravatar.cc/150?u=11071852",
  },
  {
    id: "22045991",
    name: "Alex Mwaura kariuki",
    phone: "0722000000",
    type: "Local",
    plots: 1,
    arrears: 15000,
    biometric: false,
    image: null,
  },
  {
    id: "33451002",
    name: "John Kamau",
    phone: "0712345678",
    type: "Local",
    plots: 5,
    arrears: 0,
    biometric: true,
    image: "https://i.pravatar.cc/150?u=33451002",
  },
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredClients = MOCK_CLIENTS.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.includes(searchTerm),
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* --- BREADCRUMBS --- */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          to="/office"
          className="hover:text-brand-blue flex items-center gap-1 transition-colors"
        >
          <Home size={14} /> Dashboard
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white font-medium">
          Client Database
        </span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Client Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage records, photos, and biometrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Fingerprint size={18} className="text-brand-gold" />
            <span className="hidden md:inline">Scan Fingerprint</span>
          </button>
          <button
            onClick={() => navigate("/office/clients/register")}
            className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors"
          >
            <Plus size={18} />
            <span>Register Client</span>
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white dark:bg-brand-black p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by National ID, Name or Phone..."
          className="flex-1 bg-transparent outline-none text-slate-800 dark:text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full text-gray-500">
          <Filter size={18} />
        </button>
      </div>

      {/* TABLE HEADERS */}
      <div className="hidden md:grid grid-cols-[3.5rem_1.5fr_100px_150px_2rem] gap-4 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
        <div className="text-center">Photo</div>
        <div>Client Details</div>
        <div className="text-center">Plots</div>
        <div className="text-right">Arrears</div>
        <div></div>
      </div>

      {/* CLIENT LIST */}
      <div className="space-y-3">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => navigate(`/office/clients/${client.id}`)}
            className="bg-white dark:bg-brand-black p-3 md:p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all cursor-pointer grid grid-cols-1 md:grid-cols-[3.5rem_1.5fr_100px_150px_2rem] gap-4 items-center group"
          >
            {/* PHOTO AVATAR */}
            <div className="flex md:justify-center">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700">
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User size={24} />
                    </div>
                  )}
                </div>
                {/* Biometric Badge */}
                {client.biometric && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-white dark:bg-brand-black rounded-full p-0.5 shadow-sm"
                    title="Biometrics Registered"
                  >
                    <div className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 rounded-full p-1">
                      <Fingerprint size={12} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {client.name}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-mono text-xs bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-gray-300">
                  ID: {client.id}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{client.phone}</span>
              </div>
            </div>

            {/* PLOTS */}
            <div className="flex flex-row md:flex-col justify-between md:justify-center items-center">
              <span className="md:hidden text-xs text-gray-400 uppercase">
                Plots Owned
              </span>
              <span className="font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-neutral-800 px-3 py-1 rounded-md min-w-[3rem] text-center">
                {client.plots}
              </span>
            </div>

            {/* ARREARS */}
            <div className="flex flex-row md:flex-col justify-between md:justify-center items-end md:items-end">
              <span className="md:hidden text-xs text-gray-400 uppercase">
                Total Arrears
              </span>
              <span
                className={`font-bold ${client.arrears > 0 ? "text-red-600" : "text-green-600"}`}
              >
                KES {client.arrears.toLocaleString()}
              </span>
            </div>

            {/* ARROW */}
            <div className="hidden md:flex justify-end">
              <ChevronRight className="text-gray-300 group-hover:text-brand-red transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
