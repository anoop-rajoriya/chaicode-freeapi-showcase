import React from "react";

const Loader = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] w-full">
      {/* Spinning Circle */}
      <div className="w-12 h-12 border-4 border-neutral-700 border-t-red-600 rounded-full animate-spin"></div>

      {/* Pulsing Text */}
      <p className="mt-4 text-neutral-400 font-medium animate-pulse tracking-wide">
        Loading videos...
      </p>
    </div>
  );
};

export default Loader;
