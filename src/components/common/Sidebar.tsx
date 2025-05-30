"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Menu,
  X,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import { useGlobalContext } from "@/context/context";
import { signOut, useSession } from "next-auth/react";

interface SidebarItem {
  title: string;
  url: string;
  icon: string;
}

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: "Home",
  },
  {
    title: "Forms",
    url: "/forms",
    icon: "FileText",
  },
  // {
  //   title: "Analytics",
  //   url: "/analytics",
  //   icon: "BarChart3",
  // },
];

const iconMap = {
  Home: Home,
  FileText: FileText,
  BarChart3: BarChart3,
};

const Sidebar: React.FC = () => {
  const { isCollapsed, setIsCollapsed } = useGlobalContext();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isPublishedRoute = pathname.includes("/forms/publish");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={20} /> : <Home size={20} />;
  };

  return (
    <div
      className={`min-h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out ${
        isCollapsed && !isPublishedRoute ? "lg:w-[5%]" : "lg:w-[18%]"
      }  border-r border-gray-700/50 backdrop-blur-xl shadow-2xl z-50`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none" />

      {/* Header with toggle button */}
      <div
        className={`relative flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }  p-4 border-b border-gray-700/50 `}
      >
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="relative p-2 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-gray-600/50 hover:to-gray-700/50 border border-gray-600/30 transition-all duration-300 text-gray-200 hover:text-white shadow-lg hover:shadow-xl group cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="relative flex-1 p-4">
        <ul
          className={`space-y-3 flex flex-col ${
            isCollapsed ? "items-center" : ""
          }`}
        >
          {items.map((item, index) => {
            const isActive = pathname === item.url;
            return (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className={`relative flex items-center p-3 rounded-xl transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 text-white border border-blue-500/30 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-800/30 border border-transparent hover:border-gray-600/30"
                  }`}
                  title={isCollapsed ? item.title : ""}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-r-full" />
                  )}

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                  <span
                    className={`relative flex-shrink-0 ${
                      isCollapsed ? "mx-auto" : "mr-3"
                    } ${
                      isActive ? "text-blue-400" : "group-hover:text-blue-400"
                    } transition-colors duration-300`}
                  >
                    {getIcon(item.icon)}
                  </span>
                  {!isCollapsed && (
                    <span className="relative font-medium tracking-wide">
                      {item.title}
                    </span>
                  )}

                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section at bottom */}
      <div className="relative border-t border-gray-700/50 p-4 ">
        {/* User profile */}
        <div
          className={`flex items-center mb-3 p-3 rounded-xl bg-gradient-to-r from-gray-700/20 to-gray-800/20 hover:from-gray-600/30 hover:to-gray-700/30 border border-gray-600/20 hover:border-gray-500/30 transition-all duration-300 cursor-pointer group ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div
            className={`relative w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300 ${
              isCollapsed ? "" : "mr-3"
            }`}
          >
            {/* Animated ring on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 animate-pulse" />

            {session?.user?.image ? (
              <img
                src={session?.user?.image}
                className="w-full h-full rounded-full object-cover border-2 border-white/20"
                alt=""
              />
            ) : (
              <User size={16} className="text-white" />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-100 truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session?.user?.email || "user@example.com"}
              </p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          className={`relative w-full cursor-pointer flex items-center p-3 rounded-xl text-gray-300 hover:text-red-400 transition-all duration-300 group overflow-hidden border border-transparent hover:border-red-500/30 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
          onClick={() => {
            signOut();
          }}
        >
          {/* Hover background */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

          <LogOut
            size={16}
            className={`relative flex-shrink-0 ${
              isCollapsed ? "" : "mr-3"
            } group-hover:rotate-12 transition-transform duration-300`}
          />
          {!isCollapsed && (
            <span className="relative text-sm font-medium tracking-wide">
              Logout
            </span>
          )}

          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm" />
        </button>
      </div>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden -z-10"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
