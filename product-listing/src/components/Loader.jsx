import React from "react";

const Loader = ({ fullScreen = false, text = "Loading..." }) => {
  // Determine if it should cover the whole screen or just its relative parent container
  const baseClasses =
    "flex flex-col items-center justify-center z-50 backdrop-blur-sm bg-neutral-900/50";
  const containerClasses = fullScreen
    ? `fixed inset-0 ${baseClasses}`
    : `absolute inset-0 ${baseClasses} rounded-xl`;

  return (
    <div className={containerClasses}>
      <div className="relative w-12 h-12">
        {/* Background track ring */}
        <div className="absolute inset-0 border-4 border-neutral-700 rounded-full"></div>

        {/* Animated spinning ring */}
        <div className="absolute inset-0 border-4 border-neutral-200 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Optional loading text */}
      {text && (
        <p className="mt-4 text-sm font-medium text-neutral-300 animate-pulse tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
