"use client";
import Sidebar from "@/components/common/Sidebar";
import { useGlobalContext } from "@/context/context";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed, setIsCollapsed } = useGlobalContext();
  const pathname = usePathname();
  const isPublishedRoute = pathname.includes("/forms/publish");

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-black  to-gray-900 ">
      {!isPublishedRoute && <Sidebar />}
      <div
        className={`w-full ${
          isCollapsed
            ? isPublishedRoute
              ? "ml-0"
              : "ml-[98px]"
            : isPublishedRoute
            ? "ml-0"
            : "ml-[358px]"
        } $`}
      >
        {children}
      </div>
    </div>
  );
};

export default layout;
