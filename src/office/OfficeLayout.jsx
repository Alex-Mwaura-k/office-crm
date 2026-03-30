import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Map,
  ShoppingCart,
  FileText,
  LogOut,
  Menu,
  UserCircle,
  Moon,
  Sun,
  X,
  Loader2
} from "lucide-react";

import { MENU_ITEMS } from "./constants";

export default function OfficeLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // --- LOGOUT ANIMATION STATE ---
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [countdown, setCountdown] = useState(3); // Changed to 3

  const handleLogout = () => {
    setIsLoggingOut(true);
    let timer = 3; // Changed to 3
    setCountdown(timer);

    // Start a 1-second interval
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer <= 0) {
        clearInterval(interval);
        navigate("/login");
      }
    }, 1000); // 1000ms = 1 second
  };

  // --- SMART THEME STATE ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // --- AUTOMATIC MOBILE RESIZE ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- THEME TOGGLE & SAVE LOGIC ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const getIconForPath = (path) => {
    switch (path) {
      case "/office":
        return <LayoutDashboard size={20} />;
      case "/office/pos":
        return <ShoppingCart size={20} />;
      case "/office/clients":
        return <Users size={20} />;
      case "/office/inventory":
        return <Map size={20} />;
      case "/office/employees":
        return <FileText size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  return (
    <>
      {/* --- LOGOUT OVERLAY --- */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md transition-opacity duration-500 animate-in fade-in">
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 size={48} className="text-brand-red animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Logging Out securely
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Please wait...
            </p>
            <div className="w-12 h-12 rounded-full border-2 border-brand-red flex items-center justify-center text-xl font-bold text-brand-red">
              {countdown}
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN LAYOUT (Fades out when logging out) --- */}
      <div 
        className={`flex h-screen bg-brand-gray text-brand-black dark:bg-brand-black dark:text-gray-100 font-sans transition-all duration-1000 overflow-hidden ${isLoggingOut ? 'opacity-20 scale-95 blur-sm' : 'opacity-100 scale-100'}`}
      >
        {/* --- MOBILE BACKDROP --- */}
        {isSidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          />
        )}

        {/* --- SIDEBAR --- */}
        <aside
          className={`
            fixed md:relative z-30 h-full 
            bg-brand-black text-white 
            transition-all duration-300 ease-in-out shadow-xl flex flex-col
            ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"}
          `}
        >
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
            <div className="flex items-center justify-center w-full">
              
              {/* Long Logo for Expanded Sidebar */}
              <img 
                src="/icons/long_logo.png" 
                alt="FEDHA Admin" 
                className={`h-8 w-auto object-contain ${!isSidebarOpen && "md:hidden"}`}
              />
              
              {/* Collapsed Sidebar State */}
              {!isSidebarOpen && (
                <span className="hidden md:block text-brand-red font-bold text-xl">
                  F
                </span>
              )}

            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
              const isActive =
                item.path === "/office"
                  ? location.pathname === "/office"
                  : location.pathname.startsWith(item.path);

              const icon = getIconForPath(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-brand-red text-white font-bold shadow-md"
                      : "text-gray-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }
                  >
                    {icon}
                  </span>
                  <span
                    className={`${!isSidebarOpen && "md:hidden"} whitespace-nowrap`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-neutral-800 bg-brand-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-brand-red shrink-0">
                <UserCircle size={24} />
              </div>
              <div className={`${!isSidebarOpen && "md:hidden"} overflow-hidden`}>
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-400 truncate">Manager</p>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT WRAPPER --- */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
          {/* HEADER */}
          <header className="h-16 bg-white dark:bg-brand-black shadow-sm flex items-center justify-between px-4 md:px-6 z-10 border-b border-gray-200 dark:border-neutral-800 transition-colors shrink-0">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md text-gray-600 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">
                {new Date().toLocaleDateString("en-KE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-slate-600 dark:text-yellow-400 transition-colors"
                  title="Toggle Theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-brand-red hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </header>

          {/* CONTENT SCROLL AREA */}
          <main className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-6 bg-brand-gray dark:bg-brand-black transition-colors">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}