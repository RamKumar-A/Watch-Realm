import { useState } from 'react';
// import { useLoaderData } from 'react-router-dom';

import ProductItems from './ProductItems';
import { useFilter } from './Context';
import Sort from './Sort';
import Modal from '../../ui/Modal';
import ProductSidebarModal from './ProductSidebarModal';
import Pagination from '../../ui/Pagination';
import { HiAdjustmentsVertical } from 'react-icons/hi2';

function Products({
  categories,
  brands,
  openFilters,
  setOpenFilters,
  watches,
}) {
  const [currPage, setCurrPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const { allWatches, filteredWatches } = useFilter();
  // const { watch } = useLoaderData();

  const displayWatches =
    filteredWatches.length !== 0 ? filteredWatches : watches;

  const lastIndex = currPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentWatch = displayWatches.slice(firstIndex, lastIndex);

  const renderWatch = (watch, i) => {
    const isCentered = i >= currentWatch.length - 2;
    console.log(isCentered);
    return (
      <ProductItems watch={watch} key={watch.id} isCentered={isCentered} />
    );
  };

  function paginate(num) {
    setCurrPage(num);
  }

  function handleToggle() {
    setOpenFilters(true);
  }

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] gap-y-2 mb-2 place-content-center">
        <div className="flex items-center justify-between m-[2rem] sm:m-0">
          <div className="hidden sm:block">
            <Sort />
          </div>
          <Modal>
            <div onClick={handleToggle}>
              <Modal.Trigger opens="filter">
                <div className="sm:hidden text-xl flex items-center gap-1">
                  <HiAdjustmentsVertical /> Filters & Sort
                </div>
              </Modal.Trigger>
            </div>
            <Modal.Content name="filter" clicks={setOpenFilters}>
              <ProductSidebarModal
                watch={allWatches}
                brands={brands}
                categories={categories}
                openFilters={openFilters}
              />
            </Modal.Content>
          </Modal>
          <div className="text-2xl font-semibold text-center">
            <span className="text-xl">{displayWatches.length}</span> Products
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 mt-3 ">
          {currentWatch.map(renderWatch)}
        </div>
        <div className="mt-10 flex items-center justify-center">
          <Pagination
            itemsPerPage={ITEMS_PER_PAGE}
            paginate={paginate}
            totalItems={displayWatches.length}
          />
        </div>
      </div>
    </>
  );
}

export default Products;
