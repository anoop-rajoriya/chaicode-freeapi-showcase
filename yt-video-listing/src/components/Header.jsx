import React from "react";

const Header = ({ videoCount = 0 }) => {
  return (
    <header className="w-full bg-neutral-900 p-4 sm:p-6 border-b border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600 flex items-center justify-center shrink-0">
            <div className="w-8 h-5 sm:w-10 sm:h-7 rounded-[4px] sm:rounded-lg bg-white flex items-center justify-center p-[2px]">
              <div className="w-0 h-0 border-t-[4px] sm:border-t-[5px] border-t-transparent border-b-[4px] sm:border-b-[5px] border-b-transparent border-l-[6px] sm:border-l-[8px] border-l-red-600 ml-0.5 sm:ml-1" />
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <h1 className="text-white text-lg sm:text-xl font-bold leading-tight truncate">
              Hitesh Choudhary
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm mt-0.5 truncate">
              Programming • Tech • Open Source
            </p>
          </div>
        </div>

        <div className="self-start sm:self-auto bg-neutral-800 px-3 py-1 sm:py-1.5 rounded-full border border-neutral-700 shrink-0">
          <span className="text-xs sm:text-sm text-neutral-400 font-medium">
            {videoCount} {videoCount === 1 ? "video" : "videos"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
