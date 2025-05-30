import GenerateFormInput from "@/components/GenerateFormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { getMyForms } from "../../../../actions/getMyForms";
import {
  Plus,
  Zap,
  FileText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import FormList from "@/components/pages/MyFormsPage/FormList";

const MyForm = async () => {
  const forms = await getMyForms();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center  md:justify-between mb-8 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl">
          {/* Left side - Title with icon */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-gray-700">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="font-bold text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Forms
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Manage and create your AI-powered forms
              </p>
            </div>
          </div>

          {/* Right side - Create button */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-blue-500/20">
                {/* Button glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                <div className="relative flex items-center gap-2 ">
                  <Plus className="w-5 h-5" />
                  <span >Create New Form</span>
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-2xl">
              <DialogHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Create New Form
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-400 text-lg">
                  Write a detailed prompt to generate your perfect form with AI
                  assistance.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <GenerateFormInput />
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms?.data?.map((form: any, index: number) => (
            <FormList key={index} form={form} />
          ))}
        </div>

        {/* Empty state (if no forms) */}
        {(!forms?.data || forms.data.length === 0) && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full mb-6">
              <FileText className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No forms yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first AI-powered form to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyForm;
