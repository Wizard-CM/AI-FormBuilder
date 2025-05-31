import Loader from "@/components/common/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader size="10px" />
    </div>
  );
};

export default loading;
