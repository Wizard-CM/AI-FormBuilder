import FormUI from "@/components/pages/SingleFormPage/FormUI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Edit3, FileText } from "lucide-react";
import React from "react";

const page = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const formId = (await params).formId;
  

  if (!formId) {
    return <h1>No form id found for id {formId}</h1>;
  }
  const form: any = await prisma.form.findUnique({
    where: {
      id: Number(formId),
    },
  });
  return (
    <div className="container min-h-screen mx-auto px-4 py-12">
      {/* Main Form Card */}
      <Card className="max-w-2xl mx-auto relative overflow-hidden bg-gray-800/60 backdrop-blur-sm border  shadow-2xl  transition-all duration-500">
        {/* Gradient Border Effect */}

        {/* Content */}
        <div className="relative z-10">
          <CardHeader className="text-center pb-6">
            <div className="flex flex-col items-center justify-center  mb-4">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-semibold text-xl">FILL UP</span>
            </div>
            <CardTitle>
              <h2 className="text-2xl font-bold text-white "></h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto"></div>
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <FormUI form={form} isEditMode={false} formId={formId}  />
          </CardContent>
        </div>

        {/* Decorative Elements */}
      </Card>
    </div>
  );
};

export default page;
