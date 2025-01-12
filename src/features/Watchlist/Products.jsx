import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoFilterOutline } from 'react-icons/io5';
import { HiChevronLeft } from 'react-icons/hi2';

import { useWatches } from './useWatches';

import ProductItems from './ProductItems';
import MobileFilters from './filters/MobileFilters';

import Sort from './Sort';
import Loader from '../../ui/Loader';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Drawer from '../../ui/Drawer';
import Button from '../../ui/Button';

function Products() {
  const [openFilters, setOpenFilters] = useState(false);
  const { watches, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useWatches();

  const observerRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Observes within the viewport
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the sentinel is visible
    });

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [handleObserver]);

  return (
    <div className="">
      <div className="flex items-center justify-between p-1 pb-5">
        <Sort />
        <div
          className=" flex items-center font-bold gap-1 lg:hidden "
          onClick={() => setOpenFilters(!openFilters)}
        >
          <IoFilterOutline size={18} className="inline-block" />
          Filter and Sort
        </div>

        <div className="">
          {isPending ? (
            <Spinner />
          ) : (
            <span className="text-md font-semibold">{watches?.length}</span>
          )}
          <span className="font-bold text-lg">Products</span>
        </div>
      </div>
      <div className="overflow-auto">
        <div
          className="flex flex-wrap items-center justify-center gap-6 px-2 overflow-y-auto"
          // ref={containerRef}
          // onScroll={handleScroll}
        >
          {!isPending ? (
            watches?.length ? (
              <>
                <AnimatePresence>
                  {watches?.map((watch, i) => (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          staggerChildren: 0.01 * i,
                        },
                      }}
                      exit={{ scale: 0 }}
                      key={watch?._id}
                    >
                      <ProductItems watch={watch} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            ) : (
              <Empty>
                <h1>No Products Found</h1>
              </Empty>
            )
          ) : (
            <div className="">
              <Loader />
            </div>
          )}
        </div>
        <div ref={observerRef} className="h-10"></div>
        {isFetchingNextPage && hasNextPage ? (
          <div className="flex items-center justify-center p-5">
            <Spinner background />
          </div>
        ) : (
          <div className="flex items-center justify-center p-5 text-xl font-semibold">
            No more products...
          </div>
        )}
      </div>
      <Drawer
        isOpen={openFilters}
        onClose={() => setOpenFilters(false)}
        position="right"
      >
        <div className="h-screen grid grid-rows-[auto_1fr] p-1 overflow-auto">
          <div className="p-3">
            <Button size="small" onClick={() => setOpenFilters(false)}>
              <HiChevronLeft />
            </Button>
          </div>
          <MobileFilters />
        </div>
      </Drawer>
    </div>
  );
}

export default Products;
