import React from 'react'

// components/Pagination.js

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((number) => number + 1);

  return (
    <div className="flex items-center justify-center mt-4">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-1 px-2 py-1 rounded ${
            pageNumber === currentPage ? 'bg-gray-200 text-gray-800' : 'bg-gray-300 text-gray-600'
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
