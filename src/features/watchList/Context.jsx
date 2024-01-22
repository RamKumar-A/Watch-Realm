import { createContext, useContext, useEffect, useReducer } from 'react';
import { useLoaderData } from 'react-router-dom';

const FilterContext = createContext();

const initialState = {
  allWatches: [],
  filteredWatches: [],
  selectedBrandId: 0,
  selectedCategoryId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        allWatches: action.payload,
      };

    case 'filterBrand':
      const brandId = action.payload;
      // console.log(state);
      const filteredWatchesBrand = state.allWatches.filter((watch) => {
        return watch.brand_id === brandId;
      });
      // console.log(filteredWatchesBrand);
      const filteredWatches = filteredWatchesBrand;
      return {
        ...state,
        filteredWatches,
        selectedBrandId: brandId,
        selectedCategoryId: null,
      };

    case 'removeFilterBrand':
      const removeId = action.payload;
      const removeFilteredWatches = state.filteredWatches.filter(
        (watch) => watch.brand_id !== removeId
      );
      return {
        ...state,
        filteredWatches: removeFilteredWatches,
        selectedBrandId: null,
      };

    case 'filterCategory':
      const categoryId = action.payload;
      const filteredWatchesCategory = state.allWatches.filter(
        (watch) => watch.category_id === categoryId
      );

      // If a brand is also selected, filter common watches
      // const filteredWatchesCategoryWithBrand = state.selectedBrandId
      //   ? filteredWatchesCategory.filter(
      //       (watch) => watch.brand_id === state.selectedBrandId
      //     )
      //   : filteredWatchesCategory;

      return {
        ...state,
        filteredWatches: filteredWatchesCategory,
        selectedBrandId: null, // Reset brand filter
        selectedCategoryId: categoryId,
      };

    case 'removeFilterCategory':
      const removeCatId = action.payload;
      const removeFilteredWatches1 = state.filteredWatches.filter(
        (watch) => watch.category_id !== removeCatId
      );
      // console.log(removeFilteredWatches);
      return {
        ...state,
        filteredWatches: removeFilteredWatches1,
        selectedCategoryId: null,
      };

    case 'filterMaterial':
      const materialName = action.payload;
      const filteredMaterial = state.allWatches.filter((material) => {
        return material.material_type === materialName;
      });
      return {
        ...state,
        filteredWatches: filteredMaterial,
      };

    case 'removeFilterMaterial':
      const removeName = action.payload;
      const removeFilteredWatchs2 = state.filteredWatches.filter(
        (watch) => watch.material_type !== removeName
      );
      return {
        ...state,
        filteredWatches: removeFilteredWatchs2,
      };

    case 'filterSize':
      const size = action.payload;
      const filteredSize = state.allWatches.filter(
        (sizes) => sizes.size === size
      );
      return { ...state, filteredWatches: filteredSize };

    case 'removeFilterSize':
      const removeSize = action.payload;
      const removeFilteredWatches3 = state.filteredWatches.filter(
        (sizes) => sizes.size !== removeSize
      );
      return { ...state, filteredWatches: removeFilteredWatches3 };

    case 'filterPrice':
      const { min, max } = action.payload;
      const filteredPrice = state.allWatches.filter((watch) => {
        const price = Number(watch.price_range.slice(1));
        return price >= min && price <= max;
      });
      return { ...state, filteredWatches: filteredPrice };
    //[{id:1,price:12},{price:13},{price:14}]

    case 'clearFilters':
      return { ...state, filteredWatches: [] };

    case 'sortByName':
      const sort = action.payload;
      const sortedWatch = state.allWatches.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (sort === 'ascending') {
          if (nameA < nameB) return -1;
        }
        if (sort === 'descending') {
          if (nameA > nameB) return 1;
        }

        return 0;
      });

      return { ...state, filteredWatches: sortedWatch };

    case 'sortByPrice':
      const price = action.payload;
      const sortedWatchPrice = state.allWatches.slice().sort((a, b) => {
        const priceA = Number(a.price_range.slice(1));
        const priceB = Number(b.price_range.slice(1));
        if (price === 'low-high') {
          if (priceA < priceB) return priceA - priceB;
        }
        if (price === 'high-low') {
          if (priceA > priceB) return priceB - priceA;
        }
        return 0;
      });
      return { ...state, filteredWatches: sortedWatchPrice };

    case 'removeSort':
      // const rmvSort = action.payload;
      const removedSort = state.allWatches;
      return { ...state, filteredWatches: removedSort };

    case 'searchWatch':
      const search = action.payload;
      // console.log(state.allWatches);
      const filteredSearch = state.allWatches.filter((watch) =>
        watch.name.toLowerCase().includes(search.toLowerCase())
      );
      return { ...state, filteredWatches: filteredSearch };

    default:
      throw new Error('unknown');
  }
}

function FilterProvider({ children }) {
  const [{ allWatches, selectedBrandId, filteredWatches }, dispatch] =
    useReducer(reducer, initialState);

  const { watch } = useLoaderData();

  useEffect(
    function () {
      dispatch({ type: 'dataReceived', payload: watch });
    },
    [watch]
  );

  return (
    <FilterContext.Provider
      value={{
        dispatch,
        allWatches,
        selectedBrandId,
        filteredWatches,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) throw new Error('used outside the context');
  return context;
}

export { useFilter, FilterProvider };
