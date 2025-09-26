import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentStart, maxResults, totalEntries, onPageChange }) => {
  const currentPage = Math.floor((currentStart - 1) / maxResults) + 1;
  const totalPages = Math.ceil(totalEntries / maxResults);

  const goToPage = (page) => {
    const newStart = (page - 1) * maxResults + 1;
    onPageChange(newStart);
  };

  const goToFirst = () => goToPage(1);
  const goToLast = () => goToPage(totalPages);
  const goToPrevious = () => goToPage(Math.max(1, currentPage - 1));
  const goToNext = () => goToPage(Math.min(totalPages, currentPage + 1));

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const displayStart = currentStart;
  const displayEnd = Math.min(currentStart + maxResults - 1, totalEntries);

  return (
    <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur border-t border-slate-700 px-6 py-4">
      <div className="text-sm text-slate-400">
        Showing <span className="font-semibold text-white">{displayStart}</span> to{' '}
        <span className="font-semibold text-white">{displayEnd}</span> of{' '}
        <span className="font-semibold text-white">{totalEntries.toLocaleString()}</span> entries
        <span className="ml-2 text-slate-500">
          (Page {currentPage} of {totalPages})
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={goToFirst}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-1">
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={goToLast}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;