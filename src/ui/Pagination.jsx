import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

function Pagination({ totalItems, itemsPerPage, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  function handlePage(page) {
    if (page >= 1 && page <= totalPage) {
      console.log(page);
      setCurrentPage(page);
      paginate(page);
    }
  }

  return (
    <div className="w-1/2 grid grid-cols-4 justify-items-center content-center gap-5 h-10 text-xl ">
      {currentPage > 1 && (
        <button
          onClick={() => handlePage(currentPage - 1)}
          className="border  p-2"
        >
          {<HiChevronLeft />}
        </button>
      )}
      <span>{currentPage > 1 && currentPage - 1}</span>
      <span className="font-extrabold text-2xl border w-10 text-center border-gray-500">
        {currentPage}
      </span>

      {currentPage < totalPage && (
        <button
          onClick={() => handlePage(currentPage + 1)}
          className="border  p-2 "
        >
          {<HiChevronRight />}
        </button>
      )}
    </div>
  );
}

export default Pagination;
