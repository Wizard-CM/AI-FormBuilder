import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, TrendingUp, Activity, Zap } from "lucide-react";

type Props = {
  noOfSubmissions: number;
};

const Analytics: React.FC<Props> = ({ noOfSubmissions }) => {
  return (
    <div className="w-full">
      <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-800/70 via-gray-700/50 to-gray-800/70  border border-purple-400/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 hover:scale-105 hover:border-purple-400/50">
        {/* Animated Gradient Border Effect */}



        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-violet-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <CardHeader className="flex flex-row items-center justify-between pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="font-bold text-white text-base sm:text-lg lg:text-xl group-hover:text-gray-100 transition-colors flex items-center gap-2">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="hidden sm:inline">Job Applications</span>
              <span className="sm:hidden">Applications</span>
            </CardTitle>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 hover:rotate-12">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
            {/* Main Number Display */}
            <div className="mb-4 sm:mb-6">
              <div className="relative mb-2 sm:mb-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
                  {noOfSubmissions.toLocaleString()}
                </div>
                {/* Glow effect behind number */}
                <div className="absolute inset-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400/20 blur-sm">
                  {noOfSubmissions.toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base font-medium">
                  Total submissions to your forms
                </p>
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 opacity-60" />
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm text-gray-400 font-medium">Progress</span>
                <span className="text-xs sm:text-sm text-purple-300 font-medium">
                  {Math.min((noOfSubmissions / 100) * 100, 100).toFixed(0)}%
                </span>
              </div>
              
              <div className="relative w-full bg-gray-700/50 rounded-full h-2 sm:h-3 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full"></div>
                
                {/* Progress fill */}
                <div
                  className="relative bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-purple-400/40 overflow-hidden"
                  style={{
                    width: `${Math.min((noOfSubmissions / 100) * 100, 100)}%`,
                  }}
                >
                  {/* Animated shine effect */}
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-300">Active</span>
                </div>
              </div>
            </div>


          </CardContent>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 right-0 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-br from-purple-400/15 via-violet-400/10 to-transparent rounded-full transform translate-x-8 sm:translate-x-10 lg:translate-x-12 -translate-y-8 sm:-translate-y-10 lg:-translate-y-12 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="absolute bottom-0 left-0 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-gradient-to-tr from-indigo-400/15 via-purple-400/10 to-transparent rounded-full transform -translate-x-6 sm:-translate-x-8 lg:-translate-x-10 translate-y-6 sm:translate-y-8 lg:translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/20 rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 border border-violet-400/30 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
      </Card>
    </div>
  );
};

export default Analytics;