"use client";
import React, { ChangeEvent, useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { generateForm } from "../../actions/generateForm";
import { Lock, Sparkles, ArrowRight, Wand2, Plus } from "lucide-react";
import Loader from "./common/Loader";

const MAX_FREE_FORM = 3;

type InitialState = {
  message: string;
  success: boolean;
  data?: any;
};

const initialState: InitialState = {
  message: "",
  success: false,
};
type Props = {
  text?: string;
  totalForms?: number;
  isSubscribed?: boolean;
};

const GenerateFormInput: React.FC<Props> = ({
  text,
  totalForms,
  isSubscribed,
}) => {
  const [description, setDescription] = useState<string | undefined>("");
  const [state, formAction] = useActionState(generateForm, initialState);
  const router = useRouter();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  //   useEffect(() => {
  //     setDescription(text);
  //   }, [text]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      // console.log(state.data,"Response Form Data")
      router.push(`/forms/edit/${state.data.id}`);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [router, state]);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>

      {/* Main form container */}
      <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-gray-700">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L13.09 8.26L18 7L16.74 12.26L22 14L15.74 15.09L17 20L11.74 18.74L10 24L8.26 17.74L3 19L4.26 13.74L2 12L8.26 10.91L7 6L12.26 7.26L12 2Z"
              fill="currentColor"
              opacity="0.1"
            />
          </svg>
        </div>

        <form action={formAction} className="space-y-6">
          {/* Header section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-gray-600 rounded-full px-4 py-2 mb-4">
              <Wand2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300 font-medium">
                AI Form Generator
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Input section */}
          <div className="relative">
            {/* Input container with enhanced styling */}
            <div className="relative group">
              {/* Input field with icon */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200">
                  <Sparkles className="w-5 h-5" />
                </div>

                <Input
                  id="description"
                  name="description"
                  value={description}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Describe your form... e.g., 'contact form with name, email and message'"
                  required
                  className="w-full h-16 pl-12 pr-6 bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600 focus:border-blue-500/50 rounded-xl text-gray-200 placeholder-gray-500 text-lg transition-all duration-300 backdrop-blur-sm focus:bg-gray-800/70"
                />

                {/* Floating glow on focus */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Character limit indicator */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Helper text */}
            <p className="text-xs text-gray-500 mt-2 ml-1">
              💡 Be specific about fields, validation rules, and styling
              preferences
            </p>
          </div>

          {/* Action buttons section */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <SubmitButton />
          </div>

          {/* Decorative bottom section */}
          <div className="flex items-center justify-center gap-8 pt-6 border-t border-gray-800/50">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 bg-green-400/20 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span>AI Ready</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 bg-blue-400/20 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              </div>
              <span>Instant Generation</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 bg-purple-400/20 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              </div>
              <span>Fully Responsive</span>
            </div>
          </div>
        </form>
      </div>

      {/* Floating action indicators */}
      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-700"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-1200"></div>
        </div>
      </div>
    </div>
  );
};

export default GenerateFormInput;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 min-w-[180px] cursor-pointer"
    >
      {/* Button background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

      {/* Button content */}
      <div className="relative flex items-center justify-center gap-3">
        {pending ? (
          <Loader />
        ) : (
          <>
            <div className="flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              <Wand2 className="w-5 h-5" />
            </div>
            <span className="text-lg">Generate Form</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-pulse"></div>
    </Button>
  );
};
