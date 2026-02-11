import { Outlet, Link, useLocation } from "react-router-dom";
import LiveIndicator from "./LiveIndicator";
import { useEffect } from "react";
import socket from "../sockets/socket";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  const activeClass = (path) =>
    pathname === path
      ? "bg-white text-slate-900 shadow-sm" 
      : "text-slate-300 hover:text-white hover:bg-white/10";

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f7ff]">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Brand */}
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
                Admin <span className="text-blue-400">Panel</span>
              </h1>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/dashboard" className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeClass("/")}`}>
                  Dashboard
                </Link>
                <Link to="/users" className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeClass("/users")}`}>
                  Users
                </Link>
                <Link to="/services" className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeClass("/services")}`}>
                  Services
                </Link>
              </div>
            </div>

       
            <div className="flex items-center">
              <LiveIndicator />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links (Visible only on small screens) */}
        <div className="md:hidden border-t border-slate-700 flex justify-around p-2">
          <Link to="/" className={`px-3 py-2 rounded-md text-xs font-medium ${activeClass("/")}`}>Dash</Link>
          <Link to="/users" className={`px-3 py-2 rounded-md text-xs font-medium ${activeClass("/users")}`}>Users</Link>
          <Link to="/services" className={`px-3 py-2 rounded-md text-xs font-medium ${activeClass("/services")}`}>Services</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-8">
        <header className="mb-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            {pathname === "/" ? "Dashboard" : pathname.substring(1).charAt(0).toUpperCase() + pathname.slice(2)}
          </h2>
        </header>

        {/* The Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-slate-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
}