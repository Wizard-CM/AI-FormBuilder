import React from "react";
import { getFormStats } from "../../../../actions/getFormStats";
import Analytics from "@/components/pages/Analytics/Analytics";
import {
  Eye,
  TrendingUp,
  Users,
  BarChart3,
  Sparkles,
  Activity,
} from "lucide-react";
import Link from "next/link";

const page = async () => {
  const data = await getFormStats();

  return (
    <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
              </div>
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl">
                Track your form performance and submissions with real-time
                insights
              </p>
              <div className="flex justify-center sm:justify-start">
                <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-full shadow-lg shadow-purple-500/30"></div>
              </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="flex sm:flex-col gap-4 sm:gap-2 justify-center sm:justify-end items-center sm:items-end">
              <div className="text-center sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {data || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Total Forms
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full">
                <Activity className="w-3 h-3 text-green-400" />
                <span className="text-xs font-medium text-green-300">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Analytics Component */}
          <Link href={"/forms/submission/2"} className="sm:col-span-2 lg:col-span-1">
            <Analytics noOfSubmissions={data || 0} />
          </Link>

          {/* Conversion Rate Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/60 via-gray-700/40 to-gray-800/60 backdrop-blur-sm rounded-2xl border border-purple-400/20 p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 hover:border-purple-400/40">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-violet-600/5 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-gray-300 bg-green-500/20 border border-green-400/30 px-2 py-1 rounded-full font-medium">
                    +12%
                  </span>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Coming Soon
                </h3>
                <p className="text-gray-400 text-sm sm:text-base font-medium">
                  Conversion Rate Analytics
                </p>
                <div className="w-full bg-gray-700/50 rounded-full h-1.5 sm:h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-full rounded-full w-3/5 shadow-sm shadow-purple-400/30"></div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full transform translate-x-8 sm:translate-x-10 -translate-y-8 sm:-translate-y-10"></div>
            <Sparkles className="absolute bottom-2 right-2 w-4 h-4 text-purple-400/30 group-hover:text-purple-400/60 transition-colors duration-300" />
          </div>

          {/* Monthly Trends Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/60 via-gray-700/40 to-gray-800/60 backdrop-blur-sm rounded-2xl border border-purple-400/20 p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:scale-105 hover:border-violet-400/40">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span className="text-xs sm:text-sm text-gray-300 bg-violet-500/20 border border-violet-400/30 px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Coming Soon
                </h3>
                <p className="text-gray-400 text-sm sm:text-base font-medium">
                  Monthly Trends & Insights
                </p>
                <div className="w-full bg-gray-700/50 rounded-full h-1.5 sm:h-2">
                  <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full w-2/5 shadow-sm shadow-violet-400/30"></div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-tr from-violet-400/10 to-transparent rounded-full transform -translate-x-6 sm:-translate-x-8 translate-y-6 sm:translate-y-8"></div>
            <Activity className="absolute top-2 right-2 w-4 h-4 text-violet-400/30 group-hover:text-violet-400/60 transition-colors duration-300" />
          </div>

        </div>

        {/* Additional responsive spacing */}
        <div className="mt-8 sm:mt-12 lg:mt-16"></div>
      </div>
    </div>
  );
};

export default page;
