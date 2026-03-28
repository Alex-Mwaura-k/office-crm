import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  User,
  Search,
  MapPin,
  CheckCircle,
  CreditCard,
  FileText,
  ArrowRight,
  ArrowLeft,
  Printer,
  Check,
  Tag,
  Eye,
  Layers,
  Calendar,
  Calculator,
} from "lucide-react";

// --- MOCK DATA ---
const CLIENTS = [
  {
    id: "11071852",
    name: "Stanley Mutugi Irungu",
    phone: "0721688262",
    type: "Diaspora",
  },
  {
    id: "22045991",
    name: "Alex Mwaura Kariuki",
    phone: "0722000000",
    type: "Local",
  },
  { id: "33451002", name: "John Kamau", phone: "0712345678", type: "Local" },
];

const PROJECTS = [
  {
    id: 1,
    name: "Kithyoko Phase 2",
    location: "Machakos",
    price: 150000,
    available: 5,
    mapImage:
      "https://placehold.co/800x400/e2e8f0/475569?text=Kithyoko+Phase+2+Map",
  },
  {
    id: 2,
    name: "Malindi Gardens",
    location: "Malindi",
    price: 200000,
    available: 12,
    mapImage:
      "https://placehold.co/800x400/e2e8f0/475569?text=Malindi+Gardens+Map",
  },
  {
    id: 3,
    name: "Thika Greens (Sold Out)",
    location: "Thika",
    price: 450000,
    available: 0,
    mapImage: null,
  },
  {
    id: 4,
    name: "Nanyuki Plains",
    location: "Nanyuki",
    price: 350000,
    available: 8,
    mapImage:
      "https://placehold.co/800x400/e2e8f0/475569?text=Nanyuki+Plains+Map",
  },
];

const AVAILABLE_PLOTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: `Plot ${i + 1}`,
  status: "Available",
}));

const STEPS = [
  { id: 1, title: "Select Client", icon: User },
  { id: 2, title: "Select Property", icon: MapPin },
  { id: 3, title: "Payment & Discount", icon: CreditCard },
  { id: 4, title: "Confirm Sale", icon: FileText },
];

