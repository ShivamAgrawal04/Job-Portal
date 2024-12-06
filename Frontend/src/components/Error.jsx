import React from "react";
import Navbar from "./shared/Navbar";

const Error = () => {
  return (
    <div>
      <Navbar />
      <h1 className="h-[90vh] text-5xl bg-red-200 flex justify-center items-center">
        404 Page Not Found
      </h1>
    </div>
  );
};

export default Error;
