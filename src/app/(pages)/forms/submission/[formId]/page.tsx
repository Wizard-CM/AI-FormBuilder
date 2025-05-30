import SubmissionsDetails from "@/components/pages/FormSubmission/SubmissionDetails";
import prisma from "@/lib/prisma";
import { FileText, Hash } from "lucide-react";
import React from "react";

// Get all the submissions of a particular form
const Submisions = async ({
  params,
}: {
  params: Promise<{ formId: string }>;
}) => {
  const formId = (await params).formId;

  const submissions = await prisma.submissions.findMany({
    where: {
      formId: Number(formId),
    },
    include: {
      form: true,
    },
  });

  console.log(submissions);
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
          <div className="bg-gray-800/50 p-4 rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Submissions Yet
          </h3>
          <p className="text-gray-400">
            Form submissions will appear here once they are received.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen text-gray-200 p-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-3 rounded-2xl shadow-xl mb-6">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Form Submissions</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Review and manage all form submissions in one centralized dashboard
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-gray-800 rounded-xl px-6 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Hash className="w-4 h-4" />
              <span className="text-sm font-medium">
                Total Submissions:{" "}
                <span className="text-white font-bold">
                  {submissions.length}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Submissions List */}
      <div className="w-full">
        {submissions.map((submission, index) => (
          <SubmissionsDetails
            key={index}
            submission={submission}
            index={index}
          />
        ))}
      </div>

    </div>
  );
};

export default Submisions;
