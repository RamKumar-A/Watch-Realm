import Products from './Products';
import ProductsSidebar from './ProductsSidebar';
import PageWrapper from '../../PageWrapper';

function Shopping() {
  return (
    <PageWrapper>
      <div className="md:px-2 lg:mx-20">
        <div className="text-center p-5 space-y-2">
          <h1 className="text-xl md:text-3xl font-semibold ">
            "Timeless Luxury, All in One Place"
          </h1>
          <p className=" hidden lg:block lg:text-sm">
            Explore our exclusive collection of luxury wristwatches crafted for
            connoisseurs of elegance and precision.
          </p>
        </div>
        <main className="flex h-full justify-center py-3">
          <div className="h-full overflow-y-auto">
            <ProductsSidebar />
          </div>
          <div className="flex-1 space-y-3">
            <Products />
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}

// below is an method used in the Next.js which allows to pre-fetch data and pass it as props to component

// let cachedData = null;

// export async function loader() {
//   if (cachedData) return cachedData;
//   try {
//     // const watch = await getWatch();
//     // const brands = await getFilters('brands');
//     // const categories = await getFilters('categories');

//     // cachedData = {
//     //   watch,
//     //   brands,
//     //   categories,
//     // };
//     const [watchData, brandsData, categoriesData] = await Promise.all([
//       getWatch(),
//       getFilters('brands'),
//       getFilters('categories'),
//     ]);
//     cachedData = {
//       watch: watchData,
//       brands: brandsData,
//       categories: categoriesData,
//     };
//     // return { watch, brands, categories };
//     return cachedData;
//   } catch (err) {
//     console.error(err.message);
//   }
// }

//cachedData is a variable that stores the fetched data. If the data has already been fetched, subsequent calls to the loader function will return the cached data without making additional API calls. This helps to avoid redundant API requests and improves performance.

export default Shopping;
