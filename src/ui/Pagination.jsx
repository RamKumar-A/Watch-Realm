import { useState } from 'react';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';

function Pagination({ totalItems, itemsPerPage, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  function handlePage(page) {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
      paginate(page);
    }
  }

  return (
    <div className="grid grid-cols-5 h-10 content-center gap-2 place-items-center">
      <button
        onClick={() => handlePage(currentPage - 1)}
        className={currentPage > 1 ? ' p-3 border ' : 'hidden '}
      >
        <HiChevronLeft />
      </button>
      <span
        className=" self-center text-sm cursor-pointer "
        onClick={() => handlePage(1)}
      >
        {currentPage > 1 && <HiChevronDoubleLeft />}
      </span>
      <span className="font-extrabold text-2xl  w-10 text-center self-center border-gray-500 pointer-events-none">
        {currentPage}
      </span>
      <span
        className=" self-center text-sm cursor-pointer"
        onClick={() => handlePage(totalPage)}
      >
        {currentPage >= 1 && currentPage < totalPage && (
          <HiChevronDoubleRight />
        )}
      </span>
      <button
        onClick={() => handlePage(currentPage + 1)}
        className={currentPage < totalPage ? ' p-3 border' : 'hidden'}
      >
        <HiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
