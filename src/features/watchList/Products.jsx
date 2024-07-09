import { useState } from 'react';
import ProductItems from './ProductItems';
import Sort from './Sort';
import Modal from '../../ui/Modal';
import Pagination from '../../ui/Pagination';
import { HiAdjustmentsVertical } from 'react-icons/hi2';
import ProductsSidebar from './ProductsSidebar';
import { useSelector } from 'react-redux';
import { getAllWatches, getFilteredWatches } from './filterSlice';
import Empty from '../../ui/Empty';
// categories,
// brands,
function Products({ openFilters, setOpenFilters }) {
  const [currPage, setCurrPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const allWatches = useSelector(getAllWatches);
  const filteredWatches = useSelector(getFilteredWatches);

  const displayWatches =
    filteredWatches.length !== 0 ? filteredWatches : allWatches;

  const lastIndex = currPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;

  const currentWatch = displayWatches?.slice(firstIndex, lastIndex);

  function paginate(num) {
    setCurrPage(num);
  }

  function handleToggle() {
    setOpenFilters(true);
  }

  return (
    <>
      <div className="flex-1 space-y-3 ">
        <div className="flex items-center justify-between px-2 ">
          <div className="hidden sm:block">
            <Sort />
          </div>
          <div onClick={handleToggle} className="sm:hidden">
            <Modal>
              <Modal.Trigger opens="filters">
                <button className="sm:hidden text-lg font-semibold flex items-center gap-1 ">
                  <HiAdjustmentsVertical size={20} /> Filters & Sort
                </button>
              </Modal.Trigger>
              <Modal.Content name="filters">
                <div className="grid justify-items-center place-items-start h-full overflow-y-auto py-10 ">
                  <ProductsSidebar openFilters={openFilters} />
                </div>
              </Modal.Content>
            </Modal>
          </div>
          <div className="">
            <span className="text-md font-semibold">
              {displayWatches?.length}
            </span>{' '}
            <span className="font-bold text-xl">Products</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 px-2">
          {displayWatches.length > 0 ? (
            currentWatch.map((watch, i) => (
              <ProductItems watch={watch} key={watch.id} />
            ))
          ) : (
            <Empty>No watch found</Empty>
          )}
        </div>
        {displayWatches.length > 0 && (
          <div className="flex items-center justify-center py-4">
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              paginate={paginate}
              totalItems={displayWatches.length}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
