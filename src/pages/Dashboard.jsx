import React from "react";
import {
  Wallet,
  Map,
  Users,
  Calendar,
  CreditCard,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { CURRENCY } from "../office/constants";

// --- REUSABLE STAT CARD COMPONENT ---
const StatCard = ({ title, value, icon: Icon, color, trend, subtext }) => {
  // COLOR THEMES (Now with Dark Mode Support)
  // We keep the cards light-colored even in dark mode for contrast,
  // but we can dim them slightly if you prefer. For now, this ensures readability.
  const themes = {
    gold: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-800",
      text: "text-amber-900 dark:text-amber-100",
      icon: "text-amber-600 dark:text-amber-400",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-800",
      text: "text-blue-900 dark:text-blue-100",
      icon: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-100 dark:border-emerald-800",
      text: "text-emerald-900 dark:text-emerald-100",
      icon: "text-emerald-600 dark:text-emerald-400",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-100 dark:border-red-800",
      text: "text-red-900 dark:text-red-100",
      icon: "text-red-600 dark:text-red-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-100 dark:border-purple-800",
      text: "text-purple-900 dark:text-purple-100",
      icon: "text-purple-600 dark:text-purple-400",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      border: "border-cyan-100 dark:border-cyan-800",
      text: "text-cyan-900 dark:text-cyan-100",
      icon: "text-cyan-600 dark:text-cyan-400",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-100 dark:border-orange-800",
      text: "text-orange-900 dark:text-orange-100",
      icon: "text-orange-600 dark:text-orange-400",
    },
    slate: {
      bg: "bg-slate-100 dark:bg-slate-800",
      border: "border-slate-200 dark:border-slate-700",
      text: "text-slate-800 dark:text-slate-100",
      icon: "text-slate-600 dark:text-slate-400",
    },
  };

  const theme = themes[color] || themes.slate;

  return (
    <div
      className={`${theme.bg} border ${theme.border} p-5 rounded-2xl shadow-sm flex items-center justify-between transition-transform hover:-translate-y-1`}
    >
      {/* LEFT SIDE: TEXT */}
      <div className="flex flex-col h-full justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className={`text-2xl font-extrabold ${theme.text} mb-1`}>
          {value}
        </h3>

        {/* Trend Pill */}
        <div className="h-6 flex items-center">
          {trend ? (
            <div className="flex items-center gap-1 text-xs font-bold text-green-700 dark:text-green-300 bg-white/60 dark:bg-black/20 px-2 py-1 rounded-md w-fit">
              <ArrowUpRight size={12} />
              {trend}
            </div>
          ) : (
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              {subtext || "No recent changes"}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: ICON */}
      <div
        className={`w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center shadow-sm shrink-0 ${theme.icon}`}
      >
        <Icon size={24} strokeWidth={2.5} />
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD PAGE ---
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      {/* FIX: Added dark:border-gray-800 to the line and dark:text-white to text */}
      <div className="flex items-end justify-between border-b border-gray-200 dark:border-neutral-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Overview of daily operations
          </p>
        </div>

        {/* System Status - Visible on Desktop */}
        <div className="hidden md:block text-right">
          <p className="text-xs text-gray-400 font-medium uppercase">
            System Status
          </p>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Live
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Sales (Month)"
          value={`${CURRENCY} 0.00`}
          icon={Wallet}
          color="gold"
          trend="+12% vs last month"
        />

        <StatCard
          title="Sales Today"
          value={`${CURRENCY} 0.00`}
          icon={Wallet}
          color="green"
          subtext="No sales yet today"
        />

        <StatCard
          title="Plots Sold (Month)"
          value="0"
          icon={Map}
          color="blue"
          trend="+4 New this month"
        />

        <StatCard
          title="Plots Sold (Today)"
          value="0"
          icon={Map}
          color="cyan"
          subtext="Waiting for updates..."
        />

        <StatCard
          title="Remaining Plots"
          value="156"
          icon={Map}
          color="red"
          subtext="Across all projects"
        />

        <StatCard
          title="Deposits Today"
          value={`${CURRENCY} 0.00`}
          icon={CreditCard}
          color="purple"
          subtext="Via M-Pesa & Bank"
        />

        <StatCard
          title="Upcoming Deposits"
          value="5"
          icon={Calendar}
          color="orange"
          subtext="Due next 3 days"
        />

        <StatCard
          title="Active Agents Today"
          value="0"
          icon={Briefcase}
          color="slate"
          subtext="Agents who made a sale"
        />
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Big Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 min-h-[300px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
          <TrendingUp size={40} className="mb-2 opacity-20" />
          <p>Sales Performance Chart</p>
        </div>

        {/* Activity Log */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 min-h-[300px] flex flex-col">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wide">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <p className="text-sm text-slate-700 dark:text-gray-300 font-medium">
                  New Plot Booked
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  James Kamau - Kithyoko Plot 4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
