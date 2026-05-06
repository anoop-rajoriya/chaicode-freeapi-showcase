import React from "react";

function Pagination({
  page,
  totalPages,
  totalItems,
  currentPageItems,
  onNext,
  onPrevious,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-neutral-800 pt-6 mt-10">
      <div className="text-sm text-neutral-400 mb-4 sm:mb-0">
        Showing{" "}
        <span className="font-medium text-neutral-200">{currentPageItems}</span>{" "}
        items out of{" "}
        <span className="font-medium text-neutral-200">{totalItems}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={page === 1}
          className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex items-center px-4 text-sm font-medium text-neutral-300 bg-neutral-800/50 border border-neutral-800 rounded-lg">
          Page {page} of {totalPages}
        </div>

        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
