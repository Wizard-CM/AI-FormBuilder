"use client";
import React from "react";

import { LinkIcon, Copy, CheckCircle } from "lucide-react";

import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  formId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FormPublishDialog: React.FC<Props> = ({ formId, open, onOpenChange }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const copyClipboard = () => {
    const link = `${BASE_URL}/forms/publish/${formId}`;
    navigator.clipboard.writeText(link);
    toast.success("Copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-black to-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <DialogTitle className="text-xl font-semibold text-white">
            Form Published Successfully!
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Your form is now live and ready to collect responses from users.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Share your form using this link:
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <Input
                readOnly
                className="px-3 flex-1 bg-transparent border-none outline-none text-white text-sm pxfocus:ring-0"
                value={`${BASE_URL}/forms/${formId}`}
              />
              <Button
                onClick={copyClipboard}
                size="sm"
                className="cursor-pointer bg-white text-black hover:bg-gray-100 px-3 py-1.5 h-auto font-medium"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
          
          <div className="pt-2">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormPublishDialog;