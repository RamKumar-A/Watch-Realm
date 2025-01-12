import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { FilterProvider } from '../Context/FilterContext';
import ProductsSidebar from '../features/Watchlist/ProductsSidebar';
import Products from '../features/Watchlist/Products';

import {
  childHeadingVariants,
  containerHeadingVariants,
} from '../helpers/variants';

function Shop() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div
      className="md:px-2 grid content-start overflow-y-auto py-5 space-y-5 "
      ref={ref}
    >
      <motion.div
        className="text-center p-2 sm:p-4 space-y-2"
        variants={containerHeadingVariants}
        initial={'hidden'}
        animate={isInView ? 'visible' : 'hidden'}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1
          variants={childHeadingVariants}
          className="text-lg md:text-3xl lg:text-4xl font-semibold drop-shadow-md "
        >
          "Timeless Luxury, All in One Place"
        </motion.h1>
        <motion.p
          variants={childHeadingVariants}
          className="max-md:hidden md:text-md"
        >
          Explore our exclusive collection crafted for connoisseurs of elegance
          and precision.
        </motion.p>
      </motion.div>
      <FilterProvider>
        <section className="flex justify-center gap-1 md:py-3 max-md:pb-3">
          <aside className="lg:w-[25%] xl:[22%] overflow-y-auto hidden lg:block  sticky top-2">
            <ProductsSidebar />
          </aside>
          <section className="flex-1 h-full space-y-3">
            {/* <Products watches={watches} isPending={isPending} /> */}
            <Products />
          </section>
        </section>
      </FilterProvider>
    </div>
  );
}

export default Shop;