export default function POS() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // --- FORM STATE ---
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientSearch, setClientSearch] = useState("");

  const [selectedProject, setSelectedProject] = useState(null);
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedPlots, setSelectedPlots] = useState([]);

  const [payment, setPayment] = useState({
    mode: "Cash", // 'Cash' or 'Installment'
    duration: 6, // Default 6 months
    deposit: "",
    discount: "",
    method: "M-Pesa",
    reference: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [showFullMap, setShowFullMap] = useState(false);

  // --- HANDLERS ---
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const togglePlot = (plot) => {
    if (selectedPlots.find((p) => p.id === plot.id)) {
      setSelectedPlots((prev) => prev.filter((p) => p.id !== plot.id));
    } else {
      setSelectedPlots((prev) => [...prev, plot]);
    }
  };

  // --- CALCULATIONS ---
  const getSubtotal = () => {
    if (!selectedProject || selectedPlots.length === 0) return 0;
    return selectedPlots.length * selectedProject.price;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = parseInt(payment.discount) || 0;
    return Math.max(0, subtotal - discount);
  };

  const getBalance = () => {
    const total = getTotal();
    const deposit = parseInt(payment.deposit) || 0;
    return Math.max(0, total - deposit);
  };

  // Calculate Monthly Installment (Rounded UP to avoid decimals)
  const getMonthlyInstallment = () => {
    const balance = getBalance();
    if (balance <= 0) return 0;
    return Math.ceil(balance / payment.duration);
  };

  const handleCompleteSale = () => {
    setIsSuccess(true);
  };

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.available > 0 &&
      p.name.toLowerCase().includes(projectSearch.toLowerCase()),
  );

  // --- GENERATE DURATION OPTIONS ---
  const durationOptions = [];
  // 1 to 11 Months
  for (let i = 1; i < 12; i++) {
    durationOptions.push({ label: `${i} Month${i > 1 ? "s" : ""}`, value: i });
  }
  // 1 Year to 10 Years
  for (let i = 1; i <= 10; i++) {
    durationOptions.push({
      label: `${i} Year${i > 1 ? "s" : ""}`,
      value: i * 12,
    });
  }

  // --- RENDER SUCCESS ---
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] animate-scale-in text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
          <Check size={48} strokeWidth={4} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Sale Completed!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Successfully sold {selectedPlots.length} plot(s) to{" "}
          {selectedClient.name}.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-brand-black border border-gray-200 dark:border-neutral-700 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Printer size={18} /> Print Invoice
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-brand-red text-white rounded-lg font-bold shadow hover:bg-red-700 transition-colors"
          >
            New Sale
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          to="/office"
          className="hover:text-brand-blue flex items-center gap-1 transition-colors"
        >
          <Home size={14} /> Dashboard
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white font-medium">
          Point of Sale
        </span>
      </div>

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Make a Sale
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Follow the steps to record a new land transaction.
        </p>
      </div>

      {/* STEPPER UI */}
      <div className="flex items-center justify-between bg-white dark:bg-brand-black p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              <div
                className={`flex items-center gap-3 ${isActive ? "text-brand-red font-bold" : isCompleted ? "text-green-600 font-medium" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? "border-brand-red bg-red-50 dark:bg-red-900/20" : isCompleted ? "border-green-600 bg-green-50 dark:bg-green-900/20" : "border-gray-300 dark:border-neutral-700"}`}
                >
                  {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                </div>
                <span className="hidden md:inline text-sm">{step.title}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${isCompleted ? "bg-green-600" : "bg-gray-200 dark:bg-neutral-800"}`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- STEP CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: MAIN FORM AREA */}
        <div className="lg:col-span-2 bg-white dark:bg-brand-black p-6 md:p-8 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm min-h-[400px]">
          {/* STEP 1: SELECT CLIENT */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Find a Client
              </h2>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by Name, ID or Phone Number..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl text-slate-800 dark:text-white outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Recent Clients
                </p>
                {CLIENTS.filter((c) =>
                  c.name.toLowerCase().includes(clientSearch.toLowerCase()),
                ).map((client) => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedClient?.id === client.id ? "border-brand-blue bg-blue-50 dark:bg-blue-900/20 ring-1 ring-brand-blue" : "border-gray-100 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-gray-500 font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {client.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {client.phone} • ID: {client.id}
                        </p>
                      </div>
                    </div>
                    {selectedClient?.id === client.id && (
                      <CheckCircle className="text-brand-blue" size={24} />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
                <button
                  onClick={() => navigate("/office/clients/register")}
                  className="text-brand-red font-bold text-sm hover:underline"
                >
                  + Register New Client
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT PROPERTY */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              {/* --- PART A: PROJECT SELECTION --- */}
              {!selectedProject ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Select a Project
                    </h2>
                    <div className="relative w-1/2">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Filter projects..."
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg outline-none focus:border-brand-blue text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          onClick={() => {
                            setSelectedProject(project);
                            setSelectedPlots([]);
                          }}
                          className="border border-gray-200 dark:border-neutral-700 rounded-xl p-4 cursor-pointer hover:border-brand-blue hover:shadow-md transition-all bg-gray-50 dark:bg-neutral-900/50 group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors">
                                {project.name}
                              </h3>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin size={10} /> {project.location}
                              </p>
                            </div>
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
                              {project.available} Plots
                            </span>
                          </div>
                          <div className="text-xs font-mono text-gray-500 mt-2">
                            KES {project.price.toLocaleString()} / Plot
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-gray-400">
                        No projects found.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // --- PART B: PLOT SELECTION ---
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                      <div className="bg-white dark:bg-neutral-800 p-2 rounded-full text-brand-blue">
                        <Layers size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">
                          Selected Project
                        </p>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {selectedProject.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-xs font-bold text-brand-red hover:underline px-3 py-1"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedProject.mapImage && (
                      <div className="border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden relative group">
                        <img
                          src={selectedProject.mapImage}
                          alt="Map"
                          className="w-full h-40 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <span className="text-white text-xs font-bold flex items-center gap-2">
                            <Eye size={14} /> Reference Map
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-gray-500 uppercase">
                        Available Plots
                      </h3>
                      <span className="text-xs bg-brand-black text-white px-2 py-1 rounded">
                        {selectedPlots.length} Selected
                      </span>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {AVAILABLE_PLOTS.map((plot) => {
                        const isSelected = selectedPlots.find(
                          (p) => p.id === plot.id,
                        );
                        return (
                          <div
                            key={plot.id}
                            onClick={() => togglePlot(plot)}
                            className={`
                                                h-24 p-2 rounded-lg border text-center cursor-pointer flex flex-col items-center justify-center font-bold uppercase text-xs transition-colors
                                                ${
                                                  isSelected
                                                    ? "bg-brand-red border-brand-red text-white"
                                                    : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/10 dark:border-green-800 dark:text-green-400"
                                                }
                                              `}
                          >
                            <span>{plot.number}</span>
                            {isSelected && (
                              <CheckCircle size={16} className="mt-1" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PAYMENT & DISCOUNT */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* --- PAYMENT PLAN TOGGLE --- */}
              <div className="flex bg-gray-100 dark:bg-neutral-900 p-1 rounded-xl">
                <button
                  onClick={() => setPayment({ ...payment, mode: "Cash" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${payment.mode === "Cash" ? "bg-white dark:bg-neutral-800 shadow text-slate-900 dark:text-white" : "text-gray-500"}`}
                >
                  Full Cash Payment
                </button>
                <button
                  onClick={() =>
                    setPayment({ ...payment, mode: "Installment" })
                  }
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${payment.mode === "Installment" ? "bg-white dark:bg-neutral-800 shadow text-brand-blue" : "text-gray-500"}`}
                >
                  Installment Plan
                </button>
              </div>

              {/* Subtotal Display */}
              <div className="p-4 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    Subtotal ({selectedPlots.length} Plots):
                  </span>
                  <span className="font-bold">
                    KES {getSubtotal().toLocaleString()}
                  </span>
                </div>

                {/* Discount Input */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                  <Tag size={18} className="text-brand-gold" />
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Apply Discount (Amount)
                    </label>
                    <input
                      type="number"
                      value={payment.discount}
                      onChange={(e) =>
                        setPayment({ ...payment, discount: e.target.value })
                      }
                      className="w-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-gold"
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>
              </div>

              {/* --- INSTALLMENT SELECTOR (Conditional) --- */}
              {payment.mode === "Installment" && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-brand-blue font-bold mb-1">
                    <Calculator size={18} /> Installment Calculator
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-1.5">
                        Payment Duration
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <select
                          value={payment.duration}
                          onChange={(e) =>
                            setPayment({
                              ...payment,
                              duration: parseInt(e.target.value),
                            })
                          }
                          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 rounded-lg outline-none focus:border-brand-blue text-sm font-bold"
                        >
                          {durationOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">
                        Monthly Payment
                      </p>
                      <p className="text-xl font-bold text-brand-blue">
                        KES {getMonthlyInstallment().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Deposit & Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">
                    Initial Deposit (KES) *
                  </label>
                  <input
                    type="number"
                    value={payment.deposit}
                    onChange={(e) =>
                      setPayment({ ...payment, deposit: e.target.value })
                    }
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl outline-none focus:border-brand-blue font-bold text-lg"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">
                    Payment Method
                  </label>
                  <select
                    value={payment.method}
                    onChange={(e) =>
                      setPayment({ ...payment, method: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  >
                    <option>M-Pesa</option>
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">
                  Reference / Transaction ID
                </label>
                <input
                  type="text"
                  value={payment.reference}
                  onChange={(e) =>
                    setPayment({ ...payment, reference: e.target.value })
                  }
                  placeholder="e.g. QH45..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border border-dashed border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 p-6 rounded-xl">
                <h3 className="text-center font-bold text-xl uppercase tracking-widest text-slate-400 mb-6">
                  Sale Summary
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Client:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedClient?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Project:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedProject?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Selected Plots:</span>
                    <div className="text-right">
                      {selectedPlots.map((p) => (
                        <span
                          key={p.id}
                          className="block font-bold text-slate-900 dark:text-white"
                        >
                          {p.number}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 dark:border-neutral-800 my-2"></div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal:</span>
                    <span className="font-medium">
                      KES {getSubtotal().toLocaleString()}
                    </span>
                  </div>
                  {payment.discount > 0 && (
                    <div className="flex justify-between text-brand-gold">
                      <span className="font-bold">Discount Applied:</span>
                      <span className="font-bold">
                        - KES {parseInt(payment.discount).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300 dark:border-neutral-700">
                    <span>Total Amount:</span>
                    <span>KES {getTotal().toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-brand-blue pt-2">
                    <span className="font-bold">Deposit Paid:</span>
                    <span className="font-bold">
                      - KES {parseInt(payment.deposit || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-4 text-brand-red">
                    <span>Balance Due:</span>
                    <span>KES {getBalance().toLocaleString()}</span>
                  </div>

                  {/* --- INSTALLMENT SUMMARY --- */}
                  {payment.mode === "Installment" && getBalance() > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center border border-blue-100 dark:border-blue-800">
                      <p className="text-xs text-blue-800 dark:text-blue-300 mb-1">
                        Payment Plan Active
                      </p>
                      <p className="font-bold text-brand-blue">
                        KES {getMonthlyInstallment().toLocaleString()} / Month
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        for {payment.duration} months
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                <CheckCircle size={20} className="shrink-0 mt-0.5" />
                <p>
                  By clicking "Complete Sale", an invoice will be generated, and
                  the selected plots will be marked as <strong>Booked</strong>.
                </p>
              </div>
            </div>
          )}

          {/* --- FOOTER ACTIONS --- */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 dark:border-neutral-800">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-gray-500 hover:text-slate-800 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={18} /> Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !selectedClient) ||
                  (currentStep === 2 &&
                    (selectedPlots.length === 0 || !selectedProject))
                }
                className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleCompleteSale}
                className="flex items-center gap-2 bg-brand-red text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all animate-pulse-slow"
              >
                Complete Sale <CheckCircle size={18} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: SUMMARY CARD (Sticky Sidebar) */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-brand-black text-white p-6 rounded-xl shadow-lg sticky top-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Transaction Draft
            </h3>

            <div className="space-y-4">
              {/* Customer Section */}
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedClient ? "bg-brand-gold text-brand-black" : "bg-neutral-800 text-gray-500"}`}
                >
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Customer</p>
                  <p className="font-bold text-sm">
                    {selectedClient?.name || "Not Selected"}
                  </p>
                </div>
              </div>

              {/* Property Section */}
              <div className="flex items-start gap-3 pb-4 border-b border-neutral-800">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedProject ? "bg-brand-blue text-white" : "bg-neutral-800 text-gray-500"}`}
                >
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Property</p>
                  <p className="font-bold text-sm">
                    {selectedProject ? selectedProject.name : "Not Selected"}
                  </p>

                  {/* --- UPDATED PLOT LISTING WITH SEPARATE LINES --- */}
                  {selectedPlots.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-400">
                        Selected Plots:{" "}
                        <span className="text-brand-gold font-bold">
                          {selectedPlots
                            .map((p) => p.number.replace("Plot ", ""))
                            .join(", ")}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        Total Plots:{" "}
                        <span className="text-white font-bold">
                          {selectedPlots.length}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Totals Section */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span>KES {getSubtotal().toLocaleString()}</span>
                </div>
                {payment.discount > 0 && (
                  <div className="flex justify-between text-sm mb-2 text-brand-gold">
                    <span className="text-gray-400">Discount</span>
                    <span>
                      - KES {parseInt(payment.discount).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-xl font-bold pt-4 border-t border-neutral-800">
                  <span>Total</span>
                  <span>KES {getTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
