import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Search,
  Map,
  Plus,
  LayoutGrid,
  List,
  ArrowLeft,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
} from "lucide-react";

// --- MOCK DATA ---
const PROJECTS = [
  {
    id: "p1",
    name: "Kithyoko Phase 2",
    location: "Machakos County",
    totalPlots: 50,
    sold: 45,
    price: "150,000",
    status: "Selling Out",
    color: "bg-red-100 text-red-700",
  },
  {
    id: "p2",
    name: "Malindi Gardens",
    location: "Malindi, Kilifi",
    totalPlots: 120,
    sold: 30,
    price: "200,000",
    status: "New",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "p3",
    name: "Thika Greens Ext",
    location: "Thika",
    totalPlots: 80,
    sold: 80,
    price: "450,000",
    status: "Sold Out",
    color: "bg-gray-100 text-gray-700",
  },
];

const PLOT_STATUSES = ["Available", "Reserved", "Booked", "Sold Out"];

// Generate 40 Mock Plots
const MOCK_PLOTS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  number: `Plot ${i + 1}`,
  size: "50x100",
  price: 150000,
  status: PLOT_STATUSES[i % 4],
  buyer: i % 4 === 0 ? "-" : "Client Name",
}));

export default function ProjectsInventory() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  // --- FILTER STATE ---
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  // --- FILTER LOGIC ---
  const filteredPlots = MOCK_PLOTS.filter((plot) => {
    if (statusFilter === "All") return true;
    return plot.status === statusFilter;
  });

  // --- COLOR LOGIC ---
  const getStatusColor = (status) => {
    switch (status) {
      case "Available": // GREEN
        return "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400";
      case "Reserved": // BLUE
        return "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400";
      case "Booked": // YELLOW
        return "bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400";
      case "Sold Out": // RED
        return "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10 relative">
      {/* --- POPUP MODAL (Global) --- */}
      {selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-brand-black w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedPlot.number}
                </h3>
                <p className="text-sm text-gray-500">{selectedProject.name}</p>
              </div>
              <button
                onClick={() => setSelectedPlot(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div
                className={`flex items-center gap-3 p-4 rounded-xl border ${getStatusColor(selectedPlot.status)}`}
              >
                {selectedPlot.status === "Available" && (
                  <CheckCircle size={24} />
                )}
                {selectedPlot.status === "Sold Out" && (
                  <AlertCircle size={24} />
                )}
                {(selectedPlot.status === "Reserved" ||
                  selectedPlot.status === "Booked") && <Clock size={24} />}
                <div>
                  <p className="font-bold text-lg">{selectedPlot.status}</p>
                  <p className="text-xs opacity-80 uppercase tracking-wide">
                    Current Status
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase mb-1">Price</p>
                  <p className="font-bold text-slate-800 dark:text-white">
                    KES {selectedPlot.price.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase mb-1">Size</p>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {selectedPlot.size}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 flex gap-3">
              {selectedPlot.status === "Available" ? (
                <button className="flex-1 bg-brand-red text-white py-2.5 rounded-lg font-bold shadow hover:bg-red-700 transition-colors">
                  Sell / Book Plot
                </button>
              ) : (
                <button className="flex-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-slate-700 dark:text-gray-300 py-2.5 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                  Manage Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- BREADCRUMBS --- */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          to="/office"
          className="hover:text-brand-blue flex items-center gap-1 transition-colors"
        >
          <Home size={14} /> Dashboard
        </Link>
        <ChevronRight size={14} />
        <span
          className={
            selectedProject
              ? "hover:text-brand-blue cursor-pointer transition-colors"
              : "text-slate-900 dark:text-white font-medium"
          }
          onClick={() => setSelectedProject(null)}
        >
          Project Inventory
        </span>
        {selectedProject && (
          <>
            <ChevronRight size={14} />
            <span className="text-slate-900 dark:text-white font-medium">
              {selectedProject.name}
            </span>
          </>
        )}
      </div>

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {selectedProject ? (
          <>
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-slate-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700 order-last md:order-first"
            >
              <ArrowLeft size={18} /> Back to Projects
            </button>

            <div className="text-right">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedProject.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Select a plot to view details
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Land Inventory
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Manage projects, plots pricing, and availability
              </p>
            </div>

            <button
              onClick={() => navigate("/office/inventory/add")}
              className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors"
            >
              <Plus size={18} />
              <span>Add New Project</span>
            </button>
          </>
        )}
      </div>

      {/* ================================================================================== */}
      {/* VIEW 1: PROJECT LIST (CARDS) */}
      {/* ================================================================================== */}
      {!selectedProject && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-800 p-5 rounded-xl shadow-sm hover:shadow-md hover:border-brand-red/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-brand-blue transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Map size={12} /> {project.location}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${project.color}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-gray-500">
                    {project.sold} / {project.totalPlots} Sold
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {Math.round((project.sold / project.totalPlots) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${project.sold === project.totalPlots ? "bg-emerald-500" : "bg-brand-gold"}`}
                    style={{
                      width: `${(project.sold / project.totalPlots) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================================================================== */}
      {/* VIEW 2: PLOTS LIST (WITH FILTER) */}
      {/* ================================================================================== */}
      {selectedProject && (
        <div className="bg-white dark:bg-brand-black border border-gray-100 dark:border-neutral-800 rounded-xl p-6 shadow-sm animate-fade-in">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* --- LEFT SIDE: Title + Filter --- */}
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Map className="text-brand-blue" size={20} />
                Plot Map
              </h2>

              {/* FILTER MOVED HERE */}
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm outline-none focus:border-brand-blue cursor-pointer text-slate-700 dark:text-gray-300"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Booked">Booked</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>
            </div>

            {/* --- RIGHT SIDE: Search + View Toggle --- */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:w-48">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search plot..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm outline-none focus:border-brand-blue"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-neutral-900 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white dark:bg-neutral-800 shadow text-brand-black dark:text-white" : "text-gray-400"}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${viewMode === "list" ? "bg-white dark:bg-neutral-800 shadow text-brand-black dark:text-white" : "text-gray-400"}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredPlots.map((plot) => (
                <div
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className={`
                                p-3 rounded-lg border text-center cursor-pointer transition-all hover:scale-105 active:scale-95
                                ${getStatusColor(plot.status)}
                            `}
                >
                  <p className="text-xs font-bold opacity-60 uppercase">
                    {plot.number}
                  </p>
                  <p className="font-bold text-lg my-1 truncate">
                    {plot.status}
                  </p>
                  <p className="text-[10px] opacity-70 truncate">
                    {plot.status === "Available"
                      ? `KES ${plot.price.toLocaleString()}`
                      : plot.buyer}
                  </p>
                </div>
              ))}
              {filteredPlots.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-400">
                  No plots found with status "{statusFilter}"
                </div>
              )}
            </div>
          ) : (
            /* List View */
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-gray-50 dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800">
                  <tr>
                    <th className="px-4 py-3">Plot No</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Price (KES)</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Buyer</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                  {filteredPlots.map((plot) => (
                    <tr
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className="hover:bg-gray-50 dark:hover:bg-neutral-900/50 cursor-pointer"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        {plot.number}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{plot.size}</td>
                      <td className="px-4 py-3 font-mono text-slate-700 dark:text-gray-300">
                        {plot.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded uppercase border bg-opacity-10 border-opacity-20 ${getStatusColor(plot.status)}`}
                        >
                          {plot.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{plot.buyer}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-brand-blue hover:underline text-xs">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPlots.length === 0 && (
                <div className="py-10 text-center text-gray-400">
                  No plots found with status "{statusFilter}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
