"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Edit2,
  Trash2,
  Eye,
  BarChart3,
  Calendar,
  User,
  Zap,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/types/form";
import { deleteForm } from "../../../../actions/deleteForm";

type Props = {
  form: Form;
};

const FormList: React.FC<Props> = ({ form }) => {
  const router = useRouter();

  const deleteFormHandler = async (formId: number) => {
    const data = await deleteForm(formId);

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="group relative">
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <Card className="relative w-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Card header with gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

        <CardHeader className="pb-4">
          {/* Title with icon */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-gray-600 flex-shrink-0">
                <FileText className="w-4 h-4 text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg font-bold text-white truncate">
                  {form.content.formTitle}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">
                    Created recently
                  </span>
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Active</span>
            </div>
          </div>

          <CardDescription className="text-gray-400 mt-3">
            Streamline your data collection with this AI-generated form
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Stats section */}
          <Link
            href={`/forms/submission/${form.id}`}
            className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">Submissions</span>
            </div>
            <div>
              <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200">
                <span>{form.submissions}</span>
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </Link>
        </CardContent>

        <CardFooter className="flex gap-3 pt-4 border-t border-gray-800/50">
          {/* Edit button */}
          <button
            onClick={() => router.push(`/forms/edit/${form.id}`)}
            className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-gray-500 rounded-lg text-gray-300 hover:text-white transition-all duration-200 group/edit"
          >
            <Edit2 className="w-4 h-4 group-hover/edit:rotate-12 transition-transform duration-200" />
            <span className="font-medium">Edit</span>
          </button>

          {/* Delete button */}
          <button
            onClick={() => deleteFormHandler(form.id)}
            className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-red-900/20 hover:bg-red-900/30 border border-red-800/50 hover:border-red-700 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 group/delete"
          >
            <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200" />
            <span className="font-medium">Delete</span>
          </button>
        </CardFooter>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      </Card>
    </div>
  );
};

export default FormList;
