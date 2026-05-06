import React from 'react';

const Footer = ({
  currentPage = 1,
  totalPages = 16,
  itemsShown = 10,
  totalItems = 157,
  onPrevPage,
  onNextPage
}) => {
  return (
    <div className="w-full bg-neutral-900 px-4 py-5 sm:px-6 border-t border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className="p-1.5 rounded-full text-white hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500"
            aria-label="Previous Page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-white text-sm sm:text-base font-bold tracking-wide">
            Page {currentPage} of {totalPages}
          </span>

          <button 
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-full text-white hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500"
            aria-label="Next Page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-white text-sm sm:text-base font-bold tracking-wide pl-1 sm:pl-0">
          Showing {itemsShown} of {totalItems} videos
        </div>

      </div>
    </div>
  );
};

export default Footer;