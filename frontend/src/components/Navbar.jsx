import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  School,
  LayoutDashboard,
  BarChart3,
  MapPin,
  Bell,
  Settings,
  BookOpen,
  Building2,
  Lightbulb,
  Users,
  Clock,
  BellRing,
  Menu,
  X,
  Search,
  User,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Campus Map",
      icon: <MapPin className="h-5 w-5" />,
      path: "/map",
    },
    {
      name: "Data Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/analytics",
    },
    {
      name: "Smart Lighting",
      icon: <Lightbulb className="h-5 w-5" />,
      path: "/lighting",
    },
    {
      name: "Building Management",
      icon: <Building2 className="h-5 w-5" />,
      path: "/building",
    },
    {
      name: "Library System",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/library",
    },
    {
      name: "Notifications",
      icon: <BellRing className="h-5 w-5" />,
      path: "/notifications",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  const handleMobileMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-800">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
          <div className="flex items-center">
            <School className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-white text-lg font-semibold">
              Smart Campus
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Top Bar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-gray-800 h-16 px-4">
          <div className="flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center ml-4">
              <School className="h-7 w-7 text-blue-400" />
              <span className="ml-2 text-white text-lg font-semibold">
                Smart Campus
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 text-gray-300 hover:text-white mr-3">
              <Search className="h-6 w-6" />
            </button>
            <button className="p-1 text-gray-300 hover:text-white mr-1">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative ml-2">
              <button
                className="flex items-center p-1 rounded-full text-gray-300 hover:text-white"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4">
                <School className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-white text-xl font-semibold">
                  Smart Campus
                </span>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`
                      }
                      onClick={handleMobileMenuClick}
                    >
                      {item.icon}
                      <span className="ml-4">{item.name}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;