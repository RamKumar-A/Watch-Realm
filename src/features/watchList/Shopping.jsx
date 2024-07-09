import { useEffect, useState } from 'react';
import Products from './Products';
import ProductsSidebar from './ProductsSidebar';
import { getWatch } from '../../services/apiWatches';
import { useLoaderData } from 'react-router-dom';
import { getFilters } from '../../services/apiWatches';
import PageWrapper from '../../PageWrapper';
import { useDispatch } from 'react-redux';
import { addAllBrands, addAllCategories, addAllWatches } from './filterSlice';

function Shopping() {
  const [openFilters, setOpenFilters] = useState(false);
  const { watch, brands, categories } = useLoaderData();
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(addAllWatches(watch));
      dispatch(addAllBrands(brands));
      dispatch(addAllCategories(categories));
    },
    [watch, brands, categories, dispatch]
  );

  return (
    <PageWrapper>
      <div className="md:px-2">
        <h1 className="text-2xl font-extrabold text-center p-3 tracking-wide ">
          Products
        </h1>
        <main className="flex h-full justify-center py-3">
          <div className="sm:sticky top-2 h-[100dvh] pb-2 overflow-y-scroll">
            <ProductsSidebar />
          </div>

          {/* categories={categories}
          brands={brands} */}
          <Products openFilters={openFilters} setOpenFilters={setOpenFilters} />
        </main>
      </div>
    </PageWrapper>
  );
}

// below is an method used in the Next.js which allows to pre-fetch data and pass it as props to component

let cachedData = null;

export async function loader() {
  if (cachedData) return cachedData;
  try {
    // const watch = await getWatch();
    // const brands = await getFilters('brands');
    // const categories = await getFilters('categories');

    // cachedData = {
    //   watch,
    //   brands,
    //   categories,
    // };
    const [watchData, brandsData, categoriesData] = await Promise.all([
      getWatch(),
      getFilters('brands'),
      getFilters('categories'),
    ]);
    cachedData = {
      watch: watchData,
      brands: brandsData,
      categories: categoriesData,
    };
    // return { watch, brands, categories };
    return cachedData;
  } catch (err) {
    console.error(err.message);
  }
}

//cachedData is a variable that stores the fetched data. If the data has already been fetched, subsequent calls to the loader function will return the cached data without making additional API calls. This helps to avoid redundant API requests and improves performance.

export default Shopping;
