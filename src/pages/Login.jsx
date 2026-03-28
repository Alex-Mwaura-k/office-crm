import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { TEST_CREDENTIALS } from "../office/constants"; // Adjust path if your constants is elsewhere

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check credentials against our constants
    if (
      username === TEST_CREDENTIALS.username &&
      password === TEST_CREDENTIALS.password
    ) {
      setError("");
      // Redirect to the dashboard on success
      navigate("/office");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray dark:bg-brand-black p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 p-8">
        
        {/* Logo Branding */}
        <div className="flex justify-center mb-4">
          <h1 className="font-bold text-3xl tracking-wider text-slate-900 dark:text-white">
            FEDHA<span>-</span><span className="text-brand-red">Office</span>
          </h1>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please sign in to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center animate-in fade-in">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red dark:text-white outline-none transition-all"
                placeholder="User"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red dark:text-white outline-none transition-all"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-red hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}