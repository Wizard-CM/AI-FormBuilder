import SingleFormPage from "@/components/pages/SingleFormPage/Index";
import React from "react";

const page = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const FormId = (await params).formId;

  return (
    <div className="min-h-screen ">

      <div className="relative z-10">
        <SingleFormPage formId={FormId} />
      </div>
    </div>
  );
};

export default page;
