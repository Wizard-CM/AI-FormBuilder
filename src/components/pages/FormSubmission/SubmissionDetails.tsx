"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  ChevronRight,
  FileText,
  Hash,
  MessageSquare,
  User,
} from "lucide-react";
import * as XLSX from "xlsx";

type Props = {
  submission: any;
  index: number;
};

const SubmissionsDetails: React.FC<Props> = ({ submission, index }) => {
  const getFieldIcon = (key: string) => {
    const keyLower = key.toLowerCase();
    if (keyLower.includes("name") || keyLower.includes("user"))
      return <User className="w-4 h-4" />;
    if (keyLower.includes("email"))
      return <MessageSquare className="w-4 h-4" />;
    if (keyLower.includes("phone")) return <Hash className="w-4 h-4" />;
    if (keyLower.includes("date") || keyLower.includes("time"))
      return <Calendar className="w-4 h-4" />;
    return <ChevronRight className="w-4 h-4" />;
  };

  // console.log(submission?.content,"Submission Content")

  const handleExport = () => {
    const workBook = XLSX?.utils.book_new();
    const workSheet = XLSX?.utils.json_to_sheet([submission?.content]);

    XLSX?.utils.book_append_sheet(workBook, workSheet, `MySheet`);
    XLSX?.writeFile(workBook, `Response.xlsx`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 mb-8 backdrop-blur-sm shadow-2xl hover:shadow-gray-900/20 transition-all duration-300 hover:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 p-3 rounded-xl shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-3xl text-white mb-1">
              Response #{index + 1}
            </h1>
            <p className="text-gray-400 text-sm">Form submission details</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleExport}
            className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 bg-green-900/20 hover:bg-green-900/30 border border-green-800/50 hover:border-green-700 rounded-lg text-green-400 hover:text-green-300 transition-all duration-200 group/delete"
          >
            <span className="font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-black/40 rounded-xl border border-gray-800 overflow-hidden backdrop-blur-sm">
        <Table>
          <TableBody>
            {Object.entries(submission?.content).map(
              ([key, value], rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-gray-800/30 transition-colors duration-200 group"
                >
                  <TableCell>
                    <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                      <div className="text-gray-500 group-hover:text-gray-400 transition-colors">
                        {getFieldIcon(key)}
                      </div>
                      <span className="font-medium">{key}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-100">
                      {Array.isArray(value) ? (
                        <div className="flex flex-wrap gap-2">
                          {value.map((item, i) => (
                            <span
                              key={i}
                              className="bg-gray-700/50 px-3 py-1 rounded-full text-sm border border-gray-600 hover:bg-gray-600/50 transition-colors"
                            >
                              {String(item)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="leading-relaxed">{String(value)}</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubmissionsDetails;
