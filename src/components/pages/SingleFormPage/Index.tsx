import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import React, { use } from "react";
import FormUI from "./FormUI";
import { Edit3, FileText, Sparkles, Activity, Zap, Save } from "lucide-react";

const SingleFormPage = async ({ formId }: { formId: string }) => {
  // Get the form from database
  const form: any = await prisma.form.findUnique({
    where: { id: Number(formId) },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b relative overflow-hidden">


      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          {/* Editor Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3  border border-purple-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 shadow-lg hover:shadow-purple-500/20 transition-all duration-500 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg blur opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg shadow-md">
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-medium  text-transparent">
              Form Editor
            </span>
            <div className="w-1 h-1 bg-purple-400/60 rounded-full animate-pulse"></div>
          </div>

          {/* Main Title */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent leading-tight">
              Edit Your Form
            </h1>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-md mx-auto">
              Customize and publish your form with our intuitive editor
            </p>
            <div className="flex justify-center">
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-full shadow-lg shadow-purple-500/30"></div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-gray-800/70 via-gray-700/50 to-gray-800/70  border border-purple-400/30 shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 hover:scale-[1.02] group">


          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute top-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"></div>
            <div className="absolute top-10 right-10 w-1 h-1 bg-violet-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 left-1/3 w-1 h-1 bg-indigo-400/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-300/25 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
              {/* Status and Icon Row */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="relative group/icon">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl blur opacity-60 group-hover/icon:opacity-80 transition-opacity duration-300"></div>
                  <div className="relative p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover/icon:shadow-xl transition-all duration-300 hover:rotate-6">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium bg-green-500/20 border border-green-400/30 px-2 sm:px-3 py-1 rounded-full">
                    Draft Mode
                  </span>
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 opacity-60" />
                </div>
              </div>

              <CardTitle>
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-violet-100 bg-clip-text text-transparent leading-tight px-2">
                    {form.content.formTitle || "Untitled Form"}
                  </h2>
                  
                  {/* Enhanced divider */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-full shadow-lg shadow-purple-500/40"></div>
                      <div className="absolute inset-0 w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-sm opacity-60"></div>
                    </div>
                  </div>

                  {/* Form metadata */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 pt-2">
                    <div className="flex items-center gap-1">
                      <Save className="w-3 h-3 text-purple-400" />
                      <span>Auto-saved</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-violet-400" />
                      <span>Live preview</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>Enhanced</span>
                    </div>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              {/* Form container with subtle background */}
              <div className="relative  rounded-xl border border-gray-600/20 p-4 sm:p-6">
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-xl pointer-events-none"></div>
                
                <div className="relative z-10">
                  <FormUI form={form} isEditMode={true} formId={formId} />
                </div>
              </div>
            </CardContent>
          </div>

        </Card>

        {/* Additional spacing for mobile */}
        <div className="mt-8 sm:mt-12 lg:mt-16"></div>
      </div>
    </div>
  );
};

export default SingleFormPage;