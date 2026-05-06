import React from "react";

function JokeSkeleton() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-xl h-full flex flex-col justify-between animate-pulse">
      <div className="space-y-4 mb-6 mt-2">
        <div className="h-4 bg-neutral-800/80 rounded-md w-full"></div>
        <div className="h-4 bg-neutral-800/80 rounded-md w-11/12"></div>
        <div className="h-4 bg-neutral-800/80 rounded-md w-4/5"></div>
      </div>
      <div className="flex justify-between items-end mt-auto pt-4 border-t border-neutral-800/50">
        <div className="h-7 w-16 bg-neutral-800/80 rounded-full"></div>
        <div className="h-7 w-20 bg-neutral-800/80 rounded-md"></div>
      </div>
    </div>
  );
}

export default JokeSkeleton;
