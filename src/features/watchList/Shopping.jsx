import { useState } from 'react';
import Products from './Products';
import ProductsSidebar from './ProductsSidebar';
import { getWatch } from '../../services/apiWatches';
import { useLoaderData } from 'react-router-dom';
import { getFilters } from '../../services/apiWatches';

function Shopping() {
  const [openFilters, setOpenFilters] = useState(false);
  const { watch, brands, categories } = useLoaderData();

  return (
    <div className="mt-8 gap-y-2.5 lg:m-10 ">
      <h1 className="text-5xl my-2 mb-16 pt-5 pl-5">Products</h1>
      <main className="grid sm:grid-cols-[250px_1fr]">
        <ProductsSidebar
          watch={watch}
          brands={brands}
          categories={categories}
        />

        <Products
          watches={watch}
          categories={categories}
          brands={brands}
          openFilters={openFilters}
          setOpenFilters={setOpenFilters}
        />
      </main>
    </div>
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
